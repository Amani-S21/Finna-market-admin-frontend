"use client";

import { ArrowRight, BadgeDollarSign, BedSingle, Plane } from "lucide-react";
import Link from "next/link";
import Brand from "./_components/Brand";
import ProfileLink from "./_components/ProfileLink";
import styles from "./_components/workspace.module.css";

const modules = [
  { title: "Marché", description: "Retrouvez vos boutiques, vos utilisateurs et vos commandes.", href: "/market/dashboard", icon: BadgeDollarSign },
  { title: "Transport", description: "Accédez à la gestion des agences et de vos transports.", href: "/transport/dashboard", icon: Plane },
  { title: "Réservation", description: "Retrouvez vos établissements et suivez vos réservations.", href: "/booking/dashboard", icon: BedSingle },
];

export default function Home() {
  return (
    <div className={styles.home}>
      <header className={styles.homeHeader}>
        <Brand />
        <ProfileLink />
      </header>
      <section className={styles.homeContent}>
        <p className={styles.eyebrow}>VOTRE ESPACE DE GESTION</p>
        <h1>Tout votre univers.<br />Un seul espace.</h1>
        <p className={styles.intro}>Bienvenue sur Finna Market. Choisissez un espace pour commencer.</p>
        <div className={styles.moduleGrid}>
          {modules.map(({ title, description, href, icon: Icon }) => (
            <Link key={href} href={href} className={styles.moduleCard}>
              <span className={styles.moduleIcon}><Icon size={26} aria-hidden="true" /></span>
              <h2>{title}</h2><p>{description}</p>
              <span className={styles.moduleAction}>Accéder à l’espace<ArrowRight size={17} aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </section>
      <footer className={styles.homeFooter}>Finna Market · Powered by ksoft ©</footer>
    </div>
  );
}
