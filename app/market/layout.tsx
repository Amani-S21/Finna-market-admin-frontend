import Link from "next/link";
import { ReactNode } from "react";

const MarketPage = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <p>Market layout</p>
      <Link href="/market/stores">Stores</Link>
      <Link href="/market/delivers">Delivers</Link>
      <div>{children}</div>
    </div>
  );
};

export default MarketPage;
