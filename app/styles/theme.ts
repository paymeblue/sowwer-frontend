import { ThemeConfig } from "antd";
import { plusJakarta } from "app/layout";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#3466ff",
    fontFamily: plusJakarta.style.fontFamily,
    fontWeightStrong: 400,
    fontSize: 15,
    lineHeight: 1.85,
  },
  components: {
    Collapse: {
      colorFillAlter: "transparent",
    },
    Button: {
      borderRadius: 100,
      borderRadiusSM: 100,
      borderRadiusLG: 100,
      colorPrimary: "#FFC629",
      colorPrimaryActive: "#e6a800",
      colorPrimaryBorder: "#ffdd80",
      colorPrimaryHover: "#ffcf4d",
      colorTextLightSolid: "#000",
      boxShadow: "none",
    },
    Switch: {
      colorTextQuaternary: "#F2F4F7",
      colorTextTertiary: "gainsboro",
    },
    Menu: {
      itemSelectedColor: "#FFC629",
      itemHoverBg: "transparent",
      itemBg: "transparent",
      itemSelectedBg: "transparent",
      boxShadowSecondary: "none",
      itemColor: "black",
      itemHoverColor: "#FFC629",
      fontFamily: plusJakarta.style.fontFamily,
    },
    Tabs: {
      borderRadius: 100,
      borderRadiusLG: 100,
      colorBgContainer: "#EBEFFF",
      colorBorder: "transparent",
      colorBorderSecondary: "transparent",
      colorFillAlter: "transparent",
      colorPrimary: "#3466FF",
      colorText: "#333",
    },
  },
};

export default theme;
