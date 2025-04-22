import { useDebounce } from "@/app/lib/hooks/otherHooks";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { User } from "@/app/lib/types";
import { TextField } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  setSelectedId: (value: string) => void;
};

const SearUserTextField = ({
  value,
  onChange,
  onBlur,
  setSelectedId,
}: Props) => {
  const [isManuallySelected, setIsManuallySelected] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const axios = useAxiosAuth();
  const debouncedSearchTerm = useDebounce(value, 300);

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery<User[]>({
    queryKey: ["shops", debouncedSearchTerm],
    queryFn: () =>
      axios
        .get(`/users/search?term=${debouncedSearchTerm}`)
        .then((res) => res.data),
    enabled: !!debouncedSearchTerm,
    staleTime: 60 * 1000,
  });

  // ✅ Detect clicks outside
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
  }, [onblur]);

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
  }, [debouncedSearchTerm, refetch]);

  const handleSelect = (item: User) => {
    setIsManuallySelected(true);
    setSelectedId(item.id);
    onChange(item.fullName);
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
        placeholder="Chercher un client"
      />

      {isDropdownVisible && (
        <div className="absolute w-full bg-white shadow mt-1 max-h-40 overflow-auto z-10">
          {isLoading ? (
            <div className="p-2">Chargement...</div>
          ) : users && users.length > 0 ? (
            <ul>
              {users.map((item: User) => (
                <li
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {item.fullName}
                </li>
              ))}
            </ul>
          ) : (
            value && <div className="p-2">Aucun résultat trouvé</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearUserTextField;
