import { Metadata } from "next";
import SettingsPage from "./settings";

export const metadata: Metadata = {
  title: "Donor - Settings | Soower",
};

const Settings = () => {
  return <SettingsPage />;
};

export default Settings;
