import { Box, Flex, Text, Spacer } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      className="footer"
      borderTop="1px"
      borderColor="frontend.200"
      py={6}
      as="footer"
      w="90%"
      mx="auto"
      mt={4}
    >
      <Text>
        Made with{" "}
        <span role="img" aria-label="herz">
          💜
        </span>{" "}
        by MKT
      </Text>
      <Spacer />
      <Text>{new Date().getFullYear()}</Text>
    </Flex>
  );
};
export default Footer;
