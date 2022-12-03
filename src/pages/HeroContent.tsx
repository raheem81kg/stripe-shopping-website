import { Link } from "react-router-dom";
import styles from "../styles/Home.module.scss";

interface Props {
    title: string;
    text: string;
    path: string;
    buttonText: string;
}

export const HeroContent = ({ title, text, path, buttonText }: Props) => {
    return (
        <section className={styles.content}>
            <h1 className={styles.content__title}>{title}</h1>
            <p className={styles.content__text}>{text}</p>

            <Link to={path} className={styles.link}>
                <button type="button" className={styles.link__btn}>
                    {buttonText}
                </button>
            </Link>
        </section>
    );
};
