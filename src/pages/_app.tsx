import type { AppProps } from 'next/app'
import Image from 'next/image'

import { globalStyles } from '../styles/global'
import { Container, Header } from '../styles/pages/app';

import igniteLogo from '../assets/ignitelogo.svg';
import Link from 'next/link';
import { useState } from 'react';
import { ProductProvider } from '../context/ProductContext';
import { CheckoutCart } from '../components/checkoutCart';
import { ButtonCheckoutCart } from '../components/buttonCheckoutCart';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const [openCart, setOpenCart] = useState<boolean>(false);

  function handleOpenCart() {
    setOpenCart(!openCart);
  }

  return (
    <Container>
      <ProductProvider>
        <Header>
          <Link href="/">
            <Image src={igniteLogo} alt="Ignite site logo" />
          </Link>

          <ButtonCheckoutCart onOpenCart={handleOpenCart} />
        </Header>

        <CheckoutCart onOpenCart={handleOpenCart} isCartOpen={openCart} />

        <Component {...pageProps} />
      </ProductProvider>
    </Container>
  );
}
