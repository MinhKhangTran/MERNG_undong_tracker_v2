import { HStack, Switch, Icon, useColorMode } from "@chakra-ui/react";
//icons
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";

const DarkModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <HStack>
      <Icon
        w={{ base: "6", md: "8" }}
        h={{ base: "6", md: "8" }}
        as={RiSunFill}
      />
      <Switch
        size="lg"
        onChange={toggleColorMode}
        isChecked={isDark}
        colorScheme="frontend"
      ></Switch>
      <Icon
        w={{ base: "6", md: "8" }}
        h={{ base: "6", md: "8" }}
        as={RiMoonClearFill}
      />
    </HStack>
  );
};

export default DarkModeSwitch;
