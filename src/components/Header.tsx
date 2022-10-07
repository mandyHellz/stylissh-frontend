import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";

export const Header = () => {
  return (
    <div className="w-full bg-white h-16">
      <div className="max-w-container mx-auto flex justify-between items-center h-16 px-10">
        <Link href={"/"}>
          <p className="text-3xl cursor-pointer">Styled.</p>
        </Link>
        <Link href={"/"}>
          <div className="relative cursor-pointer px-1">
            <FiShoppingBag className="" size={25} />
          </div>
        </Link>
      </div>
    </div>
  );
};
