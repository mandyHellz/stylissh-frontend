import { createContext, useContext, useState } from "react";
import { Product } from "../types/product";

interface ShopContextProps {
  productQuantity: number;
  increaseProductQuantity: () => void;
  decreaseProductQuantity: () => void;
  cartItems: cartItemProps[];
  addItemToCart: (data: cartItemProps) => void;
  removeItemFromCart: (data: cartItemProps) => void;
  showCart: boolean;
  showCartHandler: (action: boolean) => void;
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
  addItemToCart: undefined,
  removeItemFromCart: undefined,

  showCart: undefined,
  showCartHandler: undefined,
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

  const addItemToCart = (data: { product; quantity }) => {
    const isProductOnCart = cartItems.find(
      (cartItem) =>
        cartItem.product.attributes.slug === data.product.attributes.slug
    );

    if (isProductOnCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.product.attributes.slug === data.product.attributes.slug
            ? {
                ...isProductOnCart,
                quantity: isProductOnCart.quantity + data.quantity,
              }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, data]);
    }
  };

  const removeItemFromCart = (data: { product; quantity }) => {
    const isProductOnCart = cartItems.find(
      (cartItem) =>
        cartItem.product.attributes.slug === data.product.attributes.slug
    );

    if (isProductOnCart.quantity === 1) {
      setCartItems(
        cartItems.filter(
          (cartItem) =>
            cartItem.product.attributes.slug !== data.product.attributes.slug
        )
      );
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.product.attributes.slug === data.product.attributes.slug
            ? { ...isProductOnCart, quantity: isProductOnCart.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const [showCart, setShowCart] = useState<boolean>(false);

  const showCartHandler = (action) => {
    setShowCart(action);
  };

  return (
    <ShopContext.Provider
      value={{
        productQuantity,
        increaseProductQuantity,
        decreaseProductQuantity,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        showCart,
        showCartHandler,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => useContext(ShopContext);
