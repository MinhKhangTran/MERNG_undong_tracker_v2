//Chakra
import { ChakraProvider } from "@chakra-ui/react";
//Next
import Router from "next/router";
//styles
import { theme } from "../styles/theme";
//Components
import Layout from "../components/Layout";
//Nprogress
import NProgress from "nprogress";
// import "nprogress/nprogress.css";
import "../styles/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
