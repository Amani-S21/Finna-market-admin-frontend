import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../lib/authOptions";

const NavBar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-[80px]  sticky border-b border-gray-200 top-0 bg-gray-50 z-30 flex px-8 items-center">
      <Link href="/profile/details" className="flex gap-4 items-center ml-auto">
        <div className="flex gap-4 items-center ml-auto">
          <div className="text-right text-sm">
            <span className="lowercase">{session?.data.fullName}</span>
            <p className="font-bold">{session?.data.phone}</p>
          </div>
          <div className="h-[60px] w-[60px] rounded-full bg-white border border-gray-300 flex justify-center items-center hover:cursor-default">
            <p className="uppercase">
              {session?.data.fullName.substring(0, 2)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NavBar;
