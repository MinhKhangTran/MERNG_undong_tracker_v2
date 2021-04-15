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
  Grid,
  IconButton,
} from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
//Next
import Link from "next/link";
//Apollo
import { useReadWorkoutsQuery } from "../lib/graphql/readWorkouts.graphql";
//components
import TableModal from "components/TableModal";
import AddSetModal from "components/AddSetModal";
import AddWorkout from "../components/AddWorkout";
import WorkoutModal from "components/WorkoutModal";
import { GrAdd } from "react-icons/gr";

const DashboardPage = () => {
  const { onOpen } = useDisclosure();
  const { data, loading, error } = useReadWorkoutsQuery();
  const [datum, setDatum] = useState(new Date());
  const [toggle, setToggle] = useState({ title: "", open: false });
  const [addWorkout, setAddWorkout] = useState(false);
  // console.log(data);
  // console.log(
  //   data.readWorkouts.some((workout) => {
  //     console.log(workout.datum);
  //     // console.log(datum.toISOString());
  //     return workout.datum.split("T")[0] !== datum.toISOString().split("T")[0];
  //   })
  // );

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

      <Button
        onClick={() => {
          setAddWorkout(!addWorkout);
        }}
        mt={8}
        colorScheme="frontend"
        varaint="outline"
      >
        Eine Einheit hinzufügen ➕
      </Button>
      {addWorkout && <AddWorkout datum={datum} setAddWorkout={setAddWorkout} />}
      {/* {data.readWorkouts.some(
        (workout) =>
          workout.datum.split("T")[0] !== datum.toISOString().split("T")[0]
      ) && (
        <Box mt={8}>
          <Text>Für heute noch keine Einheit!</Text>
        </Box>
      ) } */}
      {!loading &&
        data.readWorkouts.map((workout) => {
          const datumDB = workout.datum.split("T")[0];
          const datumUser = datum.toISOString().split("T")[0];

          if (datumDB === datumUser) {
            return (
              <Box mt={8} key={workout._id}>
                <Heading>
                  <Link href={`/workout/${workout._id}`}>
                    <Text casing="uppercase">{workout.name}</Text>
                  </Link>
                </Heading>
                <Flex justify="center" mt={8}>
                  <Link href={`/addExercise/${workout._id}`}>
                    <IconButton
                      variant="solid"
                      colorScheme="frontend"
                      aria-label="Add Exercise"
                      fontSize="24px"
                      icon={<GrAdd />}
                      isRound={true}
                    ></IconButton>
                  </Link>
                </Flex>

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
                                <>
                                  <TableModal
                                    index={index}
                                    key={set._id}
                                    set={set}
                                    exercise={exercise}
                                  />
                                </>
                              );
                            })}
                            <AddSetModal exercise={exercise} />
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
