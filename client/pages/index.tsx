import Link from "next/link";
import {
  Heading,
  Text,
  Link as ChakraLink,
  UnorderedList,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";

export default function IndexPage() {
  const textColor = useColorModeValue("frontend.200", "frontend.100");
  return (
    <>
      <Heading as="h1" size="2xl" mt={6}>
        Undong Tracker v2.0.0
      </Heading>
      <Heading mt={6} color={textColor} as="h2" size="xl">
        <Link href="/login">Jetzt Testen!</Link>
      </Heading>
      <Heading as="h3" size="lg" mt={4}>
        Über dieses Projekt
      </Heading>
      <Text>
        I'm baby gentrify hexagon leggings small batch cray ethical drinking
        vinegar gochujang before they sold out tumeric deep v affogato
        meditation. Lo-fi yr normcore af glossier humblebrag. Authentic
        distillery chambray butcher yuccie kogi church-key direct trade etsy
        shaman retro slow-carb snackwave. Flexitarian bespoke bicycle rights,
        put a bird on it readymade ugh synth pop-up. Pork belly normcore pug
        wayfarers. Intelligentsia tousled vice, kickstarter salvia vegan marfa
        vaporware fixie everyday carry migas iPhone. Pop-up tattooed echo park
        umami actually. Cold-pressed roof party chartreuse selfies tumeric
        readymade.
      </Text>
      <Heading as="h2" size="lg" mt={4}>
        Changelog
      </Heading>
      <Text>
        Verglichen mit der Version{" "}
        <ChakraLink href="https://undong-tracker.netlify.app/" isExternal>
          v1.0.0
        </ChakraLink>{" "}
        wurden folgende Änderungen gemacht:
      </Text>
      <UnorderedList>
        <ListItem>Frontend und Backend vollständig in Typescript</ListItem>
        <ListItem>Mehr für Smartphones ausgerichtet</ListItem>
        <ListItem>Kein Redux mehr!</ListItem>
        <ListItem>Farbe in lila gewechselt</ListItem>
        <ListItem>Dark Mode</ListItem>
        <ListItem>GraphQL API</ListItem>
        <ListItem>Next JS</ListItem>
      </UnorderedList>
    </>
  );
}
