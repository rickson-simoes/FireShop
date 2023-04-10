import { ProductContext } from "@/src/context/ProductContext";
import { useContext } from "react";

interface IButtonCheckoutCartProps {
  onOpenCart: () => void;
}

export function ButtonCheckoutCart({ onOpenCart }: IButtonCheckoutCartProps) {
  const { productList } = useContext(ProductContext);

  return (
    <button onClick={onOpenCart}>🛒 {productList.length > 0 && <span>{productList.length}</span>}</button>
  )
}