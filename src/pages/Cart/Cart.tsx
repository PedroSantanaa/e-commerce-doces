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
            <h1>Carrinho de Compras</h1>
          </div>
          <div className={styles.sideCart}>
            <h1>Detalhes do Cartão</h1>
            <form>
              <span>
                Nome no Cartão:
                <input type="text" name="name" placeholder="Nome" />
              </span>
              <span>
                Número do Cartão:
                <input type="text" name="name" placeholder="1111 2222 3333 4444" />
              </span>
              <div className={styles.month}>
                <span>
                  Vencimento:
                  <input type="text" name="name" placeholder="mm/aa" />
                </span>
                <span>
                  CVV:
                  <input type="text" name="name" placeholder="CVV" />
                </span>
              </div>
            </form>
            <div className={styles.total}>
              <p>
                SubTotal <span>R$500</span>
              </p>
              <p>
                Frete <span>Grátis</span>
              </p>
              <p>
                Total <span>R$500</span>
              </p>
            </div>
            <button className={styles.checkout}>
              R$500
              <span>
                Finalizar
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <rect width="25" height="25" fill="url(#pattern0)" />
                  <defs>
                    <pattern
                      id="pattern0"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use xlinkHref="#image0_7_42" transform="scale(0.01)" />
                    </pattern>
                    <image
                      id="image0_7_42"
                      width="100"
                      height="100"
                      xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAABpElEQVR4nO3cP24TURRG8fsspcgCWAZNOgqQ+JMmAQlR06aiYSXshgI6NpC09FQpUqAIy2k4NJECTuYVGWvuDe/8FvD0SUcje+TxREiSJEmSJEmSJEmSJEmSJGnHgMfAV+AzcJC9Z3jAKTcugafZm4YG/OBfRskEnHDbJfAse9uwgI/A760ov4Dn2duG1YnyInvbsIxSkFEKMkpBnSgvs7cNyygFGaWgTpRX2duGNRFlbZRERinIKAVNRNkAx9nbhmWUgoxSUCfK6+xtwzJKQRNRroA3uzi/7WDg+4j4FBGP5s950DYR8ba19mXOIbOCAHsR8TMi9uec8x9ZR8RRa+3bfQ9YzRywighmnqG/zArSWruKiJOION/NnAdtExHv5lwduofrD/VtftPKYIxCOjG8W1+aMQqZiLEGDrO3DacTw99ElmaMQoxRyEQMnzzJ0Inhs1lLM0YhnRg+dL00YxRijEKMUYgxCunE8J+4SzNGIcCHO2L44oAMwN71lbAdw1drZABWwIUxCgGOgO/AGfAke48kSZIkSZIkSZIkSZIkSVK+P8FCeQW4Jt9JAAAAAElFTkSuQmCC"
                    />
                  </defs>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
