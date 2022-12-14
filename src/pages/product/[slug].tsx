import { useRouter } from "next/router";
import { useQuery } from "urql";
import toast from "react-hot-toast";
import { GET_PRODUCT_DETAILS_QUERY } from "../../lib/query";
import { Product } from "../../types/product";
import { DefaultLayout } from "../../components/DefaultLayout";
import { useShopContext } from "../../contexts/ShopContext";
import { QuantitySelector } from "../../components/QuantitySelector";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect } from "react";

const ProductDetails = () => {
  const {
    productQuantity,
    increaseProductQuantity,
    decreaseProductQuantity,
    quantityHandler,
    addItemToCart,
  } = useShopContext();
  const router = useRouter();
  const [results] = useQuery({
    query: GET_PRODUCT_DETAILS_QUERY,
    variables: { slug: router.query.slug },
  });

  const { data, fetching, error } = results;

  const response: Product = data?.products?.data[0];
  const product = response?.attributes;
  const productImage = product?.image.data.attributes.formats;

  if (error) {
    toast.error(`Ohh no... ${error.message}`);
  }

  const notify = () => {
    toast.success(`${product.title} added to your cart.`, {
      duration: 1500,
    });
  };

  useEffect(() => {
    quantityHandler(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DefaultLayout title={`Stylissh. | ${product?.title}`}>
      <div>
        {fetching && (
          <div>
            <AiOutlineLoading3Quarters size={25} />
          </div>
        )}

        {!fetching && product && (
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <img
              src={productImage.medium.url}
              alt={product.title}
              className="w-full sm:w-2/5"
            />
            <div className="flex flex-col gap-10 w-full sm:w-2/5">
              <h2 className="font-medium capitalize text-primary">
                {product.title}
              </h2>
              <p>{product.description}</p>

              <QuantitySelector
                plusButtonHandler={() => increaseProductQuantity()}
                minusButtonHandler={() => decreaseProductQuantity()}
                quantity={productQuantity}
              />

              <button
                onClick={() => {
                  addItemToCart({
                    product: response,
                    quantity: productQuantity,
                  }),
                    notify();
                }}
                className="w-full bg-primary hover:bg-secondary duration-300 text-white font-medium text-xs sm:text-sm px-4 py-2 border"
              >
                add to cart
              </button>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ProductDetails;
