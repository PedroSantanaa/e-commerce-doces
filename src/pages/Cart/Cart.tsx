import { useUserValue } from "../../context/useUserContext";
//css
import styles from "./Cart.module.css";
//interfaces
import { IItens } from "../../components/Card/Card";
import { useEffect, useState } from "react";

type Props = {};
const Cart = (props: Props) => {
  const [productsAtCart, setProductsAtCart] = useState<IItens[]>([]);

  useEffect(() => {
    const items = localStorage.getItem("products");
    const products = items ? JSON.parse(items) : null;
    if (items) {
      setProductsAtCart(products);
    }
  }, []);
  const userName = useUserValue();
  return (
    <>
      {/* <div>{userName?.customer}</div>
      <div>
        {productsAtCart &&
          productsAtCart.map((p) => (
            <div key={p.name}>
              <h1>{p.name}</h1>
              <p>{p.qtd}</p>
            </div>
          ))}
      </div> */}
      <div className={styles.body}>
        <div className={styles.container}>
          <div className="mainCart">
            <h1>Shopping cart</h1>
          </div>
          <div className={styles.sideCart}>
            <h1>Card Details</h1>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
