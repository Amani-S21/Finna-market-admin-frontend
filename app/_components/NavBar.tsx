"use client";

import { ChevronRight } from "lucide-react";
import ProfileLink from "./ProfileLink";
import styles from "./workspace.module.css";

export default function NavBar({ title = "Administration" }: { title?: string }) {
  return (
    <header className={styles.topbar}>
      <div className={styles.breadcrumb}><span>Espace de gestion</span><ChevronRight size={14} aria-hidden="true" /><strong>{title}</strong></div>
      <ProfileLink />
    </header>
  );
}
