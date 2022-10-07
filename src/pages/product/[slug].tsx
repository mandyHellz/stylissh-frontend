import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "urql";
import { GET_PRODUCT_DETAILS_QUERY } from "../../lib/query";
import { Product } from "../../types/product";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const ProductDetails = () => {
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
    <>
      <Head>
        <title>Styled | {product.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {fetching && <p>Loading...</p>}

      {!fetching && product && (
        <div className="max-w-container min-w-xs mx-auto flex flex-col sm:flex-row sm:justify-between mt-20">
          <img
            src={productImage.medium.url}
            alt={product.title}
            className="w-full sm:w-2/5"
          />
          <div className="flex flex-col gap-10 w-full sm:w-2/5">
            <h2 className="font-medium">{product.title}</h2>
            <p>{product.description}</p>

            <div className="flex items-center mx-4">
              <span className="text-secondary">Qtt</span>
              <button className="text-primary hover:text-secondary duration-300 bg-transparent px-4 py-2">
                <AiFillPlusCircle />
              </button>
              <p className="text-center">0</p>
              <button className="text-primary hover:text-secondary duration-300 bg-transparent px-4 py-2">
                <AiFillMinusCircle />
              </button>
            </div>

            <button className="w-full bg-primary hover:bg-secondary duration-300 text-white font-medium text-xs sm:text-sm px-4 py-2 border">
              add to cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
