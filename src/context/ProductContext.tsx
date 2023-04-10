import { ReactNode, createContext, useEffect, useState } from "react";

export interface IProductCart {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  description: string;
  defaultPriceId: string;
  numberPrice: number
}

interface IProductContextTypes {
  productList: IProductCart[];
  addProduct: (product: IProductCart) => void;
  removeProduct: (id: string) => void;
  isProductAvailableToAdd: (id: string) => boolean;
  totalPrice: string;
}

interface IProductContextProvider {
  children: ReactNode
}

export const ProductContext = createContext({} as IProductContextTypes);

export function ProductProvider({ children }: IProductContextProvider) {
  const [productList, setProductList] = useState<IProductCart[]>([]);
  const [totalPrice, setTotalPrice] = useState<string>('');

  function addProduct(product: IProductCart) {
    setProductList((state) => {
      return [...state, product]
    })
  }

  function removeProduct(id: string) {
    const newProductList = productList.filter(product => product.id !== id);
    setProductList(newProductList);
  }

  function isProductAvailableToAdd(id: string) {
    const findIdParamInsideProductList = productList.some(product => product.id === id);

    return findIdParamInsideProductList;
  }

  useEffect(() => {
    const price = productList.reduce((acc, item) => acc + item.numberPrice, 0)
    const setPriceToBrl = Intl.NumberFormat('pt-BR', { currency: 'brl', style: 'currency' }).format(price);

    setTotalPrice(setPriceToBrl);
  }, [productList])

  return (
    <ProductContext.Provider value={{ productList, addProduct, isProductAvailableToAdd, totalPrice, removeProduct }}>
      {children}
    </ProductContext.Provider>
  )
}