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
  Select,
  Spinner,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Exercise,
  useCreateExerciseMutation,
  Workout,
} from "lib/graphql/createExercise.graphql";
import { useEffect, useRef, useState } from "react";
import { useCreateSetMutation } from "lib/graphql/createSet.graphql";
import { READ_WORKOUT_QUERY } from "../../components/TableModal";
import { useCreateNewExerciseMutation } from "lib/graphql/createNewExercise.graphql";

export const READ_ALL_EXERCISES_QUERY = gql`
  query ReadAllExercises {
    readAllExercises {
      name
      _id
      category
    }
  }
`;

const EditExercise = () => {
  const [createNewExerciseMutation] = useCreateNewExerciseMutation();

  //other stuffs

  const router = useRouter();
  const categoryArray = [
    "Brust",
    "Beine",
    "Rücken",
    "Unterer Rücken",
    "Arme",
    "Schulter",
  ];
  const formik = useFormik({
    initialValues: { name: "", category: "Brust" },
    validationSchema: Yup.object({
      name: Yup.string().required("Ein Name ist nötig!"),
      category: Yup.string()
        .oneOf([
          "Brust",
          "Beine",
          "Rücken",
          "Unterer Rücken",
          "Arme",
          "Schulter",
        ])
        .required("Eine Kategorie ist nötig"),
    }),
    onSubmit: (daten, { resetForm }) => {
      // console.log(daten);
      createNewExerciseMutation({
        variables: { category: daten.category, name: daten.name },
        refetchQueries: [{ query: READ_ALL_EXERCISES_QUERY }],
      });

      router.back();
      resetForm();
    },
  });

  return (
    <Box mt={8}>
      <Button colorScheme="frontend" variant="outline">
        <Link href="/dashboard">🔙 Zurück zur Übersicht </Link>
      </Button>

      <Box mt={8}>
        <Heading>
          <Text>Neue Übung hinzufügen</Text>
        </Heading>
        <form onSubmit={formik.handleSubmit}>
          {/* name */}
          <FormControl
            isInvalid={!!formik.errors.name && formik.touched.name}
            id="name"
            mt={4}
          >
            <FormLabel>Name</FormLabel>
            <Input
              variant=""
              type="text"
              placeholder="name"
              //   isDisabled={user?._id !== data.readVoc.creator._id}
              {...formik.getFieldProps("name")}
            />

            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>
          {/* category */}
          <FormControl
            isInvalid={!!formik.errors.category && formik.touched.category}
            id="category"
            mt={4}
          >
            <FormLabel>Kategorie</FormLabel>
            <Select
              placeholder="Wähle eine Kategorie aus"
              {...formik.getFieldProps("category")}
            >
              {categoryArray.map((category, index) => {
                return (
                  <option key={index} value={category}>
                    {category}
                  </option>
                );
              })}
            </Select>

            <FormErrorMessage>{formik.errors.category}</FormErrorMessage>
          </FormControl>

          <Button mt={8} colorScheme="green" type="submit">
            Hinzufügen
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default EditExercise;
