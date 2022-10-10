import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { useShopContext } from "../contexts/ShopContext";
import { Cart } from "./Cart";

export const Header = () => {
  const { showCart, showCartHandler } = useShopContext();

  return (
    <div className="w-full h-16">
      <div className="max-w-container mx-auto flex justify-between items-center h-16 px-10 z-10">
        <Link href={"/"}>
          <p className="text-3xl cursor-pointer">Styled.</p>
        </Link>
        <div
          className="relative cursor-pointer px-1"
          onClick={() => showCartHandler(true)}
        >
          <FiShoppingBag className="" size={25} />
        </div>
      </div>
      {showCart && <Cart />}
    </div>
  );
};
