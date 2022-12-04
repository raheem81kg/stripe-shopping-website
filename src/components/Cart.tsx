import styles from "../styles/Cart.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { selectShowCart } from "../redux/slice/showCartSlice";
import { selectCartItems } from "../redux/slice/cartItemsSlice";
import { hideCart } from "../redux/slice/showCartSlice";
import SlideUpButton from "./SlideUpButton";
import CartItem from "./CartItem";
import formatCurrency from "../utils/formatCurrency";

const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

const cart = {
    visible: { x: 0 },
    hidden: { x: "100%" },
};

const Cart = () => {
    const showCart = useSelector(selectShowCart);
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    return (
        <AnimatePresence>
            {showCart && (
                <>
                    <motion.div
                        variants={backdrop}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ ease: "easeOut", duration: 0.5 }}
                        onClick={() => dispatch(hideCart())}
                        className={styles.cart_backdrop}
                    />
                    <motion.div
                        variants={cart}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ ease: "easeOut", duration: 0.5 }}
                        className={styles.cart_container}
                    >
                        <div className={styles.cart}>
                            <button type="button" onClick={() => dispatch(hideCart())} className={styles.cart__close}>
                                <svg
                                    className={styles.cart__close__svg}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
                                </svg>
                            </button>
                            <div className={styles.cart_content}>
                                <div className={styles.cart_content__title}>
                                    Your
                                    <br />
                                    Shopping
                                    <br />
                                    Bag
                                </div>
                                <div className={styles.cart_content__cart_list}>
                                    {/* To conditionally render cart items or empty cart components, as well as keep track of total price */}
                                    {(cartItems.length > 0 && (
                                        <>
                                            {cartItems.map((item) => (
                                                <CartItem {...item} />
                                            ))}
                                            <div className={styles.cart_content__cart_list__subtotal}>
                                                {`Subtotal ${formatCurrency(
                                                    cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
                                                )}`}
                                            </div>
                                        </>
                                    )) || <div className={styles.cart_content__cart_list__empty_text}>Your bag is empty</div>}
                                </div>
                                {cartItems.length <= 0 && (
                                    <svg
                                        className={styles.svg_cart}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M16 6v-2c0-2.209-1.791-4-4-4s-4 1.791-4 4v2h-5v18h18v-18h-5zm-7-2c0-1.654 1.346-3 3-3s3 1.346 3 3v2h-6v-2zm10 18h-14v-14h3v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h6v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h3v14z" />
                                    </svg>
                                )}
                            </div>
                            <SlideUpButton
                                onClick={() => dispatch(hideCart())}
                                text={cartItems.length <= 0 ? "Browse Products" : "Checkout"}
                                path="/catalog"
                            />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Cart;
