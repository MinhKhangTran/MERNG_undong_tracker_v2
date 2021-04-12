//next
import Link from "next/link";
//Chakra
import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
//component
import DarkModeSwitch from "./DarkModeSwitch";
import Logo from "./Logo";
import { useAuth } from "authContext";
import { useRouter } from "next/router";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <Flex p={4} as="nav" w="90%" mx="auto" align="center">
      <Link href="/">
        <Logo />
      </Link>
      <Spacer />
      <DarkModeSwitch />
      <Spacer />
      {user ? (
        <Button
          onClick={() => {
            logout();
            router.push("/");
          }}
          colorScheme="frontend"
        >
          Logout
        </Button>
      ) : (
        <Button colorScheme="frontend">
          <Link href="/login">Login</Link>
        </Button>
      )}
    </Flex>
  );
};
export default Navbar;
