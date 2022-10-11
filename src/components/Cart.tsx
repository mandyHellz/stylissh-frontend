import { useShopContext } from "../contexts/ShopContext";
import { FaShoppingCart } from "react-icons/fa";
import { QuantitySelector } from "./QuantitySelector";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import { getStripeJs } from "../lib/getStripe";
import axios from "axios";

const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

const cards = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};

export const Cart = () => {
  const {
    cartItems,
    showCartHandler,
    addItemToCart,
    removeItemFromCart,
    totalCartPrice,
  } = useShopContext();

  const handleCheckoutButton = async () => {
    try {
      const stripePromise = await getStripeJs();
      const response = await axios.post("/api/checkout", {
        products: cartItems,
      });
      const data = await response.data;
      await stripePromise.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      alert("Error in checkout redirect!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 right-0 left-0 z-50 h-screen w-full flex justify-end bg-primary-800"
      onClick={() => showCartHandler(false)}
    >
      <motion.div
        initial={{ x: "50%" }}
        animate={{ x: "0%" }}
        exit={{ x: "50%" }}
        transition={{ type: "tween" }}
        className="no-scrollbar w-full h-full md:w-3/5 xl:w-2/5 bg-secondary-300"
      >
        <motion.div className="w-full h-8 flex justify-end px-4 pt-4">
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-secondary duration-300"
            onClick={() => showCartHandler(false)}
          >
            <AiOutlineCloseCircle className="w-5 h-5" />
          </div>
        </motion.div>

        <motion.div
          variants={cards}
          initial="hidden"
          animate="show"
          layout
          className="no-scrollbar h-full py-8 px-16 lg:px-20 relative overflow-y-scroll"
          onClick={(e) => e.stopPropagation()}
        >
          {cartItems.length <= 0 && (
            <motion.div
              variants={card}
              layout
              className="w-4/5 h-full absolute -top-8 -translate-x-1/2 flex flex-col items-center justify-center gap-4"
            >
              <h1 className="font-medium">You have more shopping to do 😉</h1>
              <FaShoppingCart className="text-secondary w-24 h-24" />
            </motion.div>
          )}

          {cartItems.length > 0 &&
            cartItems.map((item) => {
              return (
                <motion.div
                  variants={card}
                  layout
                  key={item.product.id}
                  className="flex items-center justify-between gap-2 rounded-sm overflow-hidden bg-white p-8 my-8"
                >
                  <img
                    src={
                      item.product.attributes.image.data.attributes.formats
                        .thumbnail.url
                    }
                    alt={item.product.attributes.title}
                    className="w-24 h-24 object-cover"
                  />
                  <div className="w-1/2 flex flex-col h-24 justify-around text-base">
                    <div className="text-secondary">
                      <h3 className="font-medium">
                        {item.product.attributes.title}
                      </h3>
                      <h3>${item.product.attributes.price}</h3>
                    </div>
                    <QuantitySelector
                      minusButtonHandler={() => removeItemFromCart(item)}
                      plusButtonHandler={() =>
                        addItemToCart({ product: item.product, quantity: 1 })
                      }
                      quantity={item.quantity}
                      className="text-sm"
                    />
                  </div>
                </motion.div>
              );
            })}

          {cartItems.length > 0 && (
            <motion.div layout>
              <h3>Subtotal: ${totalCartPrice}</h3>
              <button
                onClick={handleCheckoutButton}
                className="my-8 w-full bg-primary hover:bg-secondary duration-300 text-white font-medium text-xs sm:text-sm px-4 py-2 border"
              >
                Checkout
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
