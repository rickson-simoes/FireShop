import Link from "next/link";
import { SuccessContainer, ImageContainer, ProductsList } from "../styles/pages/success";
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Head from "next/head";

interface ISuccessProps {
  customerName: string;
  items: {
    id: string;
    image: string;
  }[],
  quantity: number;
}

export default function Success({ customerName, items, quantity }: ISuccessProps) {

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ProductsList>
          {items.map((item) => (
            <ImageContainer key={item.id}>
              <Image src={item.image} alt="Product" width={140} height={140} />
            </ImageContainer>
          ))}
        </ProductsList>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de <span>{quantity > 1 ? `${quantity} itens` : `${quantity} item`}</span> já está a caminho da sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false // não é um redirect permanente, ou seja, é de ocasião ao tentar acessar a página success
      }
    }
  }

  const sessionID = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionID, {
    expand: ['line_items.data.price.product']
  });

  const customerName = session.customer_details?.name;

  const data = session.line_items?.data as Stripe.LineItem[];
  const priceObject = data.map(item => item.price) as Stripe.Price[];
  const productObject = priceObject.map(item => item.product) as Stripe.Product[];
  const imageUrl = productObject.map(f => f.images[0])[0];

  const quantity = data?.map(f => f.quantity).reduce((acc, item) => acc! + item!, 0);

  const items = data.map(item => {
    return {
      id: item.id,
      image: imageUrl
    }
  })

  return {
    props: {
      customerName,
      items,
      quantity
    },
  }
}