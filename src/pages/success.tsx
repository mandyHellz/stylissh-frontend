import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { DefaultLayout } from "../components/DefaultLayout";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";

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

  console.log(products.map((product) => product.images));

  return (
    <DefaultLayout title={"Stylissh. | Thank u!"}>
      <div>
        <h1>Thank you for your order!</h1>
        {email && (
          <>
            <p>A confirmation email has been sent to</p>
            <p>{email}</p>
          </>
        )}

        <div>
          <p>Address:</p>
          <p>{address.line1}</p>
          <p>{address.city}</p>
          <p>
            {address.state} | {address.country}
          </p>
        </div>

        <div>
          <p>Products:</p>
          {products.map((product) => (
            <div key={product.id} className="flex flex-col max-w-xs">
              <img src={product.images} alt={product.name} className="w-40" />
              <p>{product.name}</p>
            </div>
          ))}
        </div>

        <button onClick={() => router.push("/")}>Continue comprando</button>
      </div>
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
