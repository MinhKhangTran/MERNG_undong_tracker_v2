import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
import { Exercise } from "lib/graphql/createExercise.graphql";
import { useEffect, useRef, useState } from "react";
import { useCreateSetMutation } from "lib/graphql/createSet.graphql";
import { READ_WORKOUT_QUERY } from "./TableModal";

const AddSetModal = ({
  exercise,
}: {
  exercise: Pick<Exercise, "_id" | "category" | "name">;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [setData, setSetData] = useState({
    gewicht: 0,
    wdh: 0,
  });
  const initialRef = useRef();
  const finalRef = useRef();
  const [closeModal, setCloseModal] = useState(false);
  //destruct mutation
  const [createSetMutation] = useCreateSetMutation();

  const formik = useFormik({
    initialValues: { gewicht: 0, wdh: 0 },
    validationSchema: Yup.object({
      gewicht: Yup.number()
        .required("Ein Gewicht ist nötig!")
        .positive("Bitte mehr Gewicht 🥲"),
      wdh: Yup.number()
        .required("Eine Wiederholung ist nötig!")
        .positive("Bitte mehr Reps machen 🥲")
        .integer(),
    }),
    onSubmit: (daten, { resetForm }) => {
      console.log(daten);
      createSetMutation({
        variables: {
          exercise: exercise._id,
          gewicht: daten.gewicht,
          wdh: daten.wdh,
        },
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
      <Button onClick={onOpen} variant="ghost">
        Satz hinzufügen
      </Button>
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
              {exercise.name}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="2xl">Neuer Satz</Text>
            <Flex justify="center" direction="column" align="center">
              <form onSubmit={formik.handleSubmit}>
                <FormControl
                  isInvalid={!!formik.errors.gewicht && formik.touched.gewicht}
                  id="gewicht"
                >
                  <FormLabel>Gewicht</FormLabel>
                  <Input
                    ref={initialRef}
                    variant="filled"
                    type="number"
                    placeholder="Gewicht in [kg]"
                    {...formik.getFieldProps("gewicht")}
                  />
                  <FormErrorMessage>{formik.errors.gewicht}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!formik.errors.wdh && formik.touched.wdh}
                  id="wdh"
                >
                  <FormLabel>Wiederholung</FormLabel>
                  <Input
                    ref={initialRef}
                    variant="filled"
                    type="number"
                    placeholder="wdh"
                    {...formik.getFieldProps("wdh")}
                  />
                  <FormErrorMessage>{formik.errors.wdh}</FormErrorMessage>
                </FormControl>
                <Box>NOTIZ FÜR RPE UND TIMER</Box>
                <Button
                  mt={8}
                  type="submit"
                  colorScheme="frontend"
                  onClick={onClose}
                >
                  Satz hinzufügen ➕
                </Button>
              </form>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSetModal;
