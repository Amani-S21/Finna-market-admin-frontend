import { Flex, IconButton, Text } from "@radix-ui/themes";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import React from "react";
import { ChevronLeftIcon } from "lucide-react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

type Props = {
  itemCount: number;
  pageSize: number;
  currentPage: number;
  className?: string;
};

const Pagination = ({ itemCount, pageSize, currentPage, className }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return;

  return (
    <Flex className={className} align="center" gap="2">
      <Text>
        Page {currentPage} sur {pageCount}
      </Text>
      <IconButton color="gray" variant="soft" disabled={currentPage === 1}>
        <RxDoubleArrowLeft />
      </IconButton>
      <IconButton color="gray" variant="soft" disabled={currentPage === 1}>
        <GoChevronLeft />
      </IconButton>
      <IconButton color="gray"  variant="soft" disabled={currentPage === pageCount}>
        <RxDoubleArrowRight />
      </IconButton>
      <IconButton color="gray" variant="soft" disabled={currentPage === pageCount}>
        <GoChevronRight />
      </IconButton>
    </Flex>
  );
};

export default Pagination;
