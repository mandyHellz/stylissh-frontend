import { useRouter } from "next/router";
import { stripe } from "../lib/stripe";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import moneyFormatter from "../utils/moneyFormatter";
import { DefaultLayout } from "../components/DefaultLayout";

interface ProfileProps {
  userData: {
    name: string;
    email: string;
    picture: string;
  };
  orders: {
    id: number;
    amount: number;
    paymentMethod: string[];
    status: string;
    email: string;
  }[];
}

export default function Profile({ orders, userData }: ProfileProps) {
  const route = useRouter();

  return (
    <DefaultLayout title={`Stylissh. | ${userData?.name}`}>
      <>
        {userData && (
          <div className="w-full mx-auto flex flex-col justify-evenly gap-6">
            <div className="text-primary flex flex-col gap-2">
              <h1 className="font-medium text-base">{userData.name}</h1>
              <p className="text-sm">{userData.email}</p>
            </div>

            <div>
              {orders?.map((order) => (
                <div
                  key={order.id}
                  className="bg-white px-4 py-6 gap-2 flex flex-col sm:flex-row sm:justify-between text-primary font-medium"
                >
                  <div>
                    <p>Order Number:</p>
                    <span className="text-secondary font-normal">
                      {order.id}
                    </span>
                  </div>
                  <div>
                    <p>Receipt Email:</p>
                    <span className="text-secondary font-normal">
                      {userData?.email}
                    </span>
                  </div>
                  <div>
                    <p>Price:</p>
                    <span className="text-secondary font-normal">
                      {moneyFormatter(order.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full flex justify-end mt-10">
              <button
                className="w-full sm:w-60 bg-primary hover:bg-secondary transition-colors text-white text-sm mt-10 py-2 px-4"
                onClick={() => route.push("/api/auth/logout")}
              >
                Log out
              </button>
            </div>
          </div>
        )}
      </>
    </DefaultLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res);

    const stripeId = session?.user[process.env.STRIPE_CUSTOMER_ID];

    const paymentIntents = await stripe.paymentIntents.list({
      customer: stripeId,
    });

    const orders = paymentIntents?.data?.map((order) => {
      return {
        id: order.id,
        amount: order.amount,
        paymentMethod: order.payment_method,
        status: order.status,
        email: order.receipt_email,
      };
    });

    return {
      props: {
        orders: orders,
        userData: {
          name: session?.user["name"],
          email: session?.user["email"],
          picture: session?.user["picture"],
        },
      },
    };
  },
});
