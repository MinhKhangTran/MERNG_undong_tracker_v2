//Next
import Router from "next/router";

//Chakra
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

//Next auth
import { Provider } from "next-auth/client";

//Components
import Layout from "components/Layout";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider resetCSS>
        <ColorModeProvider options={{ useSystemColorMode: true }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
};

export default MyApp;
