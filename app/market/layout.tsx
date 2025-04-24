import { ReactNode } from "react";
import SideBar from "../_components/SideBar";
import { Flex } from "@radix-ui/themes";
import NavBar from "../_components/NavBar";

const MarketPage = ({ children }: { children: ReactNode }) => {
  return (
    <Flex>
      {/* <SideBar /> */}
      <div className="flex flex-col w-full bg-gray-50">
        <NavBar />
        <div className="p-8">{children}</div>
      </div>
    </Flex>
  );
};

export default MarketPage;
