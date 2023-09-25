"use client";

import Loader from "@components/shared/Loader";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "redux/store";

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loader />}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
