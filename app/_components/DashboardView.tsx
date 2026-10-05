import type { ReactNode } from "react";
import { ArrowUpRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import styles from "./dashboard.module.css";

export function DashboardHeading({ title, description }: { title: string; description: string }) {
  return <header className={styles.heading}><div><p className={styles.eyebrow}>VUE D’ENSEMBLE</p><h1>{title}</h1><p className={styles.description}>{description}</p></div><span className={styles.headingIcon}><LayoutDashboard size={24} aria-hidden="true" /></span></header>;
}

export default function DashboardView({ title, description, summary, chart, recent }: { title: string; description: string; summary: ReactNode; chart: ReactNode; recent: ReactNode }) {
  return <div className={styles.dashboard}><DashboardHeading title={title} description={description} />{summary}<div className={styles.detailGrid}>{chart}{recent}</div></div>;
}

export function StatCard({ title, value, description, link }: { title: string; value: number; description: string; link: string }) {
  return <Link href={link} className={styles.statCard}><div className={styles.statTop}><span className={styles.statDot} /><h2>{title}</h2><ArrowUpRight size={17} aria-hidden="true" /></div><strong className={styles.statValue}>{value.toLocaleString("fr-FR")}</strong><p>{description}</p><span className={styles.statFooter}>Voir les détails <span aria-hidden="true">→</span></span></Link>;
}
