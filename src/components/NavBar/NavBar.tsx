import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
type Props = {};
const NavBar = (props: Props) => {
  return (
    <nav className={styles.header}>
      <NavLink to="/">
        <img src="src/assets/render-lu-removebg-preview.png" alt="logo" />
      </NavLink>
      <ul className={styles.links}>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : "")}>
            ABOUT
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? styles.activeCart : "")}>
            <FaShoppingCart />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default NavBar;
