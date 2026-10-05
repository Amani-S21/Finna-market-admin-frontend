"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Brand from "./Brand";
import styles from "./workspace.module.css";

type NavigationItem = { href: string; label: string; icon: ReactNode };

export default function WorkspaceSidebar({ links, title }: { links: NavigationItem[]; title: string }) {
  const currentPath = usePathname();
  return (
    <aside className={styles.sidebar}>
      <Brand />
      <p className={styles.navCaption}>{title}</p>
      <nav aria-label={`Navigation ${title}`} className={styles.navigation}>
        <ul>
          {links.map((link) => {
            const active = link.href.split("?")[0] === currentPath;
            return (
              <li key={link.href}>
                <Link href={link.href} className={`${styles.navLink} ${active ? styles.active : ""}`} aria-current={active ? "page" : undefined}>
                  {link.icon}<span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={styles.sidebarFooter}><span>Finna Market</span><small>Une gestion simple. Une vision claire.</small></div>
    </aside>
  );
}
