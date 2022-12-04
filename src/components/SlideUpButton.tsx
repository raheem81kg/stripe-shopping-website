import { Link } from "react-router-dom";
import styles from "../styles/SlideUpButton.module.scss";

interface SlideButton {
    text: string;
    onClick: () => void;
    path: string;
}

function SlideUpButton({ text, onClick, path }: SlideButton) {
    return (
        <Link onClick={onClick} className={styles.link} to={path}>
            <div className={styles.link__text}>{text}</div>
        </Link>
    );
}

export default SlideUpButton;
