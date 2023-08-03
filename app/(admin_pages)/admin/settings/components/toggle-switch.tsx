import React from "react";
import { Switch } from "antd";

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};

const ToggleSwitch = ({ toggle }: { toggle: boolean }) => (
  <Switch defaultChecked={toggle} size="small" onChange={onChange} />
);

export default ToggleSwitch;
