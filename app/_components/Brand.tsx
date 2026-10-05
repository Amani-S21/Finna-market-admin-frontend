import Image from "next/image";
import Link from "next/link";
import styles from "./workspace.module.css";

export default function Brand() {
  return (
    <Link href="/" className={styles.brand} aria-label="Finna Market — Accueil">
      <Image src="/logo%20finna%20market.jpeg" width={44} height={44} alt="" className={styles.logo} />
      <span>finna<span className={styles.brandLight}>market</span><small>ESPACE ADMINISTRATION</small></span>
    </Link>
  );
}
