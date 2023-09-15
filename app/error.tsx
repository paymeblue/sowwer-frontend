"use client"; // Error components must be Client Components

import ResultComponent from "@components/shared/ResultComponent";
import { useEffect } from "react";
import Layout from "./(landing_pages)/components/layout";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Layout>
      <ResultComponent
        title="Oops... Something went wrong :("
        subTitle={`${error}`}
        btnBg="primary"
        btnText="Try Again"
        btnTextColor="black"
        status="error"
        showBtn={true}
        onBtnClick={() => reset}
      />
    </Layout>
  );
}
