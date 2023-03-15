import { useUserValue } from "../../context/useUserContext";
//css
import styles from "./Cart.module.css";
import modalStyles from "./ModalCart.module.css";
import { BsArrowRight } from "react-icons/bs";
//interfaces
import { IItens } from "../../components/Card/Card";
import { useEffect, useState } from "react";
//router
import { Link } from "react-router-dom";
//modal
import Modal from "react-modal";

type Props = {};
const Cart = (props: Props) => {
  const [productsAtCart, setProductsAtCart] = useState<IItens[]>([]);
  const [productsAtCartTotal, setProductsAtCartTotal] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //Modal Styles

  const handleh1Text = () => {
    const h1 = document.querySelector(".sideCartTitle");
    if (window.innerWidth <= 850 && h1) {
      h1.textContent = "Valor Total";
    } else if (window.innerWidth > 850 && h1) {
      h1.textContent = "Detalhes do Cartão";
    }
  };

  window.addEventListener("resize", handleh1Text);

  const handleMinus = (name: string): void => {
    setProductsAtCart((prevProducts) => {
      const existingProductIndex = prevProducts.findIndex((p) => p.name === name);
      // Atualiza a quantidade e o total do produto existente
      const updatedProduct = { ...prevProducts[existingProductIndex] };
      if (updatedProduct.qtd > 1) {
        updatedProduct.qtd -= 1;
        updatedProduct.total -= updatedProduct.value;
        return [
          ...prevProducts.slice(0, existingProductIndex),
          updatedProduct,
          ...prevProducts.slice(existingProductIndex + 1),
        ];
      } else {
        return [
          ...prevProducts.slice(0, existingProductIndex),
          ...prevProducts.slice(existingProductIndex + 1),
        ];
      }
    });
  };
  const handleAdd = (name: string): void => {
    setProductsAtCart((prevProducts) => {
      const existingProductIndex = prevProducts.findIndex((p) => p.name === name);
      // Atualiza a quantidade e o total do produto existente
      const updatedProduct = { ...prevProducts[existingProductIndex] };
      if (updatedProduct.qtd >= 0) {
        updatedProduct.qtd += 1;
        updatedProduct.total += updatedProduct.value;
        return [
          ...prevProducts.slice(0, existingProductIndex),
          updatedProduct,
          ...prevProducts.slice(existingProductIndex + 1),
        ];
      } else {
        return [];
      }
    });
  };

  const removeItem = (name: string): void => {
    const indexOfItemToRemove = productsAtCart.findIndex((p) => p.name === name);
    const newListOfProducts = [...productsAtCart];
    newListOfProducts.splice(indexOfItemToRemove, 1);
    setProductsAtCart(newListOfProducts);
  };

  useEffect(() => {
    const items = localStorage.getItem("products");
    const products = items ? JSON.parse(items) : null;
    if (items) {
      setProductsAtCart(products);
    }
  }, []);
  useEffect(() => {
    if (productsAtCart.length === 0) return;
    localStorage.setItem("products", JSON.stringify(productsAtCart));
  }, [productsAtCart]);

  useEffect(() => {
    let total = productsAtCart.reduce((total, product) => total + product.total, 0);
    setProductsAtCartTotal(total);
  }, [productsAtCart]);

  useEffect(() => {
    if (productsAtCart.length === 0) {
      localStorage.clear();
    }
  }, [productsAtCart]);
  const userName = useUserValue();
  return (
    <>
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.mainCart}>
            <h1>Finalizando as compras</h1>
            <div className={styles.itens}>
              <h2>Carrinho de Compras</h2>
              <p className={styles.customer}>
                {userName?.customer}: você tem {productsAtCart.length} itens no seu carrinho
              </p>
            </div>
            <div className={styles.boxItems}>
              {productsAtCart && productsAtCart.length === 0 ? (
                <div className={styles.noItems}>
                  <span>Voce não tem itens no seu carrinho</span>
                  <Link to="/">Ir para a Home</Link>
                </div>
              ) : (
                productsAtCart &&
                productsAtCart.map((p) => (
                  <div key={p.name} className={styles.item}>
                    <img src={p.url} alt="logo" />
                    <span className={styles.itemName}>{p.name}</span>
                    <div>
                      <span className={styles.qtdNumber}>{p.qtd}</span>
                      <div>
                        <button onClick={() => handleAdd(p.name)}>
                          <svg
                            width="20"
                            height="9"
                            viewBox="0 0 20 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M20 8.57143L10 0L0 8.57143H20Z" fill="#393939" />
                          </svg>
                        </button>
                        <button onClick={() => handleMinus(p.name)}>
                          <svg
                            width="20"
                            height="9"
                            viewBox="0 0 20 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M20 0.428572L10 9L0 0.428572H20Z" fill="#393939" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className={styles.totalNumber}>R${p.total}</p>
                    <p onClick={() => removeItem(p.name)}>
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
                            <use xlinkHref="#image0_9_77" transform="scale(0.01)" />
                          </pattern>
                          <image
                            id="image0_9_77"
                            width="100"
                            height="100"
                            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAADHklEQVR4nO3dzUobYRjF8fOkEzdtBRfNolVwHzdtCCHmDkTwBuyurSK9jt5BbSWUQtsr6Ae9ABeZEOOmTbeKWlw32o0h83SjEIKFdvJOctTzAyHvMHnmlT8TMC4GEBERSccmvYG/KRaLU9PT088ArAJYAHB7xJG/3f2bmX3odrv1TqdzNvouw6MMUqvV7idJ8hnAw4wusRtF0fL29vZxRvNTy016A8OKxeJUxjEA4FG/3/9UKpXyGV4jFbog5x9TWcYAALh7KZ/PP8n6Ov8rmvQGLrE6tP4CYK3RaPwcZWilUpk1sy0zW7o4ZmaPAbwaZW5odHcIgOLgIkmS9VFjAECz2Tzq9/vrQ4cXRp0bGmOQO4OLZrN5FGpwq9U6HDp0N9TsUBiD3GgKQkZByKT+w7BWqy0lSfISwHzA/VwH++6+Ecfx1zRvTn2HuPtrKMZl5s2snvbN+sgikzpIkiRrAPYC7uW62AOQ+huAYF8uVqtVH1w3Gg3KLy5Dyer31UcWGQUhoyBkFISMgpBREDIKQkZByCgIGbr/qS8uLq64ex2Au/vTOI4/TvL8caO7Q9x9E8A9AAUz25z0+eNGFwTA/YHXDwjOHyvGIDeagpBREDIKQkZByCgIGQUhoyBkFISMgpBREDIKQkZByCgIGQUhoyBkFISMgpBREDIKQkZByCgIGQUhoyBkFISMgpBREDIKQkZByCgIGQUhoyBkFISMgpBREDIKQkZByCgIGQUhoyBkFISMgpBREDIKQkZByCgIGQUhoyBkFIQMY5D9gdf/8jiMrM8fK7og7r4B4Oj8Z2PS54+bnh+Skp4fckMoCBkFIaMgZBSEjIKQURAyIYOcDC4qlcpswNlUyuXy3NChk0tPTCFkkB+DCzPbuo5RyuXyXBRFW0OHv4eaH/L5Ie8BVC4WZrZkZofVajXgJTi5+7tQs4LdId1utw5gN9S8K6TV6/XehBoWLEin0zmLomjZzNqhZl4BO1EUrbTb7V6ogbdCDQKAg4OD00Kh8DaXyx2b2QyAGQBTIa9B4BTAjru/6PV6z+M4/jXpDYmIiADAH5sq34HRT4luAAAAAElFTkSuQmCC"
                          />
                        </defs>
                      </svg>
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className={styles.sideCart}>
            <h1 className="sideCartTitle">Detalhes do Cartão</h1>
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
                SubTotal <span>R${productsAtCartTotal}</span>
              </p>
              <p>
                Frete <span>Grátis</span>
              </p>
              <p>
                Total <span>R${productsAtCartTotal}</span>
              </p>
            </div>
            <button className={styles.checkout}>
              R${productsAtCartTotal}
              <span>
                Finalizar <BsArrowRight />
              </span>
            </button>
            <button className={styles.checkoutQuery}>
              R${productsAtCartTotal}
              <span onClick={() => setModalIsOpen(true)}>
                Pagamento <BsArrowRight />
              </span>
            </button>
          </div>
          <button className={styles.modalCheckOut}>
            R${productsAtCartTotal}
            <span onClick={() => setModalIsOpen(true)}>
              Pagamento <BsArrowRight />
            </span>
          </button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          className={modalStyles.modal}
          overlayClassName={modalStyles.overlay}
        >
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
            <div className={modalStyles.monthModal}>
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
          <div className={modalStyles.total}>
            <p>
              SubTotal <span>R${productsAtCartTotal}</span>
            </p>
            <p>
              Frete <span>Grátis</span>
            </p>
            <p>
              Total <span>R${productsAtCartTotal}</span>
            </p>
          </div>

          <div className={modalStyles.buttons}>
            <button className={modalStyles.returnButton} onClick={() => setModalIsOpen(false)}>
              Retornar ao Carrinho
            </button>
            <button className={modalStyles.finishButton}>
              R${productsAtCartTotal}
              <span>
                Finalizar <BsArrowRight />
              </span>
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default Cart;
