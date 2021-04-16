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
  useColorModeValue,
  Spacer,
  ButtonGroup,
} from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
//Next
import Link from "next/link";
//Apollo
import { useReadWorkoutsQuery } from "../lib/graphql/readWorkouts.graphql";
//components
import TableModal, { READ_WORKOUT_QUERY } from "components/TableModal";
import AddSetModal from "components/AddSetModal";
import AddWorkout from "../components/AddWorkout";
import WorkoutModal from "components/WorkoutModal";
import { GrAdd } from "react-icons/gr";
import { VscGear } from "react-icons/vsc";
import { FaCalendarAlt, FaTrash } from "react-icons/fa";
import { useDeleteExerciseMutation } from "../lib/graphql/deleteExercise.graphql";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import de from "date-fns/locale/de";

registerLocale("de", de);

const DashboardPage = () => {
  const { onOpen } = useDisclosure();
  const { data, loading, error } = useReadWorkoutsQuery();
  const [datum, setDatum] = useState(new Date());
  const [toggle, setToggle] = useState({ title: "", open: false });
  const [addWorkout, setAddWorkout] = useState(false);
  const [deleteExerciseMutation] = useDeleteExerciseMutation();

  const handleDateChange = (date) => setDatum(date);
  // console.log(data);
  // console.log(
  //   data.readWorkouts.some((workout) => {
  //     console.log(workout.datum);
  //     // console.log(datum.toISOString());
  //     return workout.datum.split("T")[0] !== datum.toISOString().split("T")[0];
  //   })
  // );
  const bgColor = useColorModeValue("frontend.100", "frontend.700");

  const options: any = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const DateButton = ({ value, onClick }) => {
    return (
      <IconButton
        variant="ghost"
        colorScheme="frontend"
        aria-label="Mülleimer"
        fontSize="20px"
        icon={<FaCalendarAlt />}
        onClick={onClick}
      >
        {value}
      </IconButton>
    );
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

      <Flex mt={8} align="center" justify="center">
        <Button
          mr={4}
          onClick={() => {
            setAddWorkout(!addWorkout);
          }}
          colorScheme="frontend"
          varaint="outline"
        >
          Eine Einheit hinzufügen
        </Button>
        <Box ml={4}>
          <DatePicker
            selected={datum}
            onChange={handleDateChange}
            name="datum"
            closeOnScroll={true}
            locale="de"
            //@ts-expect-error
            customInput={<DateButton />}
          ></DatePicker>
        </Box>
      </Flex>
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
                <Heading
                  cursor="pointer"
                  display="inline-block"
                  p={2}
                  borderRadius="lg"
                  boxShadow="md"
                  bg={bgColor}
                >
                  <Link href={`/workout/${workout._id}`}>
                    <Text casing="uppercase">{workout.name}</Text>
                  </Link>
                </Heading>

                {workout.exercise.map((exercise) => {
                  return (
                    <Box mt={4} key={exercise._id}>
                      <Flex>
                        <Text
                          fontSize="2xl"
                          casing="uppercase"

                          // onClick={() => {
                          //   if (toggle.open === false) {
                          //     setToggle({ title: exercise.name, open: true });
                          //     // console.log(toggle);
                          //     //@ts-expect-error
                          //   } else if (toggle.open !== false) {
                          //     setToggle({ title: exercise.name, open: false });
                          //     // console.log(toggle);
                          //   }
                          // }}
                        >
                          {exercise.name}
                        </Text>
                        <Spacer />

                        <IconButton
                          variant="ghost"
                          colorScheme="frontend"
                          aria-label="Mülleimer"
                          fontSize="20px"
                          icon={<FaTrash />}
                          onClick={() => {
                            if (confirm("Bist du dir sicher?")) {
                              deleteExerciseMutation({
                                variables: { id: exercise._id },
                                refetchQueries: [{ query: READ_WORKOUT_QUERY }],
                              });
                            }
                          }}
                        />
                      </Flex>
                      {/* {toggle.title === exercise.name && toggle.open && ( */}
                      <Table variant="simple">
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
                      {/* )} */}
                    </Box>
                  );
                })}
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
              </Box>
            );
          }
        })}
    </Box>
  );
};

export default DashboardPage;
