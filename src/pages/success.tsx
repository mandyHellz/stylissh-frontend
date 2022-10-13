import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { DefaultLayout } from "../components/DefaultLayout";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { motion } from "framer-motion";
import Image from "next/image";

interface SuccessProps {
  address: {
    city: string;
    country: string;
    line1: string;
    state: string;
  };
  email: string;
  name: string;
  products: {
    id: string;
    name: string;
    images: string;
  }[];
}

export default function Success({
  name,
  email,
  address,
  products,
}: SuccessProps) {
  const router = useRouter();

  return (
    <DefaultLayout title={"Stylissh. | Thank u!"}>
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.75 }}
        transition={{ duration: 0.75 }}
        className="w-full mx-auto"
      >
        <div className="flex flex-col items-center bg-white rounded p-12 gap-4">
          <div className="flex flex-col gap-4 font-medium text-center">
            <h1 className="text-2xl">Thank you for your order!</h1>
            {email && (
              <div className="text-base">
                <p>A confirmation email has been sent to</p>
                <p className="text-sm">{email}</p>
              </div>
            )}
          </div>

          <div className="w-full flex flex-col sm:flex-row justify-center gap-8">
            <div className="text-center">
              <p className="font-medium">Address:</p>
              <p className="text-sm">{address.line1}</p>
              <p className="text-sm">{address.city}</p>
              <p className="text-sm">
                {address.state} | {address.country}
              </p>
            </div>

            <div className="text-center">
              <p className="font-medium">Products:</p>
              {products.map((product) => (
                <p key={product.id} className="w-full truncate text-sm">
                  {product.name}
                </p>
              ))}
            </div>
          </div>

          <Image
            width={300}
            height={230}
            alt="dog_success_page"
            src="https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />

          <button
            className="bg-primary hover:bg-secondary transition-colors text-white text-sm mt-10 py-2 px-4"
            onClick={() => router.push("/")}
          >
            Continue Shopping
          </button>
        </div>
      </motion.div>
    </DefaultLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const sessionId = String(query.session_id);

  const sessionOrder = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = sessionOrder.customer_details.name;
  const customerEmail = sessionOrder.customer_details.email;
  const customerAddress = sessionOrder.customer_details.address;
  const products = sessionOrder.line_items.data.map(
    (product) => product.price.product as Stripe.Product
  );

  return {
    props: {
      email: customerEmail,
      address: customerAddress,
      name: customerName,
      products,
    },
  };
};
