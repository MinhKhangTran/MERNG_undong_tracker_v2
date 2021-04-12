//Chakra
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
//Next
import Router from "next/router";
//Apollo
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo";

//Components
import Layout from "../components/Layout";
import { AuthProvider } from "../authContext";
//Nprogress
import NProgress from "nprogress";
// import "nprogress/nprogress.css";
import "../styles/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider options={{ useSystemColorMode: true }}>
          <AuthProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
