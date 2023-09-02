import { Input } from "antd";
import { useState } from "react";

interface Value {
  number?: number;
}

interface AmountInputProps {
  value?: Value;
  onChange?: (value: Value) => void;
  props?: any;
}

const AmountInput: React.FC<AmountInputProps> = ({
  value = { number: 0 },
  onChange,
  props,
}) => {
  const [number, setNumber] = useState(value.number?.toString() || "0");

  const triggerChange = (changedValue: Value) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const newNumber = parseInt(inputValue.replace(/,/g, ""), 10);

    if (isNaN(newNumber)) {
      return;
    }

    // Format the number with commas
    const formattedValue = newNumber.toLocaleString();

    setNumber(formattedValue);
    triggerChange({ number: newNumber });
  };

  return (
    <Input
      placeholder="0.00"
      type="text"
      value={number}
      onChange={onNumberChange}
      {...props}
    />
  );
};

export default AmountInput;
