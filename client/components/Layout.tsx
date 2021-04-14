//global
import { Box, Flex, Heading, useColorModeValue, Text } from "@chakra-ui/react";
//components
import Navbar from "./Navbar";
import Footer from "./Footer";
//Auth
import { useAuth } from "../authContext";

const Layout = ({ children }) => {
  const bgColor = useColorModeValue("frontend.50", "frontend.800");
  const textColor = useColorModeValue("frontend.600", "frontend.100");
  const { user } = useAuth();
  return (
    <Flex direction="column" bg={bgColor} color={textColor} height="100%">
      <Box className="content">
        <Navbar />
        <Box w={{ base: "90%", md: "50%" }} mx="auto">
          {/* {user && (
            <Text as="h2" fontSize="2xl">
              Hi{" "}
              <Text as="span" casing="capitalize">
                {user.username}
              </Text>
            </Text>
          )} */}

          {children}
        </Box>
      </Box>
      <Footer />
    </Flex>
  );
};
export default Layout;
