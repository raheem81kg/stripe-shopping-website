import styles from "../styles/Header.module.scss";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showCart } from "../redux/slice/showCartSlice";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { selectCartItems } from "../redux/slice/cartItemsSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { showSearch } from "../redux/slice/searchSlice";
import { auth } from "../firebase";

// import { BiSearch } from "react-icons/bi";

const Header = () => {
    const cartItems = useSelector(selectCartItems);
    const [user, loading] = useAuthState(auth);

    // Sign in with GoogleAuthProvider
    const googlePopupSignIn = () => {
        signInWithPopup(auth, new GoogleAuthProvider());
    };

    const location = useLocation();
    const dispatch = useDispatch();

    return (
        <div className={styles.header} style={{ color: location.pathname === "/" ? "#f8f4f0" : "#1a1a1a" }}>
            <Link to="/" className={styles.header__logo}>
                Core Components
            </Link>
            <div className={styles.nav}>
                <Link to="catalog" className={styles.nav__shop}>
                    Shop
                </Link>
                <button onClick={() => dispatch(showSearch())}>
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
                <div className={styles.cartBtn_container}>
                    {cartItems.length > 0 && (
                        <div
                            className={styles.cartLength}
                            style={{
                                background: location.pathname === "/" ? "#f8f4f0" : "#1a1a1a",
                                color: location.pathname === "/" ? "#1a1a1a" : "#f8f4f0",
                            }}
                        >
                            {cartItems.length}
                            <svg
                                style={{
                                    color: location.pathname === "/" ? "#f8f4f0" : "#1a1a1a",
                                }}
                                className={styles.svgArrow}
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M21 12l-18 12v-24z" />
                            </svg>
                        </div>
                    )}

                    <button onClick={() => dispatch(showCart())} aria-label="Open shopping cart">
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
                {!loading && !user ? (
                    <div onClick={() => googlePopupSignIn()} className={styles.nav__sign_in}>
                        Sign In
                    </div>
                ) : (
                    <div className={styles.nav__sign_in} onClick={() => auth.signOut()}>
                        {!loading && `${user?.displayName}.`}
                        <br /> Sign Out
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
