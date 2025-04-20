"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <div
      className="flex cursor-pointer items-center justify-center bg-white border border-gray-200 rounded-full h-10 w-10"
      onClick={() => router.back()}
    >
      <X />
    </div>
  );
};

export default BackButton;
