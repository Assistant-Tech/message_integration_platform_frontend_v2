import { Logo } from "@/app/components/ui";
import { useAuthStore } from "@/app/store/auth.store";
import { Check, ChevronLeft, ChevronRight, Upload, X, Eye } from "lucide-react";
import { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface FormData {
  organizationName: string;
  email: string;
  contactNumber: string;
  address: string;
  industry: string;
  panCardNumber: string;
  panCardImage: FileList | null;
  website: string;
  description: string;
}

const OnboardingForm = () => {
  const navigate = useNavigate();

  // Use shallow comparison to avoid infinite re-renders on object creation
  const user = useAuthStore((state) => state.user);
  const onboarding = useAuthStore((state) => state.onboarding);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      email: user?.email || "",
    },
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [showPreview, setShowPreview] = useState(false);
  const totalSteps = 5;

  const panCardImage = watch("panCardImage");
  const watchedValues = watch();

  const steps = [
    {
      id: 1,
      title: "General Information",
      description:
        "Add your company's name, email, phone number, website and legal documents.",
      fields: [
        "organizationName",
        "email",
        "contactNumber",
        "website",
      ] as (keyof FormData)[],
    },
    {
      id: 2,
      title: "Location",
      description: "Add where your company is based.",
      fields: ["address"] as (keyof FormData)[],
    },
    {
      id: 3,
      title: "Industry",
      description: "Choose the industry that best describes your company.",
      fields: ["industry"] as (keyof FormData)[],
    },
    {
      id: 4,
      title: "Legal Documentation",
      description: "Add your company's official legal documentation.",
      fields: ["panCardNumber", "panCardImage"] as (keyof FormData)[],
    },
    {
      id: 5,
      title: "Company Description",
      description: "Tell us about your company and complete setup.",
      fields: ["description"] as (keyof FormData)[],
    },
  ];

  const validateStep = useCallback(
    async (stepNumber: number) => {
      const currentStepFields = steps[stepNumber - 1]?.fields;
      if (!currentStepFields) return true;

      const isValid = await trigger(currentStepFields);

      if (isValid) {
        setCompletedSteps((prev) => new Set([...prev, stepNumber]));
      }
      return isValid;
    },
    [steps, trigger],
  );

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = async (stepNumber: number) => {
    if (stepNumber <= currentStep || completedSteps.has(stepNumber)) {
      setCurrentStep(stepNumber);
    }
  };

  const handleFileUpload = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const file = files[0];
      const maxSize = 10 * 1024 * 1024;
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

      if (!file || !allowedTypes.includes(file.type)) {
        toast.error("Please upload a valid image file (PNG, JPG, JPEG)");
        return;
      }

      if (file.size > maxSize) {
        toast.error("File size should be less than 10MB");
        return;
      }

      setValue("panCardImage", files, { shouldValidate: true });
    },
    [setValue],
  );

  const removeFile = () => {
    setValue("panCardImage", null, { shouldValidate: true });
  };

  const onSubmit = async (formData: FormData) => {
    const allValid = await Promise.all(
      Array.from({ length: totalSteps }, (_, i) => validateStep(i + 1)),
    );
    if (!allValid.every(Boolean)) {
      toast.error("Please complete all required fields");
      return;
    }

    setLoading(true);
    try {
      const apiFormData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "panCardImage") {
          if (value instanceof FileList && value.length > 0 && value[0]) {
            apiFormData.append(key, value[0]);
          }
        } else if (key !== "slug") {
          // ⬅️ Skip slug completely
          apiFormData.append(key, String(value || ""));
        }
      });

      await onboarding(apiFormData);

      toast.success("Onboarding completed successfully! Welcome to Chatblix!");
      navigate("/admin/dashboard");
    } catch (error: any) {
      console.error("Onboarding error:", error);
      toast.error(
        error?.response?.data?.message ||
          "Onboarding failed. Please try again.",
      );
    } finally {
      setLoading(false);
      setShowPreview(false);
    }
  };

  const PreviewModal = () => {
    if (!showPreview) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b flex items-center justify-between">
            <h3 className="text-lg font-semibold">Review Your Information</h3>
            <button
              onClick={() => setShowPreview(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <strong>Company Name:</strong> {watchedValues.organizationName}
            </div>
            <div>
              <strong>Email:</strong> {watchedValues.email}
            </div>
            <div>
              <strong>Phone:</strong> {watchedValues.contactNumber}
            </div>
            <div>
              <strong>Website:</strong> {watchedValues.website}
            </div>
            <div>
              <strong>Address:</strong> {watchedValues.address}
            </div>
            <div>
              <strong>Industry:</strong> {watchedValues.industry}
            </div>
            <div>
              <strong>PAN Number:</strong> {watchedValues.panCardNumber}
            </div>
            <div>
              <strong>Description:</strong> {watchedValues.description}
            </div>
            {panCardImage && panCardImage.length > 0 && (
              <div>
                <strong>PAN Card Image:</strong> {panCardImage[0]?.name}
              </div>
            )}
          </div>
          <div className="p-6 border-t flex justify-end space-x-3">
            <button
              onClick={() => setShowPreview(false)}
              className="px-4 py-2 text-grey-medium border rounded-lg hover:bg-gray-50"
            >
              Edit
            </button>
            <button
              onClick={() => {
                handleSubmit(onSubmit)();
              }}
              disabled={loading}
              className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <Controller
                name="organizationName"
                control={control}
                rules={{
                  required: "Company name is required",
                  minLength: {
                    value: 2,
                    message: "Company name must be at least 2 characters",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="e.g. Your Company Name"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
                      errors.organizationName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                )}
              />
              {errors.organizationName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.organizationName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Email <span className="text-red-500">*</span>
              </label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    placeholder="e.g. company@gmail.com"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <select className="px-3 py-2 border border-r-0 rounded-l-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option value="+977">Nepal (+977)</option>
                </select>
                <Controller
                  name="contactNumber"
                  control={control}
                  rules={{
                    required: "Contact number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit phone number",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="tel"
                      placeholder="9800000000"
                      className={`flex-1 px-3 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
                        errors.contactNumber
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                  )}
                />
              </div>
              {errors.contactNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contactNumber.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Website
              </label>
              <Controller
                name="website"
                control={control}
                rules={{
                  pattern: {
                    value: /^https?:\/\/.+\..+/,
                    message:
                      "Please enter a valid URL (e.g., https://example.com)",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="url"
                    placeholder="https://www.yourcompany.com"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
                      errors.website ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                )}
              />
              {errors.website && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.website.message}
                </p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Location <span className="text-red-500">*</span>
              </label>
              <Controller
                name="address"
                control={control}
                rules={{ required: "Address is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select your location</option>
                    <optgroup label="Province 1">
                      <option value="Biratnagar">Biratnagar</option>
                      <option value="Itahari">Itahari</option>
                      <option value="Dharan">Dharan</option>
                    </optgroup>
                    <optgroup label="Bagmati Province">
                      <option value="Kathmandu">Kathmandu</option>
                      <option value="Lalitpur">Lalitpur</option>
                      <option value="Bhaktapur">Bhaktapur</option>
                    </optgroup>
                    <optgroup label="Gandaki Province">
                      <option value="Pokhara">Pokhara</option>
                    </optgroup>
                    <optgroup label="Province 5">
                      <option value="Butwal">Butwal</option>
                      <option value="Bhairahawa">Bhairahawa</option>
                    </optgroup>
                  </select>
                )}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry <span className="text-red-500">*</span>
              </label>
              <Controller
                name="industry"
                control={control}
                rules={{ required: "Industry is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
                      errors.industry ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select your industry</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="education">Education</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="consulting">Consulting</option>
                    <option value="hospitality">Hospitality & Tourism</option>
                    <option value="agriculture">Agriculture</option>
                    <option value="construction">Construction</option>
                    <option value="media">Media & Entertainment</option>
                    <option value="other">Other</option>
                  </select>
                )}
              />
              {errors.industry && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.industry.message}
                </p>
              )}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PAN Card Number <span className="text-red-500">*</span>
              </label>
              <Controller
                name="panCardNumber"
                control={control}
                rules={{
                  required: "PAN Card Number is required",
                  pattern: {
                    value: /^[0-9]{9}$/,
                    message: "PAN Card Number should be 9 digits",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Enter 9-digit PAN Card Number"
                    maxLength={9}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
                      errors.panCardNumber
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                )}
              />
              {errors.panCardNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.panCardNumber.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PAN Card Image <span className="text-red-500">*</span>
              </label>
              <Controller
                name="panCardImage"
                control={control}
                rules={{ required: "PAN Card Image is required" }}
                render={({ field: { onChange, value, ...field } }) => (
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      errors.panCardImage
                        ? "border-red-300"
                        : "border-gray-300 hover:border-teal-500"
                    }`}
                  >
                    <input
                      {...field}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                      id="panCardImage"
                    />
                    {panCardImage && panCardImage.length > 0 ? (
                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-teal-100 rounded flex items-center justify-center">
                            <Check className="w-4 h-4 text-teal-600" />
                          </div>
                          <span className="text-sm text-gray-700">
                            {panCardImage[0]?.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label htmlFor="panCardImage" className="cursor-pointer">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-grey-medium">
                          Click to upload PAN Card image
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG up to 10MB
                        </p>
                      </label>
                    )}
                  </div>
                )}
              />
              {errors.panCardImage && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.panCardImage.message}
                </p>
              )}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Description
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={4}
                    placeholder="Tell us about your company, what you do, your mission, and what makes you unique..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none transition-colors"
                  />
                )}
              />
              <p className="text-xs text-gray-500 mt-1">
                Optional but recommended
              </p>
            </div>
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-teal-900 mb-2">
                Almost done! 🎉
              </h4>
              <p className="text-sm text-teal-700">
                Review your information and complete the onboarding process. You
                can always update these details later from your dashboard.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to Chatblix{user?.email ? `${user.firstName}` : ""}!
          </h1>
          <p className="text-grey-medium max-w-lg mx-auto">
            Complete your onboarding process by setting up your workspace. The
            next few steps will contain all the necessary information you will
            need to enter to personalize your Chatblix account.
          </p>
        </div>
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => goToStep(step.id)}
                disabled={step.id > currentStep && !completedSteps.has(step.id)}
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  currentStep === step.id
                    ? "bg-teal-500 text-white"
                    : completedSteps.has(step.id)
                      ? "bg-teal-500 text-white cursor-pointer hover:bg-teal-600"
                      : "bg-gray-200 text-grey-medium cursor-not-allowed"
                }`}
              >
                {completedSteps.has(step.id) && currentStep !== step.id ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.id
                )}
              </button>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 h-0.5 mx-2 transition-colors ${
                    completedSteps.has(step.id) ? "bg-teal-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="w-64 pr-6 border-r">
                <div className="space-y-4">
                  {steps.map((step) => (
                    <button
                      key={step.id}
                      onClick={() => goToStep(step.id)}
                      disabled={
                        step.id > currentStep && !completedSteps.has(step.id)
                      }
                      className={`w-full flex items-start space-x-3 p-3 rounded-lg transition-colors text-left ${
                        currentStep === step.id
                          ? "bg-teal-50 border-l-4 border-teal-500"
                          : completedSteps.has(step.id)
                            ? "hover:bg-gray-50 cursor-pointer"
                            : step.id < currentStep
                              ? "hover:bg-gray-50 cursor-pointer"
                              : "cursor-not-allowed opacity-60"
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                          currentStep === step.id
                            ? "bg-teal-500 text-white"
                            : completedSteps.has(step.id)
                              ? "bg-teal-500 text-white"
                              : "bg-gray-200 text-grey-medium"
                        }`}
                      >
                        {completedSteps.has(step.id) &&
                        currentStep !== step.id ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          step.id
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          {step.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {step.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 pl-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {steps[currentStep - 1]?.title}
                  </h2>
                  <p className="text-grey-medium text-sm">
                    {steps[currentStep - 1]?.description}
                  </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {renderStepContent()}
                </form>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentStep === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-grey-medium hover:bg-gray-200"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <div className="flex items-center space-x-3">
              {currentStep === totalSteps && (
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="flex items-center space-x-2 px-4 py-2 text-teal-600 border border-teal-200 text-sm font-medium rounded-lg hover:bg-teal-50 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
              )}
              {currentStep === totalSteps ? (
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  disabled={loading}
                  className="flex items-center space-x-2 px-6 py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Complete Onboarding</span>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center space-x-2 px-6 py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <PreviewModal />
    </div>
  );
};

export default OnboardingForm;
