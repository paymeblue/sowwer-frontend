"use client";
import { Button, Result } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import notFound from "public/assets/images/page-not-found.png";

const PageNotFound = () => {
  const router = useRouter();
  return (
    <Result
      status="404"
      icon={<Image src={notFound} alt="page not found!" />}
      title="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => router.push("/")}>
          Back Home
        </Button>
      }
    />
  );
};

export default PageNotFound;
