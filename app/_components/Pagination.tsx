"use client";

import styles from "./interfaces.module.css";
import { Flex, IconButton, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";

type Props = {
  itemCount: number;
  pageSize: number;
  currentPage: number;
  className?: string;
};

const Pagination = ({ itemCount, pageSize, currentPage, className }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <Flex className={`${styles.pagination} ${className ?? ""}`} align="center" gap="2">
      <Text>
        Page {currentPage} sur {pageCount}
      </Text>
      <IconButton
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        aria-label="Première page"
        onClick={() => changePage(1)}
      >
        <RxDoubleArrowLeft />
      </IconButton>
      <IconButton
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        aria-label="Page précédente"
        onClick={() => changePage(currentPage - 1)}
      >
        <GoChevronLeft />
      </IconButton>
      <IconButton
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        aria-label="Page suivante"
        onClick={() => changePage(currentPage + 1)}
      >
        <GoChevronRight />
      </IconButton>
      <IconButton
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        aria-label="Dernière page"
        onClick={() => changePage(pageCount)}
      >
        <RxDoubleArrowRight />
      </IconButton>
    </Flex>
  );
};

export default Pagination;
