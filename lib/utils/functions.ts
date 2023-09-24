export const formatCurrency = (value: string) => {
  const formattedValue = new Intl.NumberFormat("en-US").format(
    parseInt(value || "0", 10)
  );
  return formattedValue;
};
