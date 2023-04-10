import Image from "next/image";
import { CheckoutCartSideModal, CheckoutFooter, CheckoutModal, CheckoutSection } from "./styles";
import { ProductContext } from "@/src/context/ProductContext";
import { useContext, useState } from "react";
import { IProduct } from "@/src/pages";
import axios from 'axios';

interface ICheckoutCartModal {
  onOpenCart: () => void;
  isCartOpen: boolean;
}

export function CheckoutCart({ onOpenCart, isCartOpen }: ICheckoutCartModal) {
  const [isLoading, setIsLoading] = useState(false);
  const { productList, totalPrice, removeProduct } = useContext(ProductContext);

  function handleRemoveProduct(product: IProduct) {
    removeProduct(product.id);
  }

  async function handleFinishCheckout() {
    const getPriceQuantityFromProductList = productList.map(product => {
      return {
        price: product.defaultPriceId,
        quantity: 1
      }
    })

    try {
      setIsLoading(true);

      const response = await axios.post('/api/checkout', {
        items: [...getPriceQuantityFromProductList] // param inside req.body from api/checkout (interface created)
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      setIsLoading(false);
      // connect to any observability api (datadog/sentry)
      alert("Falha ao redirecionar ao checkout");
    }
  }

  return (
    <CheckoutModal isCheckoutOpen={isCartOpen}>
      <div onClick={onOpenCart} />

      <CheckoutCartSideModal checkoutCart={isCartOpen}>
        {isCartOpen &&
          <>
            <button type='button' onClick={onOpenCart}>✖</button>

            <CheckoutSection>
              <strong>Sacola de compras</strong>

              <ul>
                {productList.length > 0 && productList.map(product => (
                  <li key={product.id}>
                    <div>
                      <Image src={product.imageUrl} alt="Product" width={94.79} height={94.79} />
                    </div>

                    <div>
                      <span>{product.name}</span>
                      <strong>{product.price}</strong>
                      <button onClick={() => handleRemoveProduct(product)}>Remover</button>
                    </div>
                  </li>
                ))}
              </ul>
            </CheckoutSection>

            <CheckoutFooter>
              <div>
                <span>Quantidade</span>
                <span>{productList.length} Itens</span>
              </div>

              <div>
                <strong>Valor total</strong>
                <strong>{totalPrice}</strong>
              </div>

              <button onClick={handleFinishCheckout} disabled={isLoading}>{isLoading ? 'Finalizando compra...' : 'Finalizar compra'}</button>
            </CheckoutFooter>
          </>
        }
      </CheckoutCartSideModal>
    </CheckoutModal>
  )
}