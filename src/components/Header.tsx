import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";

export const Header = () => {
  return (
    <div className="w-full flex justify-between items-center h-16 px-4 bg-white">
      <Link href={"/"}>
        <p className="text-3xl cursor-pointer">Styled.</p>
      </Link>
      <Link href={"/"}>
        <div className="relative cursor-pointer">
          <FiShoppingBag className="" size={25} />
        </div>
      </Link>
    </div>
  );
};
