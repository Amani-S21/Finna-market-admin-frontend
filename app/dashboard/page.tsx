"use client";

import React, { useState } from "react";
import useAxiosAuth from "../lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const DashBoardScreen = () => {
  const [orders, setOrders] = useState([]);
  const { data: session } = useSession();

  const axios = useAxiosAuth();

  const fetchOrders = async () => {
    const orders = await axios.get("/orders?page=1&limit=10");
    setOrders(orders.data);
  };

  return (
    <div className="p-4">
      <p>DashBoardScreen</p>
      <div className="flex gap-4 space-y-4">
        <p className="text-amber-900">{session?.data?.fullName}</p>
        <Link href="/api/auth/signout">Signout</Link>
      </div>
      
      <p className="py-4">{session?.accessToken}</p>
      {orders && <p>{JSON.stringify(orders)}</p>}
      <Button onClick={fetchOrders}>Fetch orders</Button>
    </div>
  );
};

export default DashBoardScreen;
