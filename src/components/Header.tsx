import styles from "../styles/Header.module.scss";
import { Link, useLocation } from "react-router-dom";
// import { BiSearch } from "react-icons/bi";

function Header() {
    let location = useLocation();

    return (
        <div className={styles.header} style={{ color: location.pathname === "/" ? "#f8f4f0" : "#1a1a1a" }}>
            <Link to="/" className={styles.header__logo}>
                Core Components
            </Link>
            <div className={styles.nav}>
                <Link to="catalog" className={styles.nav__shop}>
                    Shop
                </Link>
                <button>
                    <svg
                        className={styles.nav__search}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"></path>
                    </svg>
                </button>
                <button>
                    <svg
                        className={styles.nav__cart}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M16 6v-2c0-2.209-1.791-4-4-4s-4 1.791-4 4v2h-5v18h18v-18h-5zm-7-2c0-1.654 1.346-3 3-3s3 1.346 3 3v2h-6v-2zm10 18h-14v-14h3v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h6v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h3v14z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Header;
