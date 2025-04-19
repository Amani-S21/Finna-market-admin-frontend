const NavBar = () => {
  return (
    <div className="h-[100px] border-b border-gray-200 sticky top-0 bg-gray-50 z-30 flex px-8 items-center">
      <div className="flex gap-4 items-center ml-auto">
        <div className="text-right text-sm">
          <span>Yala Gédéon</span>
          <p className="font-bold">+243971945367</p>
        </div>
        <div className="h-[60px] w-[60px] rounded-full bg-white border border-gray-300 flex justify-center items-center hover:cursor-default">
          <p>YG</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
