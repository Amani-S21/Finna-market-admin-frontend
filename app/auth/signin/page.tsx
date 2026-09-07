import Image from "next/image";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import SigninForm from "./_components/SigninForm";
import styles from "./signin.module.css";

const SigninPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <aside className={styles.brand} aria-label="Finna Market">
          <div className={styles.brandHeader}>
            <span className={styles.wordmark}>finna<span>market</span></span>
            <span className={styles.brandBadge}>ADMINISTRATION</span>
          </div>
          <div className={styles.brandContent}>
            <div className={styles.logoFrame}>
              <Image src="/logo%20finna%20market.jpeg" alt="Logo Finna Market" width={240} height={240} priority className={styles.logo} />
            </div>
            <p className={styles.eyebrow}>VOTRE ESPACE DE GESTION</p>
            <h2>Tout votre univers.<br />Un seul espace.</h2>
            <p className={styles.brandDescription}>Retrouvez vos activités et pilotez votre quotidien depuis votre espace Finna Market.</p>
          </div>
          <div className={styles.brandFooter}><span>Une gestion simple. Une vision claire.</span><ArrowUpRight size={20} aria-hidden="true" /></div>
        </aside>
        <section className={styles.formPanel} aria-labelledby="signin-title">
          <div className={styles.formContent}>
            <div className={styles.accessBadge}><ShieldCheck size={16} aria-hidden="true" /> Espace administrateur</div>
            <header className={styles.formHeader}>
              <p className={styles.welcome}>BIENVENUE SUR FINNA MARKET</p>
              <h1 id="signin-title">Connexion</h1>
              <p>Heureux de vous retrouver.<br />Entrez vos identifiants pour accéder à votre espace.</p>
            </header>
            <SigninForm />
            <p className={styles.securityNote}><ShieldCheck size={16} aria-hidden="true" /> Accès réservé aux utilisateurs autorisés</p>
          </div>
          <footer className={styles.footer}><span>Finna Market · Administration</span><span>Powered by ksoft ©</span></footer>
        </section>
      </div>
    </div>
  );
};

export default SigninPage;
