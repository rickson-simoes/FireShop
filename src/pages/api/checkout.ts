import { stripe } from "@/src/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export interface ICheckoutApiParams {
  items: {
    price: string,
    quantity: number
  }[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { items }: ICheckoutApiParams = req.body;

  if (req.method != 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (!items) {
    return res.status(400).json({ error: 'Price not found.' });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: [...items]
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}