import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useReadAllExercisesQuery } from "lib/graphql/readAllExercises.graphql";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
const AddExercise = ({ id }) => {
  const { data, loading, error } = useReadAllExercisesQuery();
  console.log(data);
  const formik = useFormik({
    initialValues: { exerciseName: "" },
    validationSchema: Yup.object({
      exerciseName: Yup.string().required("Eine Übung ist nötig"),
    }),
    onSubmit: (daten, { resetForm }) => {
      console.log(daten);
    },
  });
  if (loading)
    return (
      <Box>
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
          <Text>Übung hinzufügen</Text>
        </Heading>
        <form onSubmit={formik.handleSubmit}>
          {/* name */}
          <FormControl
            isInvalid={
              !!formik.errors.exerciseName && formik.touched.exerciseName
            }
            id="exerciseName"
            mt={4}
          >
            <FormLabel>Eine Übung wählen</FormLabel>
            <Select
              placeholder="Wähle eine Übung aus"
              {...formik.getFieldProps("exerciseName")}
            >
              {data.readAllExercises.map((exercise) => {
                return (
                  <option key={exercise._id} value={exercise.name}>
                    {exercise.name}
                  </option>
                );
              })}
            </Select>

            <FormErrorMessage>{formik.errors.exerciseName}</FormErrorMessage>
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

AddExercise.getInitialProps = ({ query: { id } }) => {
  return { id };
};

export default AddExercise;
