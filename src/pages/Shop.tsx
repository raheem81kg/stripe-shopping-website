import styles from "../styles/Shop.module.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import allProducts from "../data/allProducts";
import categories from "../data/categories";
import formatCurrency from "../utils/formatCurrency";

interface Product {
    category: string;
    categoryId: string;
    id: string;
    stripe_id: string;
    name: string;
    price: number;
    image: string;
    previewImage: string;
    gallery: string[];
}

interface Category {
    id: string;
    name: string;
}

function Shop() {
    const navigate = useNavigate();

    const param = useParams().categoryid;
    const [productData, setProductData] = useState<Product[]>([]);

    // const addOrUpdateCart = (product: Product) => {
    //     const item = cartItems.find((item) => item.id === product.id);

    //     if (!item) {
    //         dispatch(addToCart({ ...product, quantity: 1 }));
    //     } else {
    //         dispatch(incrementQuantity({ id: item.id, amount: 1 }));
    //     }
    // };

    // checking the url parameter to load the correct product data (all products or a certain category)
    useEffect(() => {
        if (!param) {
            setProductData(allProducts);
        } else {
            const currentCategoryname = categories.find((category) => category.id === param);
            console.log(currentCategoryname);

            if (currentCategoryname != undefined) {
                const currentCategoryList: Product[] = allProducts.filter((product) => product.categoryId === currentCategoryname?.id);
                setProductData(currentCategoryList);
            } else {
                navigate("/");
            }
        }
    }, [param, navigate]);

    return (
        <div className={styles.Shop_container}>
            <div className={styles.side}>
                <div className={styles.side__current_category}>
                    <div className={styles.side__current_category__root}>Shop /</div>
                    <div className={styles.side__current_category__sub}>{!param ? "All Products" : productData[0]?.category}</div>
                </div>
                <div className={styles.side__all_categories}>
                    <ul className={styles.category_links}>
                        {categories.map((category: Category, i) => (
                            <li key={i}>
                                <Link to={`/catalog/${category.id}`}>{category.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <main className={styles.main}>
                <ul className={styles.main__productList}>
                    {productData.map((product, i) => {
                        return (
                            <li key={i} className={styles.product}>
                                <Link to={`/products/${product.id}`} className={styles.product__link}>
                                    <div className={styles.product__link__images}>
                                        <img
                                            src={product.image}
                                            alt={`${product.name}`}
                                            className={styles.product__link__images__front}
                                        />
                                        <img
                                            src={product.previewImage}
                                            alt={`${product.name} preview`}
                                            className={styles.product__link__images__back}
                                        />
                                    </div>
                                    <p className={styles.product__name}>{product.name}</p>
                                    <p className={styles.product__price}>{formatCurrency(product.price)}</p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </main>
        </div>
    );
}

export default Shop;
