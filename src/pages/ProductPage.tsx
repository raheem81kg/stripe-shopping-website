import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/ProductPage.module.scss";
import { showCart } from "../redux/slice/showCartSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, incrementQuantity, selectCartItems } from "../redux/slice/cartItemsSlice";
import allProducts from "../data/allProducts";
import formatCurrency from "../utils/formatCurrency";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const ProductPage = () => {
    interface Product {
        id: string;
        stripe_id: string;
        name: string;
        category: string;
        price: number;
        image: string;
        gallery: string[];
    }

    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const [user, loading] = useAuthState(auth);
    const squares = "Component".split("");
    const { productId } = useParams();
    const navigate = useNavigate();
    const product: Product = allProducts.find((product) => product.id === productId) || {
        id: "",
        stripe_id: "",
        name: "",
        category: "",
        price: 0,
        image: "",
        gallery: [""],
    };
    const [index, setIndex] = useState<number>(0);
    const [cursor, setCursor] = useState<string | null>(null);
    const [cursorIsVisible, setCursorIsVisible] = useState<boolean>(false);

    // checking the url parameter to load the correct product data (all products or a certain category)
    useEffect(() => {
        if (!productId) {
            navigate("/");
        }
    }, [productId, navigate]);

    useEffect(() => {
        const image = document.getElementById("image");
        if (image) image.style.opacity = "1";
    }, []);

    const nextImage = () => {
        if (product?.gallery.length === 1) {
            return null;
        }

        const image = document.getElementById("image");
        if (image) image.style.opacity = "0";

        setTimeout(() => {
            if (!product || !image) return;

            if (index < product?.gallery.length - 1) {
                setIndex(index + 1);
            } else {
                setIndex(0);
            }
            image.style.opacity = "1";
        }, 100);
    };

    const prevImage = () => {
        if (!product) return;

        if (product.gallery.length === 1) {
            return null;
        }

        const image = document.getElementById("image");
        if (!image) return;

        image.style.opacity = "0";

        setTimeout(() => {
            if (index > 0) {
                setIndex(index - 1);
            } else {
                setIndex(product.gallery.length - 1);
            }
            image.style.opacity = "1";
        }, 100);
    };

    const showCursor = (e: { pageY: any; pageX: any }) => {
        if (cursorIsVisible) {
            const cursor = document.getElementById("cursor");
            if (!cursor) return;
            cursor.style.display = "flex";
            cursor.style.top = `${e.pageY}px`;
            cursor.style.left = `${e.pageX}px`;
        }
        setCursorIsVisible(true);
    };

    const hideCursor = () => {
        setCursorIsVisible(false);
    };

    const showLeftCursor = (e: { pageY: any; pageX: any }) => {
        setCursor("left");
        showCursor(e);
    };

    const showRightCursor = (e: { pageY: any; pageX: any }) => {
        setCursor("right");
        showCursor(e);
    };

    const cursorVariants = {
        visible: { opacity: 0.8, scale: 1, x: "-50%", y: "-50%" },
        hidden: { opacity: 0, scale: 0.8, x: "-50%", y: "-50%" },
    };

    const checkout = () => {
        addItemToCart();

        if (user) {
            fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ items: cartItems, email: user.email }),
            })
                .then((res) => {
                    return res.json();
                })
                .catch((e) => console.log(e.message))
                .then((res) => {
                    if (res.url) {
                        window.location.assign(res.url);
                    }
                })
                .catch((e) => console.log(e.message));
        }
    };

    const addItemToCart = () => {
        const item = cartItems.find((item) => item.id === product.id);

        if (!item) {
            const structuredProduct = {
                id: product.id,
                stripe_id: product.stripe_id,
                name: product.name,
                category: product.category,
                price: product.price,
                image: product.image,
            };

            dispatch(addToCart({ ...structuredProduct, quantity: 1 }));
        } else {
            dispatch(incrementQuantity({ id: item.id, amount: 1 }));
        }

        dispatch(showCart());
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <AnimatePresence>
                    {cursorIsVisible && (
                        <motion.div
                            variants={cursorVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{ ease: "easeOut", duration: 0.4 }}
                            id="cursor"
                            className={styles.cursor}
                        >
                            {cursor && cursor === "left" && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
                                </svg>
                            )}
                            {cursor && cursor === "right" && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#efece9">
                                    <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
                                </svg>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className={styles.interactionArea}>
                    <div
                        onMouseEnter={showLeftCursor}
                        onMouseMove={showLeftCursor}
                        onMouseLeave={hideCursor}
                        onClick={prevImage}
                        className={styles.leftClickArea}
                    />
                    <div
                        onMouseEnter={showRightCursor}
                        onMouseMove={showRightCursor}
                        onMouseLeave={hideCursor}
                        onClick={nextImage}
                        className={styles.rightClickArea}
                    />
                </div>
                <div className={styles.bgStyle} />
                <h1 className={styles.productName}>{product.name}</h1>
                <img id="image" src={product.gallery[index]} alt={product.name} className={styles.productImage} />
                <div className={styles.galleryCounter}>
                    <span className={styles.galleryCurrentIndex}>{(index + 1).toString().padStart(3, "0")}</span>
                    {` / ${product.gallery.length.toString().padStart(3, "0")}`}
                </div>
            </main>
            <aside className={styles.side}>
                <div className={styles.squares}>
                    {squares &&
                        squares.map((square, index) => {
                            return (
                                <span key={index} className={styles.square}>
                                    {square}
                                </span>
                            );
                        })}
                </div>
                <div className={styles.productPrice}>{formatCurrency(product.price)}</div>
                <div className={styles.buyButtons}>
                    <button onClick={() => addItemToCart()} className={styles.addToBag}>
                        <div>
                            <span>Add to bag</span>
                            <span>Add to bag</span>
                        </div>
                    </button>
                    <button onClick={() => checkout()} className={styles.buyNow}>
                        Buy it now
                    </button>
                </div>
            </aside>
        </div>
    );
};

export default ProductPage;
