import { Roles } from "@/app/lib/types";
import { Badge } from "@radix-ui/themes";

const UserRoleBadge = ({ role }: { role: Roles }) => {
  return (
    <Badge color="gray">
      <p className="lowercase first-letter:uppercase">{useRole[role]}</p>
    </Badge>
  );
};

const useRole: Record<Roles, string> = {
  CUSTOMER: "client",
  DELIVERER: "livreur",
  SUPER_ADMIN: "super admin",
  SUPER_MARKET_ADMIN: "super admin super marché",
  DELIVERER_ADMIN : "Admin livraison"
};

export default UserRoleBadge;
