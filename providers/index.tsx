"use client";
import { StyleProvider } from "@ant-design/cssinjs";
import store, { persistor } from "store/store";
import theme from "styles/theme";
import { ConfigProvider } from "antd";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider theme={theme}>
      <StyleProvider hashPriority="high">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </StyleProvider>
    </ConfigProvider>
  );
};

export default Providers;
