"use client";

import { Flex } from "@radix-ui/themes";
import { ReactNode } from "react";
import NavBar from "../_components/NavBar";
import { SideBar } from "../_components";

const MarketPage = ({ children }: { children: ReactNode }) => {
  return (
    <Flex>
      <SideBar />
      <div className="flex flex-col w-full bg-gray-50">
        <NavBar />
        <div className="p-8">{children}</div>
      </div>
    </Flex>
  );
};

export default MarketPage;
