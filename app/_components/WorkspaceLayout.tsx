import type { ReactNode } from "react";
import { Theme } from "@radix-ui/themes";
import NavBar from "./NavBar";
import styles from "./workspace.module.css";

export default function WorkspaceLayout({ sidebar, children, title }: { sidebar: ReactNode; children: ReactNode; title: string }) {
  return (
    <Theme accentColor="violet" grayColor="slate" radius="large" className={styles.workspace}>
      <div className={styles.layout}>
        {sidebar}
        <div className={styles.main}>
          <NavBar title={title} />
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </Theme>
  );
}
