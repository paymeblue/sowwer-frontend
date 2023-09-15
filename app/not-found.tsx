import PageNotFound from "components/page-not-found";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

const NotFound = () => {
  return <PageNotFound />;
};

export default NotFound;
