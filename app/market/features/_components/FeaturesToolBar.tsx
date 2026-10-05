import PageToolbar from "@/app/_components/PageToolbar";
import { Button, Link } from "@radix-ui/themes";
import { MdOutlineFeaturedPlayList } from "react-icons/md";

const FeaturesToolBar = () => {
  return (
    <PageToolbar icon={<MdOutlineFeaturedPlayList />} title="Caractéristiques" description="Toutes les caractéristiques disponibles dans l'entreprise">

      <Link href="/market/features/new">
        <Button>
          <span className="text-xs">Nouvelle caractéristique</span>
        </Button>
      </Link>
    </PageToolbar>
  );
};

export default FeaturesToolBar;
