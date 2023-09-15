import { useUpdateNotificationMutation } from "store/services/notifications";
import { Switch } from "antd";

const ToggleSwitch = ({
  toggle,
  label,
}: {
  toggle: boolean;
  label: string;
}) => {
  const [updateNotification, { isLoading }] = useUpdateNotificationMutation();
  const onChange = async (option: { checked: boolean; label: string }) => {
    const update = { [option.label]: option.checked };
    try {
      await updateNotification(update).unwrap();
    } catch (error) {}
  };
  return (
    <Switch
      defaultChecked={toggle}
      size="small"
      loading={isLoading}
      onChange={(checked) => onChange({ checked, label })}
    />
  );
};

export default ToggleSwitch;
