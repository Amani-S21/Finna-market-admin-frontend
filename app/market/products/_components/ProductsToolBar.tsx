import PageToolbar from "@/app/_components/PageToolbar";
import { Button, Flex, Link } from "@radix-ui/themes";
// import { Search } from "lucide-react";
import { IoStorefrontOutline } from "react-icons/io5";

const ProductsToolBar = () => {
  return (
    <PageToolbar icon={<IoStorefrontOutline />} title="Produits" description="Tous les produits disponibles dans l'entreprise">

      <Flex gap="4" align="center">
        {/* <Search size={16} /> */}
        <Link href="/market/products/new">
          <Button>
            <span className="text-xs">Nouveau produit</span>
          </Button>
        </Link>
      </Flex>

      {/* {role && role !== "SUPER_ADMIN" && (
        <Flex gap="4" align="center">
          <Search size={16} />
          <Link href="/market/products/new">
            <Button>
              <span className="text-xs">Nouveau produit</span>
            </Button>
          </Link>
        </Flex>
      )} */}
    </PageToolbar>
  );
};

export default ProductsToolBar;
