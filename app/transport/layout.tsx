"use client";

import { Flex } from "@radix-ui/themes";
import { ReactNode } from "react";
import NavBar from "../_components/NavBar";
import TransportSideBar from "./_components/SideBar";

const TransportPage = ({ children }: { children: ReactNode }) => {
  return (
    <Flex>
      <TransportSideBar />
      <div className="flex flex-col w-full bg-gray-50">
        <NavBar />
        <div className="p-8">{children}</div>
      </div>
    </Flex>
  );
};

export default TransportPage;
