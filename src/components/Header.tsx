import Link from "next/link";
import { Cart } from "./Cart";
import { useShopContext } from "../contexts/ShopContext";
import { FiShoppingBag } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

export const Header = () => {
  const { showCart, showCartHandler, totalCartItems } = useShopContext();

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
          {totalCartItems > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-red-500 w-5 h-5 flex items-center justify-center rounded-full absolute -top-1.5 -right-1.5"
            >
              <span className="text-white text-xxs">{totalCartItems}</span>
            </motion.div>
          )}
          <FiShoppingBag className="" size={25} />
        </div>
      </div>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </div>
  );
};
