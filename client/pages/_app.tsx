//Next
import Router from "next/router";

//Chakra
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

//Components
import Layout from "components/Layout";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <ChakraProvider resetCSS>
      <ColorModeProvider options={{ useSystemColorMode: true }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default MyApp;
