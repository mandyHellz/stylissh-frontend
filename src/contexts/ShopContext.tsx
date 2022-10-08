import { createContext, useContext, useState } from "react";
import { Product } from "../types/product";

interface ShopContextProps {
  productQuantity: number;
  increaseProductQuantity: () => void;
  decreaseProductQuantity: () => void;
  cartItems: cartItemProps[];
  onAddToCart: (data) => void;
}

interface cartItemProps {
  product: Product;
  quantity: number;
}

export const ShopContext = createContext<ShopContextProps>({
  productQuantity: undefined,
  increaseProductQuantity: undefined,
  decreaseProductQuantity: undefined,

  cartItems: undefined,
  onAddToCart: undefined,
});

export const ShopProvider = ({ children }) => {
  const [productQuantity, setProductQuantity] = useState<number>(1);

  const increaseProductQuantity = () => {
    setProductQuantity((prevQtty) => prevQtty + 1);
  };

  const decreaseProductQuantity = () => {
    setProductQuantity((prevQtty) => (prevQtty > 1 ? prevQtty - 1 : prevQtty));
  };

  const [cartItems, setCartItems] = useState<cartItemProps[]>([]);

  const onAddToCart = (data: { product; quantity }) => {
    const itExists = cartItems.find(
      (cartItem) =>
        cartItem.product.attributes.slug === data.product.attributes.slug
    );

    if (itExists) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.product.attributes.slug === data.product.attributes.slug
            ? { ...itExists, quantity: itExists.quantity + data.quantity }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, data]);
    }
  };

  console.log(cartItems);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  return (
    <ShopContext.Provider
      value={{
        productQuantity,
        increaseProductQuantity,
        decreaseProductQuantity,
        cartItems,
        onAddToCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => useContext(ShopContext);
