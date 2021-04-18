import React from "react";
import Head from "next/head";

import { Provider as NxtAthProvider, useSession } from "next-auth/client";

import { ChakraProvider } from "@chakra-ui/react";

// import Navbar from "../components/Navbar";

// import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/public/favicon.ico" />
        <title>Chat-a-lot</title>
      </Head>
      <NxtAthProvider session={pageProps.session}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </NxtAthProvider>
    </>
  );
}

export default MyApp;
