import Card from "../../components/Card/Card";
import styles from "./Home.module.css";

type Props = {};
const Home = (props: Props) => {
  return (
    <>
      <form>
        <label htmlFor="name">
          <span>Nome:</span>
          <input type="text" name="name" />
        </label>
        <button type="submit">Registrar nome</button>
      </form>
      <div className={styles.cards}>
        <Card
          name={"Brigadeiro"}
          url={"https://cdn.panelinha.com.br/receita/958014000000-Brigadeiro.jpg"}
          value={2.0}
        />
        <Card
          name={"Beijinho"}
          url={
            "https://www.receitasdeliciosasnamesa.com/wp-content/uploads/2021/01/Receita-de-beijinho-simples.jpg"
          }
          value={2.0}
        />
        <Card
          name={"Amendoim"}
          url={"https://i.ytimg.com/vi/SkPSZ_2InFs/maxresdefault.jpg"}
          value={2.5}
        />
        <Card
          name={"Ninho"}
          url={"https://i.ytimg.com/vi/fJYXaQNop3Q/maxresdefault.jpg"}
          value={3.0}
        />
      </div>
    </>
  );
};
export default Home;
