"use client";

import { createContext, useContext } from "react";

export const FormDialogContext = createContext<{ footer: HTMLDivElement | null; close: () => void } | null>(null);
export const useFormDialog = () => useContext(FormDialogContext);
