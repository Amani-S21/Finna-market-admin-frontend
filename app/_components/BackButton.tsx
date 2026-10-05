"use client";

import { useFormDialog } from "./FormDialogContext";
import styles from "./interfaces.module.css";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  const dialog = useFormDialog();
  if (dialog) return null;

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
    <button
      type="button"
      className={styles.back}
      onClick={handleBack}
    >
      <ArrowLeft size={15} aria-hidden="true" /> Retour
    </button>
  );
};

export default BackButton;
