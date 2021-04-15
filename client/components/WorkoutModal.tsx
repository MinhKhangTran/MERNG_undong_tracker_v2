import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import gql from "graphql-tag";
import { Exercise, Workout } from "lib/graphql/createExercise.graphql";
import { useEffect, useRef, useState } from "react";
import { useCreateSetMutation } from "lib/graphql/createSet.graphql";
import { READ_WORKOUT_QUERY } from "./TableModal";
import { useUpdateWorkoutMutation } from "lib/graphql/updateWorkout.graphql";
import { useDeleteWorkoutMutation } from "lib/graphql/deleteWorkout.graphql";
import { useReadWorkoutByIdLazyQuery } from "lib/graphql/readWorkoutById.graphql";

const WorkoutModal = ({ workout }: { workout: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalOpen, setModalOpen] = useState(false);
  const [change, setChange] = useState("hi");
  const initialRef = useRef();
  const finalRef = useRef();
  const [closeModal, setCloseModal] = useState(false);
  //destruct mutation
  const [updateWorkoutMutation] = useUpdateWorkoutMutation();
  const [deleteWorkoutMutation] = useDeleteWorkoutMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: workout.name,
    validationSchema: Yup.object({
      name: Yup.string().required("Ein Name ist nötig!"),
    }),
    onSubmit: (daten, { resetForm }) => {
      console.log(daten);
      updateWorkoutMutation({
        variables: { id: workout._id, name: daten.name },
        refetchQueries: [{ query: READ_WORKOUT_QUERY }],
      });

      resetForm();
    },
  });

  //   console.log(index);
  useEffect(() => {
    if (closeModal) {
      onClose();
      setCloseModal(!closeModal);
    }
  }, [closeModal]);

  return (
    <>
      <Heading
        onClick={() => {
          onOpen();
          //   console.log(workout._id);
        }}
      >
        <Text casing="uppercase">{workout.name}</Text>
      </Heading>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="3xl" casing="uppercase">
              Einheit ändern/löschen?
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                  ref={initialRef}
                  variant="filled"
                  type="number"
                  placeholder="Name deiner Einheit"
                  value={change}
                  onChange={(e) => {
                    setChange(e.target.value);
                  }}
                ></Input>
              </FormControl>

              <Box>NOTIZ FÜR RPE UND TIMER</Box>
              <ModalFooter mt={8}>
                <ButtonGroup>
                  <Button
                    type="submit"
                    colorScheme="red"
                    onClick={(e) => {
                      if (confirm("Bist du dir sicher?")) {
                        handleDelete(e);
                      }
                      setCloseModal(true);
                    }}
                  >
                    Satz löschen 🙅‍♂️
                  </Button>{" "}
                  <Button
                    type="submit"
                    colorScheme="frontend"
                    mr={3}
                    onClick={onClose}
                  >
                    Satz ändern ✍️
                  </Button>
                </ButtonGroup>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WorkoutModal;
