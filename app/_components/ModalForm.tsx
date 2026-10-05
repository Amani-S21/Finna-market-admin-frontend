"use client";

import { cloneElement, createContext, useContext, useId, type ComponentPropsWithoutRef, type ReactElement } from "react";
import { createPortal } from "react-dom";
import { useFormDialog } from "./FormDialogContext";

const FormIdContext = createContext<string | undefined>(undefined);

export function ModalForm({ children, id, onSubmit, ...props }: ComponentPropsWithoutRef<"form">) {
  const generatedId = useId();
  const formId = id ?? `form-${generatedId}`;
  return <FormIdContext.Provider value={formId}><form {...props} id={formId} onSubmit={(event) => { event.stopPropagation(); onSubmit?.(event); }}>{children}</form></FormIdContext.Provider>;
}

// Keep the original button and its loading/disabled state attached to its form,
// even when its visual position is outside the scrolling area.
export function FormActions({ children }: { children: ReactElement<{ form?: string; type?: "submit" }> }) {
  const dialog = useFormDialog();
  const formId = useContext(FormIdContext);
  if (!dialog) return children;
  if (!dialog.footer) return null;
  return createPortal(cloneElement(children, { form: formId, type: "submit" }), dialog.footer);
}
