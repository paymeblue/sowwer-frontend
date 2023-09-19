const currencyFormat = () => {
  const priceFormat = (price: number) => {
    const newFormat = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);
    return newFormat;
  };
  return priceFormat;
};
export default currencyFormat;
