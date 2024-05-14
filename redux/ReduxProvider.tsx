"use client";

import Loader from "@components/shared/Loader";
import { redirect, usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "redux/store";

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const user = store.getState().auth.user;

  const auth = !!user && user?.type === "admin";
  useEffect(() => {
    const adminRegex = /^\/admin\/(ministries|payouts)$/;
    if (auth && !adminRegex.test(pathname)) {
      redirect("/admin/ministries");
    }
  }, [auth, pathname, router]);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loader showLogo />}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
