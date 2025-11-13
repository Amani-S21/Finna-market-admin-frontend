"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    // If there’s a previous page in history, go back.
    if (window.history.length > 1) {
      router.back();
    } else {
      // Otherwise, go to a safe fallback.
      router.push("market/features/list?page=1");
    }
  };

  return (
    <div
      className="flex cursor-pointer items-center justify-center bg-white border border-gray-200 rounded-full h-10 w-10"
      onClick={handleBack}
    >
      <X />
    </div>
  );
};

export default BackButton;
