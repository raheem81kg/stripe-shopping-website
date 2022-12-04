const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

const formatCurrency = (amount: number): string => {
    return formatter.format(amount);
};

export default formatCurrency;
