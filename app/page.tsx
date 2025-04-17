import { Button } from "@radix-ui/themes";
import SigninButton from "./_components/SigninButton";
import Link from "next/link";
import ConnectButton from "./_components/ConnectButton";

export default function Home() {
  return (
    <div className="p-8">
      <SigninButton />
      <p className="mb-4">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore
        provident commodi officiis veritatis voluptatem sed natus nisi!
        Laboriosam fuga iste, inventore blanditiis dolore ipsum? Incidunt
        laudantium dolores modi fuga beatae?
      </p>
      <p className="mb-4">
        <Link href="/dashboard">Go to dashboard</Link>
      </p>
      <ConnectButton  />
    </div>
  );
}
