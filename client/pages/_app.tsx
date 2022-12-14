import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { MyQueProvider } from "../lib/MyQueProvider";

const client = new ApolloClient({
  // TODO change this url to .env file
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Nethermind Assignment</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApolloProvider client={client}>
        <MyQueProvider>
          <Component {...pageProps} />
        </MyQueProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
