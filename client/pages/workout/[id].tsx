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
import { useUpdateWorkoutMutation } from "lib/graphql/updateWorkout.graphql";
import { useDeleteWorkoutMutation } from "lib/graphql/deleteWorkout.graphql";
import { useReadWorkoutByIdQuery } from "lib/graphql/readWorkoutById.graphql";

const WorkoutDetail = ({ id }) => {
  const { data, loading, error } = useReadWorkoutByIdQuery({
    variables: { workoutId: id },
  });
  //update
  const [updateWorkoutMutation] = useUpdateWorkoutMutation();
  //delete
  const [deleteWorkoutMutation] = useDeleteWorkoutMutation();
  //other stuffs
  const [formData, setFormData] = useState({ name: "" });
  const router = useRouter();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: Yup.object({
      name: Yup.string().required("Ein Name ist nötig!"),
    }),
    onSubmit: (daten, { resetForm }) => {
      // console.log(daten);
      updateWorkoutMutation({
        variables: {
          id,
          name: daten.name,
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
        name: data.readWorkout.name,
      });
    }
  }, [data]);
  const onDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await deleteWorkoutMutation({
        variables: { id },
        refetchQueries: [{ query: READ_WORKOUT_QUERY }],
      });
      if (data.deleteWorkout) {
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
          <Text>Einheit ändern/löschen</Text>
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

export default WorkoutDetail;

WorkoutDetail.getInitialProps = ({ query: { id } }) => {
  return { id };
};
