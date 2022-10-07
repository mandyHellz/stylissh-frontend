import type { NextPage } from "next";
import Head from "next/head";

import { useQuery } from "urql";
import { PRODUCT_QUERY } from "../lib/query";

import { ProductCard } from "../components/ProductCard";

import { Product } from "../types/product";

const Home: NextPage = () => {
  const [results] = useQuery({ query: PRODUCT_QUERY });
  const { data, fetching, error } = results;

  if (error) {
    return <p>Oh no... {error.message}</p>;
  }

  const productsList: Product[] = data?.products?.data;

  return (
    <div className="max-w-container min-w-xs mx-auto">
      <Head>
        <title>Styled | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {fetching && <p>Loading...</p>}

      <div className="gallery gap-8">
        {productsList?.map((product: Product) => {
          const productInfo = product.attributes;
          const productImage = product.attributes.image.data.attributes.formats;

          return (
            <ProductCard
              key={product.id}
              title={productInfo.title}
              price={productInfo.price}
              image={productImage.small.url}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
