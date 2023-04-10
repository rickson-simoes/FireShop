import { IProductCart, ProductContext } from '@/src/context/ProductContext';
import { stripe } from '@/src/lib/stripe';
import { ImageContainer, LoadingRequest, ProductContainer, ProductDetails } from '@/src/styles/pages/product';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Stripe from 'stripe';

export interface IProductProps {
  product: IProductCart
}

export default function Product({ product }: IProductProps) {
  const { addProduct, isProductAvailableToAdd } = useContext(ProductContext);

  async function handleBuyProduct() {
    addProduct(product);
  }

  const { isFallback, query } = useRouter();

  if (isFallback) {
    return (
      <LoadingRequest>
        <h2>Loading... ✨</h2>
      </LoadingRequest>
    )
  }

  // console.log(query.id); // mostra o parametro da pagina

  return (
    <>
      <Head>
        <title>{`${product.name}` + '| Ignite Shop'}</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt="Product Image" width={520} height={480} />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button onClick={handleBuyProduct} disabled={isProductAvailableToAdd(product.id)}>Add to cart</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_NWioHqeGpy2ab9' } }
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productID = params!.id;
  const product = await stripe.products.retrieve(productID, { expand: ['default_price'] });

  const price = product.default_price as Stripe.Price;
  const brlPriceFormat = Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' }).format(price.unit_amount! / 100);

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: brlPriceFormat,
        description: product.description,
        defaultPriceId: price.id,
        numberPrice: price.unit_amount! / 100
      }
    },
    revalidate: 60 * 60 * 1
  }
}