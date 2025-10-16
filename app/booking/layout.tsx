"use client";

import { Flex } from "@radix-ui/themes";
import { ReactNode } from "react";
import NavBar from "../_components/NavBar";
import { SideBar } from "../_components";
import BookingSideBar from "./_components/SideBar";

const BookingPage = ({ children }: { children: ReactNode }) => {
  return (
    <Flex>
      <BookingSideBar />
      <div className="flex flex-col w-full bg-gray-50">
        <NavBar />
        <div className="p-8">{children}</div>
      </div>
    </Flex>
  );
};

export default BookingPage;
