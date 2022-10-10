import { useShopContext } from "../contexts/ShopContext";
import { FaShoppingCart } from "react-icons/fa";
import { QuantitySelector } from "./QuantitySelector";

export const Cart = () => {
  const { cartItems, showCartHandler, addItemToCart, removeItemFromCart } =
    useShopContext();

  return (
    <div
      className="fixed top-0 right-0 left-0 z-50 h-screen w-full flex justify-end bg-primary-800"
      onClick={() => showCartHandler(false)}
    >
      <div
        className="w-full h-full md:w-1/2 xl:w-2/5 bg-secondary-300 py-8 px-16 lg:px-20 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {cartItems.length <= 0 && (
          <div className="w-full h-full absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-4">
            <h1 className="font-medium">You have more shopping to do 😉</h1>
            <FaShoppingCart className="text-secondary w-24 h-24" />
          </div>
        )}
        {cartItems.length > 0 &&
          cartItems.map((item) => {
            return (
              <div
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
                <div className="flex flex-col h-24 justify-around text-base">
                  <div className="text-secondary">
                    <h3 className="font-medium">
                      {item.product.attributes.title}
                    </h3>
                    <h3>{item.product.attributes.price}</h3>
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
              </div>
            );
          })}
      </div>
    </div>
  );
};
