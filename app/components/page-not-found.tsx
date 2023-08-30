"use client";
import { Button, Result } from "antd";
import Layout from "app/(landing_pages)/components/layout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import notFound from "public/assets/images/page-not-found.png";

const PageNotFound = () => {
  const router = useRouter();
  return (
    <Layout>
      <section className="h-screen bg-grad">
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
      </section>
    </Layout>
  );
};

export default PageNotFound;
