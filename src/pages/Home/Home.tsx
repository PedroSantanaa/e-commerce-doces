import React, { FormEvent, useEffect, useState } from "react";
//components
import Card from "../../components/Card/Card";
//css
import styles from "./Home.module.css";
//interface
import { IItens } from "../../components/Card/Card";

type Props = {
  customerSend(name: string): void;
};

const Home = ({ customerSend }: Props) => {
  const [name, setName] = useState<string>("");
  const [products, setProducts] = useState<IItens[]>([]);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    customerSend(name);
    setName("");
  };

  const handleName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setName(ev.target.value);
  };

  const handleLocalStorage = (itens: IItens): void => {
    setProducts((prevProducts) => {
      const existingProductIndex = prevProducts.findIndex((p) => p.name === itens.name);
      if (existingProductIndex !== -1) {
        // Atualiza a quantidade e o total do produto existente
        const updatedProduct = { ...prevProducts[existingProductIndex] };
        updatedProduct.qtd += itens.qtd;
        updatedProduct.total += itens.total;
        return [
          ...prevProducts.slice(0, existingProductIndex),
          updatedProduct,
          ...prevProducts.slice(existingProductIndex + 1),
        ];
      } else {
        // Adiciona um novo produto à lista
        return [...prevProducts, itens];
      }
    });
  };
  useEffect(() => {
    if (products.length === 0) return;
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);
  useEffect(() => {
    const items = localStorage.getItem("products");
    const AllProducts = items ? JSON.parse(items) : null;
    if (items) {
      setProducts(AllProducts);
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <span>Nome:</span>
          <input type="text" name="name" value={name} onChange={handleName} />
        </label>
        <button type="submit">Registrar nome</button>
      </form>
      <div className={styles.cards}>
        <Card
          name={"Brigadeiro"}
          url={"https://cdn.panelinha.com.br/receita/958014000000-Brigadeiro.jpg"}
          value={2.0}
          handleLocalStorage={handleLocalStorage}
        />
        <Card
          name={"Beijinho"}
          url={
            "https://www.receitasdeliciosasnamesa.com/wp-content/uploads/2021/01/Receita-de-beijinho-simples.jpg"
          }
          value={2.0}
          handleLocalStorage={handleLocalStorage}
        />
        <Card
          name={"Amendoim"}
          url={"https://i.ytimg.com/vi/SkPSZ_2InFs/maxresdefault.jpg"}
          value={2.5}
          handleLocalStorage={handleLocalStorage}
        />
        <Card
          name={"Ninho"}
          url={"https://i.ytimg.com/vi/fJYXaQNop3Q/maxresdefault.jpg"}
          value={3.0}
          handleLocalStorage={handleLocalStorage}
        />
      </div>
    </>
  );
};
export default Home;
