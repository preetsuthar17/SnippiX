import { Layout } from "@/components/Layout";
import { Showcase } from "@/components/Showcase";
import Head from "next/head";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>
          SnippiX - Easily convert your code snippets in beautiful images.
        </title>
      </Head>
      <div>
        <Showcase />
      </div>
    </Layout>
  );
}
