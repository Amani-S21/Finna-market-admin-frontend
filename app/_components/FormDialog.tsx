"use client";

import { Button, Dialog, Theme } from "@radix-ui/themes";
import { X, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { FormDialogContext } from "./FormDialogContext";
import workspace from "./workspace.module.css";
import styles from "./form-dialog.module.css";

type ContentProps = {
  children: ReactNode;
  title: string;
  close: () => void;
  description?: string;
  maxWidth?: string;
};

// Also used by forms opened inside another dialog (for example, a trip leg).
export function FormDialogContent({ children, title, close, description = "Complétez les informations, puis validez votre formulaire.", maxWidth = "940px" }: ContentProps) {
  const [footer, setFooter] = useState<HTMLDivElement | null>(null);

  return (
    <Dialog.Content className={styles.dialog} maxWidth={maxWidth} onInteractOutside={(event) => event.preventDefault()}>
      <FormDialogContext.Provider value={{ footer, close }}>
        <header className={styles.header}>
          <span className={styles.icon}><SquarePen size={21} aria-hidden="true" /></span>
          <div><Dialog.Title className={styles.title}>{title}</Dialog.Title><Dialog.Description className={styles.description}>{description}</Dialog.Description></div>
          <button type="button" className={styles.close} onClick={close} aria-label="Fermer la fenêtre"><X size={20} aria-hidden="true" /></button>
        </header>
        <div className={`${workspace.content} ${styles.body}`}>{children}</div>
        <footer className={styles.footer}>
          <Button type="button" variant="soft" color="gray" onClick={close}>Annuler</Button>
          <div ref={setFooter} className={styles.submitSlot} />
        </footer>
      </FormDialogContext.Provider>
    </Dialog.Content>
  );
}

export default function FormDialog({ children, title, fallback, intercepted = false }: { children: ReactNode; title: string; fallback: string; intercepted?: boolean }) {
  const router = useRouter();
  const close = () => intercepted ? router.back() : router.replace(fallback);

  return (
    <Theme accentColor="violet" grayColor="slate" radius="large">
      <Dialog.Root open onOpenChange={(open) => { if (!open) close(); }}>
        <FormDialogContent title={title} close={close}>{children}</FormDialogContent>
      </Dialog.Root>
    </Theme>
  );
}
