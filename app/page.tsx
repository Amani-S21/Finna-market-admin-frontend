"use client";

import { Card, Grid, Heading } from "@radix-ui/themes";
import { BadgeDollarSign, BedSingle, Plane } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="h-screen flex flex-col px-8 mx-auto pb-32">
      <div
        className="py-4 flex gap-4 items-center"
        onClick={() => router.push("/profile/details")}
      >
        <div className="flex gap-4 items-center ml-auto">
          <div className="text-right text-sm">
            <span className="lowercase">{session?.data.fullName}</span>
            <p className="font-bold">{session?.data.phone}</p>
          </div>
          <div className="h-[60px] w-[60px] rounded-full bg-white border border-gray-300 flex justify-center items-center hover:cursor-default">
            <p className="uppercase">
              {session?.data.fullName.substring(0, 2)}
            </p>
          </div>
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
