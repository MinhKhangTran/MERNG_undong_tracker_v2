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
import { Exercise, Workout } from "lib/graphql/createExercise.graphql";
import { useEffect, useRef, useState } from "react";
import { useCreateSetMutation } from "lib/graphql/createSet.graphql";
import { READ_WORKOUT_QUERY } from "../../components/TableModal";

import { firstLetterCapital } from "lib/helpers";
import { useReadExerciseByIdQuery } from "lib/graphql/readExerciseById.graphql";
import { useUpdateExerciseMutation } from "lib/graphql/updateExercise.graphql";
import { useDeleteExerciseMutation } from "lib/graphql/deleteExercise.graphql";
import { useReadAllExercisesQuery } from "lib/graphql/readAllExercises.graphql";

const EditExercise = ({ id }) => {
  const { data, loading, error } = useReadExerciseByIdQuery({
    variables: { id },
  });
  const { data: AllExercises } = useReadAllExercisesQuery();
  //update
  const [updateExerciseMutation] = useUpdateExerciseMutation();
  //delete
  const [deleteExerciseMutation] = useDeleteExerciseMutation();
  //other stuffs
  const [formData, setFormData] = useState({ name: "", category: "" });
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
    enableReinitialize: true,
    initialValues: formData,
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
        .required("Eine Übung ist nötig"),
    }),
    onSubmit: (daten, { resetForm }) => {
      // console.log(daten);
      updateExerciseMutation({
        variables: {
          id,
          name: daten.name,
          category: daten.category,
        },
        refetchQueries: [{ query: READ_WORKOUT_QUERY }],
      });
      router.push("/dashboard");
      resetForm();
    },
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: firstLetterCapital(data.readExercise.name),
        category: data.readExercise.category,
      });
    }
  }, [data]);
  const onDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await deleteExerciseMutation({
        variables: { id },
        refetchQueries: [{ query: READ_WORKOUT_QUERY }],
      });
      if (data.deleteExercise) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //   useEffect(() => {
  //     if (!user) {
  //       router.push("/");
  //     }
  //   }, [user]);
  if (loading)
    return (
      <Box mt={8}>
        <Spinner />
      </Box>
    );

  return (
    <Box mt={8}>
      <Button colorScheme="frontend" variant="outline">
        <Link href="/dashboard">🔙 Zurück zur Übersicht </Link>
      </Button>

      <Box mt={8}>
        <Heading>
          <Text>Übung ändern/löschen</Text>
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

          <ButtonGroup>
            <Button mt={8} colorScheme="green" type="submit">
              ✍️ Ändern
            </Button>
            <Button
              mt={8}
              colorScheme="red"
              type="button"
              onClick={(e) => {
                if (confirm("Bist du dir sicher?")) {
                  onDelete(e);
                }
              }}
            >
              🙅‍♂️ Löschen
            </Button>
          </ButtonGroup>
        </form>
      </Box>
    </Box>
  );
};

export default EditExercise;

EditExercise.getInitialProps = ({ query: { id } }) => {
  return { id };
};
