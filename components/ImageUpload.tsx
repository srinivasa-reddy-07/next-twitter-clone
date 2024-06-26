import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  label: string;
  value?: string;
  disabled?: boolean;
  onChange: (base64: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  value,
  disabled,
  onChange,
}) => {
  const [base64, setBase64] = useState(value);

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback((files: any) => {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event: any) => {
      setBase64(event.target.result);
      handleChange(event.target.result);
    };

    reader.readAsDataURL(file);
  }, [handleChange]);

  const {getRootProps, getInputProps} = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    }
  })
  
  return <div
  {...getRootProps({
    className: "w-full p-4 border-2 border-dotted text-white text-center rounded-md border-neutral-700 cursor-pointer"
  })}
  >
    <input {...getInputProps()} />
    {
      base64 ? (
        <div className="flex justify-center items-center">
          <Image 
            src={base64}
            height="100"
            width="100"
            alt="Uploaded Image"
          />
        </div>
      ): (
        <p className="text-white">{label}</p>
      )
    }
  </div>;
};

export default ImageUpload;
