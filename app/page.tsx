"use client";

import { Button, Card, Grid, Heading } from "@radix-ui/themes";
import { BadgeDollarSign, BedSingle, LogOut, Plane } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col container mx-auto pb-32">
      <div className="py-8 flex gap-4 items-center justify-end">
        <Button
          onClick={() => signOut()}
          variant="soft"
          radius="full"
          color="red"
        >
          <LogOut size={15} />
          <span className="text-xs">Déconnection</span>
        </Button>
        <div className="h-[60px] w-[60px] rounded-full bg-white border border-gray-300 flex justify-center items-center hover:cursor-default">
          <p>GE</p>
        </div>
      </div>
      <div className="flex justify-center items-center my-auto">
        <Grid
          gap="4"
          columns={{ initial: "1", md: "3" }}
          className="max-w-3xl my-auto"
        >
          <Card
            className="hover:cursor-pointer hover:bg-gray-300 transition-colors"
            onClick={() => router.push("/market")}
          >
            <div className="flex flex-col items-center justify-center h-full gap-4 py-4 px-6">
              <Heading size="3" color="gray">
                Marché
              </Heading>
              <BadgeDollarSign size={50} color="gray" />
            </div>
          </Card>
          <Card
            className="hover:cursor-pointer hover:bg-gray-300"
            onClick={() => router.push("/market")}
          >
            <div className="flex flex-col items-center justify-center h-full gap-4 py-4 px-6">
              <Heading size="3" color="gray">
                Transport
              </Heading>
              <Plane size={50} color="gray" />
            </div>
          </Card>
          <Card
            className="hover:cursor-pointer hover:bg-gray-300"
            onClick={() => router.push("/market")}
          >
            <div className="flex flex-col items-center justify-center h-full gap-4 py-4 px-6">
              <Heading size="3" color="gray">
                Réservation
              </Heading>
              <BedSingle size={50} color="gray" />
            </div>
          </Card>
        </Grid>
      </div>
    </div>
  );
}
