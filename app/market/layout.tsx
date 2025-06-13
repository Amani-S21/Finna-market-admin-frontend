import { Flex } from "@radix-ui/themes";
import { ReactNode } from "react";
import NavBar from "../_components/NavBar";
import SuperAdminSideBar from "../_components/SuperAdminSideBar";

const MarketPage = ({ children }: { children: ReactNode }) => {
  return (
    <Flex>
      <SuperAdminSideBar />
      <div className="flex flex-col w-full bg-gray-50">
        <NavBar />
        <div className="p-8">{children}</div>
      </div>
    </Flex>
  );
};

export default MarketPage;
