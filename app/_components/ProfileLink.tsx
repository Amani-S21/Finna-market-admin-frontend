"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./workspace.module.css";

export default function ProfileLink() {
  const { data: session } = useSession();
  return (
    <Link href="/profile/details" className={styles.profile} aria-label="Voir mon profil">
      <div className={styles.profileText}><span>{session?.data.fullName}</span><small>{session?.data.phone}</small></div>
      <span className={styles.avatar}>{session?.data.fullName.substring(0, 2)}</span>
    </Link>
  );
}
