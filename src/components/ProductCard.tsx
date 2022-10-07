/* eslint-disable @next/next/no-img-element */
interface ProductProps {
  title: string;
  price: number;
  image: string;
}

export const ProductCard = ({ title, image, price }: ProductProps) => {
  return (
    <div className="relative flex flex-col p-6 bg-white">
      <div>
        <img
          src={image}
          alt=""
          className="mx-auto w-full cursor-pointer hover:opacity-80 transition duration-300 ease-in"
        />
      </div>
      <h2 className="py-1 font-medium">{title}</h2>
      <h3>{price}</h3>
    </div>
  );
};
