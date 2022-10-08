import { useRouter } from "next/router";
import { useQuery } from "urql";
import { GET_PRODUCT_DETAILS_QUERY } from "../../lib/query";
import { Product } from "../../types/product";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { DefaultLayout } from "../../components/DefaultLayout";
import { useShopContext } from "../../contexts/ShopContext";

const ProductDetails = () => {
  const {
    productQuantity,
    increaseProductQuantity,
    decreaseProductQuantity,
    cartItems,
    onAddToCart,
  } = useShopContext();
  const router = useRouter();
  const [results] = useQuery({
    query: GET_PRODUCT_DETAILS_QUERY,
    variables: { slug: router.query.slug },
  });

  const { data, fetching, error } = results;

  if (error) {
    return <p>Oh no... {error.message}</p>;
  }

  const response: Product = data?.products?.data[0];
  const product = response?.attributes;
  const productImage = product?.image.data.attributes.formats;

  return (
    <DefaultLayout title={`Styled. | ${product?.title}`}>
      <div>
        {fetching && <p>Loading...</p>}

        {!fetching && product && (
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <img
              src={productImage.medium.url}
              alt={product.title}
              className="w-full sm:w-2/5"
            />
            <div className="flex flex-col gap-10 w-full sm:w-2/5">
              <h2 className="font-medium capitalize">{product.title}</h2>
              <p>{product.description}</p>

              <div className="flex items-center">
                <span className="text-secondary">Quantity</span>
                <button
                  onClick={decreaseProductQuantity}
                  className="text-primary hover:text-secondary duration-300 bg-transparent px-4 py-2"
                >
                  <AiFillMinusCircle />
                </button>
                <p className="text-center">{productQuantity}</p>
                <button
                  onClick={increaseProductQuantity}
                  className="text-primary hover:text-secondary duration-300 bg-transparent px-4 py-2"
                >
                  <AiFillPlusCircle />
                </button>
              </div>

              <button
                onClick={() =>
                  onAddToCart({ product: response, quantity: productQuantity })
                }
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
