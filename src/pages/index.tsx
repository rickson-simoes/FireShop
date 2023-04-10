import { GetStaticProps } from "next";
import { useContext } from "react";
import Stripe from "stripe";
import Head from 'next/head';
import Image from "next/image";
import Link from "next/link";
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css'

import { HomeContainer, Product } from "../styles/pages/home";
import { stripe } from "../lib/stripe";
import { ProductContext } from "../context/ProductContext";

interface IHomeProps {
  products: IProduct[]
}

export interface IProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  description: string;
}

export default function Home({ products }: IHomeProps) {
  const { isProductAvailableToAdd } = useContext(ProductContext);
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  });

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => (
          <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
            <Product className="keen-slider__slide" >
              <Image src={product.imageUrl} width={520} height={480} alt="Shirts" />

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span> {product.price}</span>
                </div>
                <div>
                  <button disabled={isProductAvailableToAdd(product.id)}>🛒</button>
                </div>
              </footer>
            </Product>
          </Link>
        ))}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;
    const brlPriceFormat = new Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' }).format(price.unit_amount! / 100);

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: brlPriceFormat,
      description: product.description
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // a cada 2 horas vai ser revalidado as informações da página (gera uma nova página com infos att)
  }
}
