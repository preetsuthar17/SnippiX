import { Layout } from "@/components/Layout";
import { Showcase } from "@/components/Showcase";
import Head from "next/head";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Easily convert your code snippets in beautiful images.</title>
        <meta name="robots" content="all" />
        <meta name="theme-color" content="#080a16" />
        <meta httpEquiv="content-language" content="en" />
        <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
        <meta
          property="og:title"
          content=" Easily convert your code snippets in beautiful images."
        />
        <meta property="og:url" content="https://snippix.netlify.app" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://snippix.netlify.app/snippix-logo-png"
        />
        <meta
          name="keywords"
          content="Preet Suthar, carbon.now.sh, snappify, code snippets, code image snippet, code to image converter, code image, code image generator, code to image, code snippet generator, code snippet image generator , ray.so, ray so"
        />
        <meta name="author" content="Preet Suthar" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="twitter:title"
          content=" Easily convert your code snippets in beautiful images."
        />
        <meta name="subject" content="coding" />
      </Head>
      <div>
        <Showcase />
      </div>
    </Layout>
  );
}
