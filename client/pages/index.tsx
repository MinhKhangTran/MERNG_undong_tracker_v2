import Link from "next/link";
import {
  Heading,
  Text,
  Link as ChakraLink,
  UnorderedList,
  ListItem,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";

export default function IndexPage() {
  const textColor = useColorModeValue("frontend.200", "frontend.100");
  return (
    <>
      <Heading as="h1" size="2xl" mt={6}>
        Undong Tracker v2.0.0
      </Heading>
      <Heading mt={6} color={textColor} as="h2" size="xl">
        <Link href="/login">
          <Button colorScheme="backend">Jetzt Testen!</Button>
        </Link>
      </Heading>
      <Heading as="h3" size="lg" mt={4}>
        Über dieses Projekt
      </Heading>
      <Text>
        Das ist ein Spaß Projekt von mir und es befindet sich noch im
        Entwicklungsstadium. <br />
        Da ich zurzeit keinen Fitnes Tracker benutze, habe ich mich entschieden
        so etwas selber aufzubauen. Es ist schwerer als man denkt 🥲. Aber
        irgendwie habe ich es hinbekommen. Bzw die Kernfunktionen sind drin. Es
        fehlt aber noch einiges. Ich habe viele Ideen von meinem Meister E.K.
        bekommen, aber ich konnte nicht alles umsetzen (Dein Timer kommt noch
        😬). Ich denke es ist aber deutlich umfangreicher als die erste Version.
        Das Projekt wird derzeit nur von mir gewartet, also wird es erst eine
        Weile dauern, bis ich neue Features eingefügt habe. Ich bin leider noch
        sehr langsam 🙏
      </Text>
      <Heading as="h2" size="lg" mt={4}>
        Ideen für die Zukunft
      </Heading>
      <UnorderedList>
        <ListItem>Timer funktion</ListItem>
        <ListItem>
          Klon Funktion: Einheiten klonen und an einem anderen Tag einfügen
        </ListItem>
        <ListItem>Themechanger, nicht jeder mag lila 🥲</ListItem>
        <ListItem>
          Vorerst als WebApp, dennoch habe ich Pläne eine App daraus zu machen
          (für android UND IOS)
        </ListItem>
      </UnorderedList>
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
        <ListItem>
          User kann ein Datum wählen und seine Einheiten besser tracken
        </ListItem>
        <ListItem>User kann rpe oder notizen pro satz einfügen</ListItem>
        <ListItem>UX freundlicher mit Modal und ladebalken oben</ListItem>
        <ListItem>Frontend und Backend vollständig in Typescript</ListItem>
        <ListItem>Mehr für Smartphones ausgerichtet</ListItem>
        <ListItem>Kein Redux mehr! Stattdessen ApolloClient</ListItem>
        <ListItem>Farbe in lila gewechselt (einfach so 🥲)</ListItem>
        <ListItem>Dark Mode hinzugefügt</ListItem>
        <ListItem>GraphQL API statt REST API</ListItem>
        <ListItem>Next JS im Frontend</ListItem>
      </UnorderedList>
    </>
  );
}
