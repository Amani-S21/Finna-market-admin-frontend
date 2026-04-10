"use client";

import { BackButton } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { notFound, useParams } from "next/navigation";
import { useFetchHotelById } from "../../_features/hooks";
import EditHoteLoadingPage from "./loading";
import { TbCategoryMinus } from "react-icons/tb";
import { Text } from "@radix-ui/themes";
import HotelForm from "../../_components/HotelForm";

const EditHotelPage = () => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const params = useParams<{ id: string }>();
  const id = params.id ?? "";

  const {
    data: enterprise,
    isLoading,
    error,
  } = useFetchHotelById({
    axios,
    id,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return <EditHoteLoadingPage />;

  if (error) notFound();

  return (
    <>
      <div className="mb-2">
        <BackButton />
        <div className="flex items-center space-x-4 mt-5">
          <TbCategoryMinus />
          <span className="font-bold">Entréprise</span>
        </div>
        <Text as="p" size="2" mb="4">
          Remplissez les champs ci dessous pour modifer l'entréprise
        </Text>
      </div>
      <HotelForm hotel={enterprise} />
    </>
  );
};

export default EditHotelPage;
