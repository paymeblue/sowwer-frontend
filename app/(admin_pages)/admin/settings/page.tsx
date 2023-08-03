import { Metadata } from "next";
import SettingsPage from "./settings";

export const metadata: Metadata = { title: "Settings - Admin | Soower" };

const Settings = () => {
  return <SettingsPage />;
};

export default Settings;
