"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartColumn } from "lucide-react";
import styles from "./dashboard.module.css";

const colors = ["#6554b7", "#b58a46", "#b96983", "#46998a"];

export default function DashboardChart({ data, title }: { data: { label: string; value: number }[]; title: string }) {
  return <section className={styles.panel} aria-label={title}>
    <div className={styles.panelHeader}><span className={styles.panelIcon}><ChartColumn size={19} aria-hidden="true" /></span><div><h2>{title}</h2><p>Répartition par statut</p></div></div>
    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 8, left: -22, bottom: 4 }} accessibilityLayer>
          <CartesianGrid strokeDasharray="3 5" vertical={false} stroke="#ece9f3" />
          <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#8a8299", fontSize: 10 }} dy={10} interval={0} />
          <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: "#a49aad", fontSize: 10 }} />
          <Tooltip cursor={{ fill: "#f5f2fa" }} contentStyle={{ borderRadius: 12, border: "1px solid #e9e4f1", fontSize: 12, boxShadow: "0 8px 24px #40305d12" }} />
          <Bar dataKey="value" name="Nombre" maxBarSize={42} radius={[7, 7, 0, 0]}>{data.map((item, index) => <Cell key={item.label} fill={colors[index % colors.length]} />)}</Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div className={styles.chartLegend}>{data.map((item, index) => <span key={item.label}><i style={{ background: colors[index % colors.length] }} />{item.label}</span>)}</div>
  </section>;
}
