"use client";

import { useFormDialog } from "./FormDialogContext";
import type { ReactNode } from "react";
import { Theme } from "@radix-ui/themes";
import Brand from "./Brand";
import BackButton from "./BackButton";
import styles from "./interfaces.module.css";
import workspace from "./workspace.module.css";

export default function AccountPage({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  const dialog = useFormDialog();
  if (dialog) return <>{children}</>;
  return <Theme accentColor="violet" grayColor="slate" radius="large" className={styles.account}><header className={styles.accountHeader}><Brand /><BackButton /></header><div className={styles.accountContent}><p className={styles.eyebrow}>MON COMPTE</p><h1>{title}</h1><p className={styles.accountDescription}>{description}</p><div className={`${workspace.content} ${styles.accountPanel}`}>{children}</div></div></Theme>;
}
