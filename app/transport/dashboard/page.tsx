import Link from "next/link";
import { ArrowRight, Building2, Bus, MapPin } from "lucide-react";
import { DashboardHeading } from "@/app/_components/DashboardView";
import styles from "@/app/_components/dashboard.module.css";

const sections = [
  { title: "Agences", description: "Retrouvez les agences et accédez à la gestion de leurs véhicules.", href: "/transport/agencies/list?page=1", icon: Building2 },
  { title: "Types d’engins", description: "Consultez les catégories de véhicules de votre réseau de transport.", href: "/transport/vehicle-types/list?page=1", icon: Bus },
  { title: "Places", description: "Retrouvez les lieux utilisés pour organiser vos transports.", href: "/transport/places/list?page=1", icon: MapPin },
];

export default function TransportDashboard() {
  return <div className={styles.dashboard}>
    <DashboardHeading title="Tableau de bord du transport" description="Retrouvez les espaces de gestion de votre réseau de transport." />
    <div className={styles.transportGrid}>{sections.map(({ title, description, href, icon: Icon }) => <Link key={href} href={href} className={styles.transportCard}><span className={styles.panelIcon}><Icon size={21} aria-hidden="true" /></span><h2>{title}</h2><p>{description}</p><span>Accéder à la gestion<ArrowRight size={16} aria-hidden="true" /></span></Link>)}</div>
  </div>;
}
