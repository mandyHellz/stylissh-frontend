import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { products } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!products) {
    return res.status(400).json({ error: "Product not found." });
  }

  const successUrl = `${process.env.NEXT_URL}/success?&session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;
  const expressShipping = `${process.env.EXPRESS_SHIPPING_RATE_ID}`;
  const normalShipping = `${process.env.NORMAL_SHIPPING_RATE_ID}`;

  const checkoutSession = await stripe.checkout.sessions.create({
    cancel_url: cancelUrl,
    success_url: successUrl,
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    shipping_options: [
      {
        shipping_rate: expressShipping,
      },
      {
        shipping_rate: normalShipping,
      },
    ],
    allow_promotion_codes: true,
    line_items: products.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.attributes.title,
            images: [
              item.product.attributes.image.data.attributes.formats.thumbnail
                .url,
            ],
          },
          unit_amount: item.product.attributes.price * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.quantity,
      };
    }),
  });

  res.status(200).json(checkoutSession);
}
