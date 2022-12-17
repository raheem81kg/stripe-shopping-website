import styles from "../styles/CartItem.module.scss";
import { incrementQuantity, updateQuantity, removeFromCart } from "../redux/slice/cartItemsSlice";
import { useDispatch } from "react-redux";
import formatCurrency from "../utils/formatCurrency";

interface Props {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    quantity: number;
}

const CartItem = ({ id, name, category, price, image, quantity }: Props) => {
    const dispatch = useDispatch();

    const quantityChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateQuantity({ id, amount: Number(e.target.value) }));
    };

    const decrementQuantity = () => {
        if (quantity <= 1) {
            // remove products with no quantity
            dispatch(removeFromCart(id));
        } else {
            dispatch(incrementQuantity({ id, amount: -1 }));
        }
    };

    return (
        <>
            {quantity > 0 && (
                <div className={styles.cartContent}>
                    <img className={styles.cartImage} src={image} alt={name} />
                    <div className={styles.cartDetails}>
                        <div className={styles.cartCategory}>{category}</div>
                        <div className={styles.cartName}>{name}</div>
                        <div className={styles.quantityController}>
                            <button type="button" onClick={decrementQuantity} className={styles.quantityControlButton}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                    <path d="M0 10h24v4h-24z" />
                                </svg>
                            </button>
                            <input
                                onChange={quantityChangeHandler}
                                value={quantity}
                                type="number"
                                className={styles.quantityDisplay}
                            />
                            <button
                                onClick={() => dispatch(incrementQuantity({ id, amount: 1 }))}
                                className={styles.quantityControlButton}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                    <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className={styles.cartPrice}>{formatCurrency(price * quantity)}</div>
                </div>
            )}
        </>
    );
};

export default CartItem;
