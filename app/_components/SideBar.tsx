import NavLinks from "./NavLinks";

const SideBar = () => {
  return (
    <div className="min-w-[250px] border-r border-gray-200 h-screen bg-gray-50 flex flex-col items-start sticky top-0 px-10">
      <div className="h-[80px] w-[80px] self-center mt-8 mb-16"></div>

      <NavLinks />
    </div>
  );
};

export default SideBar;
