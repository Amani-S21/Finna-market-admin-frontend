"use client";

import { IconButton, Tooltip } from "@radix-ui/themes";
import { Eye, Pencil } from "lucide-react";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof IconButton>, "children"> & {
  action: "view" | "edit";
};

export default function ActionIconButton({ action, ...props }: Props) {
  const label = props["aria-label"] ?? (action === "edit" ? "Modifier" : "Voir les détails");
  const Icon = action === "edit" ? Pencil : Eye;
  return (
    <Tooltip content={label}>
      <IconButton type="button" aria-label={label} {...props}>
        <Icon size={18} aria-hidden="true" />
      </IconButton>
    </Tooltip>
  );
}
