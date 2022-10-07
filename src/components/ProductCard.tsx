import Link from "next/link";

interface ProductProps {
  title: string;
  price: number;
  image: string;
  slug: string;
}

export const ProductCard = ({ title, image, price, slug }: ProductProps) => {
  return (
    <div className="relative flex flex-col p-6 bg-white">
      <Link href={`/product/${slug}`}>
        <div>
          <img
            src={image}
            alt=""
            className="mx-auto w-full cursor-pointer hover:opacity-80 transition duration-300 ease-in"
          />
        </div>
      </Link>
      <h2 className="py-1 font-medium">{title}</h2>
      <h3>{price}</h3>
    </div>
  );
};
