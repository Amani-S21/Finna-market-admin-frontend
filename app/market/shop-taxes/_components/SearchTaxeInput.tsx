"use client";

import { useDebounce } from "@/app/lib/hooks/otherHooks";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Taxe, TaxesResponse } from "@/app/lib/types";
import { TextField } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  setSelectedTaxePriceId: (value: string) => void;
};

const SearchTaxInput = ({
  value,
  onChange,
  onBlur,
  setSelectedTaxePriceId,
}: Props) => {
  const [isManuallySelected, setIsManuallySelected] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const axios = useAxiosAuth();
  const debouncedSearchTerm = useDebounce(value, 300);

  const {
    data: taxeResponse,
    isLoading,
    refetch,
  } = useQuery<TaxesResponse>({
    queryKey: ["searched-tax-price", debouncedSearchTerm],
    queryFn: () =>
      axios
        .get(`/taxes/search?term=${debouncedSearchTerm}`)
        .then((res) => res.data),
    enabled: !!debouncedSearchTerm,
    staleTime: 60 * 1000,
  });


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isManuallySelected) {
      setIsManuallySelected(false);
      return;
    }

    if (debouncedSearchTerm) {
      refetch();
      setIsDropdownVisible(true);
    } else {
      setIsDropdownVisible(false);
    }
  }, [debouncedSearchTerm, refetch, isManuallySelected]);

  const handleSelect = (item: Taxe) => {
    setIsManuallySelected(true);
    setSelectedTaxePriceId(`${item.id}`);
    onChange(item.name);
    setIsDropdownVisible(false);
  };

  useEffect(() => {
    setIsDropdownVisible(false);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <TextField.Root
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => value && setIsDropdownVisible(true)}
        onBlur={onBlur}
        placeholder="Veuillez saisir une caractéristique"
      />

      {isDropdownVisible && (
        <div className="absolute w-full bg-white shadow mt-1 max-h-40 overflow-auto z-10">
          {isLoading ? (
            <div className="p-2">Chargement...</div>
          ) : taxeResponse && taxeResponse.data.length > 0 ? (
            <ul>
              {taxeResponse.data.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          ) : (
            value && <div className="p-2">Aucune donnée</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchTaxInput;
