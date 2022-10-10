import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

interface QuantitySelectorProps {
  plusButtonHandler: () => void;
  minusButtonHandler: () => void;
  quantity: number;
  className?: string;
}

export const QuantitySelector = ({
  plusButtonHandler,
  minusButtonHandler,
  quantity,
  className,
}: QuantitySelectorProps) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="text-secondary">Quantity</span>
      <button
        onClick={minusButtonHandler}
        className="text-primary hover:text-secondary duration-300 bg-transparent"
      >
        <AiFillMinusCircle />
      </button>
      <p className="text-center">{quantity}</p>
      <button
        onClick={plusButtonHandler}
        className="text-primary hover:text-secondary duration-300 bg-transparent"
      >
        <AiFillPlusCircle />
      </button>
    </div>
  );
};
