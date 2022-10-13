import { createContext, useContext, useState } from "react";
import { Product } from "../types/product";

interface ShopContextProps {
  productQuantity: number;
  increaseProductQuantity: () => void;
  decreaseProductQuantity: () => void;
  quantityHandler: (quantity: number) => void;
  cartItems: cartItemProps[];
  totalCartItems: number;
  totalCartPrice: number;
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
  quantityHandler: undefined,

  cartItems: undefined,
  totalCartItems: undefined,
  totalCartPrice: undefined,
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

  const quantityHandler = (quantity) => {
    setProductQuantity(quantity);
  };

  const [cartItems, setCartItems] = useState<cartItemProps[]>([]);
  const [totalCartItems, setTotalCartItems] = useState<number>(0);
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0);

  const addItemToCart = (data: cartItemProps) => {
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

    setTotalCartItems(
      (prevTotalCartItems) => prevTotalCartItems + data.quantity
    );

    setTotalCartPrice(
      (prevTotalCartPrice) =>
        prevTotalCartPrice + data.product.attributes.price * data.quantity
    );
  };

  const removeItemFromCart = (data: cartItemProps) => {
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

    setTotalCartItems((prevTotalCartItems) => prevTotalCartItems - 1);

    setTotalCartPrice(
      (prevTotalCartPrice) => prevTotalCartPrice - data.product.attributes.price
    );
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
        quantityHandler,
        cartItems,
        totalCartItems,
        totalCartPrice,
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
