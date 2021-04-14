import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
//Next
import Link from "next/link";
//Apollo
import { useReadWorkoutsQuery } from "../lib/graphql/readWorkouts.graphql";

const DashboardPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading, error } = useReadWorkoutsQuery();
  const [datum, setDatum] = useState(new Date());
  const [toggle, setToggle] = useState({ title: "", open: false });
  // console.log(data);

  const options: any = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (loading)
    return (
      <Box>
        <Spinner />
      </Box>
    );
  return (
    <Box>
      <Flex justify="center">
        <Heading>{datum.toLocaleDateString("de-DE", options)}</Heading>
      </Flex>
      <Button mt={8} colorScheme="frontend" variant="outline">
        <Link href="/add">Eine Übung hinzufügen</Link>
      </Button>
      {!loading &&
        data.readWorkouts.map((workout) => {
          const datumDB = workout.datum.split("T")[0];
          const datumUser = datum.toISOString().split("T")[0];

          if (datumDB === datumUser) {
            return (
              <Box mt={8} key={workout._id}>
                <Heading>
                  <Text casing="uppercase">{workout.name}</Text>
                </Heading>
                {workout.exercise.map((exercise) => {
                  return (
                    <Box key={exercise._id}>
                      <Text
                        casing="capitalize"
                        onClick={() => {
                          if (toggle.open === false) {
                            setToggle({ title: exercise.name, open: true });
                            console.log(toggle);
                            //@ts-expect-error
                          } else if (toggle.open !== false) {
                            setToggle({ title: exercise.name, open: false });
                            console.log(toggle);
                          }
                        }}
                      >
                        {exercise.name}
                      </Text>
                      {toggle.title === exercise.name && toggle.open && (
                        <Table variant="unstyled">
                          <Thead>
                            <Tr>
                              <Th>Gewicht</Th>
                              <Th>Wdh</Th>
                              <Th>RPE</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {exercise.set.map((set, index) => {
                              return (
                                <Tr onClick={onOpen} key={set._id} mx={2}>
                                  <Td>{set.gewicht}</Td>

                                  <Td>{set.wdh}</Td>
                                  <Td></Td>
                                  <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                      <ModalHeader>{exercise.name}</ModalHeader>
                                      <ModalCloseButton />
                                      <ModalBody>
                                        <Text>{index}. Satz</Text>
                                        <Text>{set.gewicht}</Text>
                                        <Text>{set.wdh}</Text>
                                      </ModalBody>

                                      <ModalFooter>
                                        <Button
                                          colorScheme="frontend"
                                          mr={3}
                                          onClick={onClose}
                                        >
                                          Close
                                        </Button>
                                      </ModalFooter>
                                    </ModalContent>
                                  </Modal>
                                </Tr>
                              );
                            })}
                          </Tbody>
                        </Table>
                      )}
                    </Box>
                  );
                })}
              </Box>
            );
          }
        })}
    </Box>
  );
};

export default DashboardPage;
