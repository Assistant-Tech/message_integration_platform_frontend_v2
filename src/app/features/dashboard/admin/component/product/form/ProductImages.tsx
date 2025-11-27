import React, { useCallback, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Plus, X } from "lucide-react";
import { Button } from "@/app/components/ui";
import { CreateProductData } from "@/app/types/product.types";

interface Props {
  setValue: UseFormSetValue<CreateProductData>;
}

const ProductImages: React.FC<Props> = ({ setValue }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const updatedFiles = [...files, ...acceptedFiles];
      setFiles(updatedFiles);
      setValue("images", updatedFiles as any, { shouldValidate: true });

      const newPreviews = acceptedFiles.map((file) =>
        URL.createObjectURL(file),
      );
      setPreviews((prev) => [...prev, ...newPreviews]);
    },
    [files, setValue],
  );

  const removeImage = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    setValue("images", updatedFiles as any, { shouldValidate: true });
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    noClick: true,
    multiple: true,
  });

  return (
    <div className="bg-white rounded-lg border border-grey-light w-full">
      <div className="px-6 py-4 border-b border-grey-light bg-base-white">
        <h2 className="h5-bold-16 text-grey">
          Product Image <span className="text-red-500">*</span>
        </h2>
      </div>
      <div className="p-6" {...getRootProps()}>
        <input {...getInputProps()} style={{ display: "none" }} />

        {previews.length === 0 ? (
          <div className="border border-dashed border-grey-light rounded-lg bg-grey-soft flex flex-col items-center justify-center text-center px-4 py-12 cursor-pointer">
            <p className="body-bold-16 text-grey mb-1">
              Drag & drop your file here
            </p>
            <span className="body-medium-16 text-grey mb-2">Or</span>
            <Button
              type="button"
              label="Add Attachment"
              IconLeft={<Plus size={18} />}
              variant="primary"
              className="px-4 bg-grey hover:bg-base-black text-white"
              onClick={open}
            />
            <p className="mt-4 body-regular-16 text-grey-light">
              You can only attach .jpeg, .jpg or .png files
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
              {previews.map((src, index) => (
                <div
                  key={index}
                  className="group relative w-full h-72 bg-grey-light rounded-lg overflow-hidden"
                >
                  <img
                    src={src}
                    alt={`preview-${index}`}
                    className="w-72 h-72 object-cover"
                  />

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black/60 hover:bg-black text-white rounded-full p-1 cursor-pointer"
                  >
                    <X size={16} />
                  </button>

                  {/* Index badge */}
                  <span className="absolute bottom-1 left-1 bg-primary/60 hover:bg-primary-dark cursor-pointer text-white rounded-full px-3 py-1">
                    {index === 0 ? "Main" : index + 1}
                  </span>
                </div>
              ))}
            </div>

            <Button
              type="button"
              label="Add Attachment"
              IconLeft={<Plus size={18} />}
              variant="primary"
              className="px-4 bg-grey hover:bg-base-black text-white my-4"
              onClick={open}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImages;
