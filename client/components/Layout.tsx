//global
import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
//components
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const bgColor = useColorModeValue("frontend.50", "frontend.900");
  const textColor = useColorModeValue("frontend.800", "frontend.200");
  return (
    <Box bg={bgColor} color={textColor}>
      <Navbar />
      <Box
        /*height="calc(100vh - 112px)"*/
        w={{ base: "90%", md: "50%" }}
        mx="auto"
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};
export default Layout;
