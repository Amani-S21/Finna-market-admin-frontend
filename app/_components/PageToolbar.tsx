import type { ReactNode } from "react";
import styles from "./interfaces.module.css";

export default function PageToolbar({ icon, title, description, children }: { icon: ReactNode; title: string; description: string; children?: ReactNode }) {
  return <header className={styles.toolbar}><div className={styles.titleGroup}><span className={styles.titleIcon} aria-hidden="true">{icon}</span><div><h1>{title}</h1><p>{description}</p></div></div>{children && <div className={styles.actions}>{children}</div>}</header>;
}
