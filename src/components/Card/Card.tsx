import { useEffect, useState } from "react";
import styles from "./Card.module.css";

type Props = {
  name: string;
  url: string;
  value: number;
  handleLocalStorage(itens: IItens): void;
};

export interface IItens {
  name: string;
  url: string;
  value: number;
  qtd: number;
  total: number;
}

const Card = ({ name, url, value, handleLocalStorage }: Props) => {
  const [desc, setDesc] = useState<string>("");
  const [qtd, setQtd] = useState<number>(0);
  const description = (name: string): void => {
    if (name === "Brigadeiro") {
      setDesc(
        "Nossos brigadeiros são cremosos e perfeitamente equilibrados em doçura, proporcionando uma experiência gastronômica única e memorável. Experimente agora e delicie-se com o melhor brigadeiro da cidade!"
      );
    } else if (name === "Beijinho") {
      setDesc(
        "Feito com coco ralado fresco e leite condensado de primeira qualidade, nosso beijinho é uma verdadeira explosão de sabor!"
      );
    } else if (name === "Amendoim") {
      setDesc(
        "Feito com amendoim torrado e leite condensado de alta qualidade, nosso brigadeiro é cremoso, rico e possui um sabor intenso de amendoim."
      );
    } else if (name === "Ninho") {
      setDesc(
        " Feito com leite em pó Ninho e leite condensado de alta qualidade, nosso brigadeiro possui uma textura delicada e um sabor único que irá encantar o paladar de todos."
      );
    }
  };
  useEffect(() => {
    description(name);
  }, []);

  const handleMinus = () => {
    if (qtd > 0) {
      setQtd(qtd - 1);
    }
  };
  const handleAdd = () => {
    if (qtd >= 0) {
      setQtd(qtd + 1);
    }
  };

  const handleCart = () => {
    if (qtd === 0) return;
    const item: IItens = {
      name,
      url,
      value,
      qtd,
      total: qtd * value,
    };
    handleLocalStorage(item);
    setQtd(0);
  };

  return (
    <div className={styles.container}>
      <h1>{name}</h1>
      <img src={url} alt="doce" />
      <p>{desc}</p>
      <div className={styles.shop}>
        <p>R$:{value}</p>
        <div className={styles.qtd}>
          <button onClick={handleMinus}>-</button>
          <span>{qtd}</span>
          <button onClick={handleAdd}>+</button>
        </div>
      </div>
      <button className={styles.addToCart} onClick={handleCart}>
        Adicionar ao carrinho
      </button>
    </div>
  );
};
export default Card;
