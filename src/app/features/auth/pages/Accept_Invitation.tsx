import { Input, Logo, Button } from "@/app/components/ui";
import { useAuthStore } from "@/app/store/auth.store";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { REGISTER_IMAGE_URL } from "@/app/constants/image-cloudinary";

const AcceptInvitation = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const signup = useAuthStore((state) => state.signup);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (!token) {
        setError("Invalid or missing invitation token.");
        return;
      }
      const res = await signup(form.name, form.email, form.password, token);
      console.log("Invitation accepted:", res);

      // redirect to dashboard
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Left Section with image (optional, can remove if not needed) */}
      <div className="hidden lg:block w-1/2 h-full relative">
        <img
          src={REGISTER_IMAGE_URL}
          alt="accept-invitation"
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/80" />

        {/* Text Overlay */}
        <div className="absolute bottom-0 left-0 p-6 w-full px-32 py-12 text-white">
          <h2 className="h3-bold-32 pb-4 max-w-md">Collaborate Seamlessly</h2>
          <p className="body-bold-16 mt-1 max-w-2xl">
            Join your team and start collaborating instantly. Your invitation
            unlocks powerful tools for productivity and communication.
          </p>
        </div>
      </div>
      {/* Right Section (Form) */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center overflow-y-auto px-4 pt-20 pb-12 lg:pt-32">
        <div className="w-full max-w-md">
          <Logo />

          {/* Title */}
          <div className="text-start pt-8">
            <h2 className="h5-medium-16 text-grey-medium">
              You’ve been invited!
            </h2>
            <p className="mt-2 h3-bold-32 text-base-black">
              Accept your invitation
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              label="Accept Invitation"
              type="submit"
              className="w-full"
            />
          </form>

          {/* Footer */}
          <p className="h5-bold-16 text-grey-medium mt-8 text-center">
            © 2025 Chatblix. All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcceptInvitation;
