//next
import Link from "next/link";
//Chakra
import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
//component
import DarkModeSwitch from "./DarkModeSwitch";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <Flex p={4} as="nav" w="90%" mx="auto" align="center">
      <Link href="/">
        <Logo />
      </Link>
      <Spacer />
      <DarkModeSwitch />
    </Flex>
  );
};
export default Navbar;
