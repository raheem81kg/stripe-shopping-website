import styles from "../styles/CheckoutSuccess.module.scss";

const CheckoutSuccess = () => {
    return (
        <div className={styles.success_container}>
            <h1>Thank you for your purchase!</h1>
            <p>Your order is on its way and should arrive within 5-7 business days.</p>
            <p>If you have any questions, please contact our customer support team at support@corecomponents.com. (not real)</p>
        </div>
    );
};

export default CheckoutSuccess;
