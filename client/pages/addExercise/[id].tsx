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
import { firstLetterCapital } from "lib/helpers";
import { useCreateExerciseMutation } from "lib/graphql/createExercise.graphql";
import { READ_WORKOUT_QUERY } from "components/TableModal";
import { useRouter } from "next/router";

const AddExercise = ({ id }) => {
  const { data, loading, error } = useReadAllExercisesQuery();
  const router = useRouter();
  // console.log(data);
  const [createExerciseMutation] = useCreateExerciseMutation();
  const formik = useFormik({
    initialValues: { exerciseName: "" },
    validationSchema: Yup.object({
      exerciseName: Yup.string().required("Eine Übung ist nötig"),
    }),
    onSubmit: (daten, { resetForm }) => {
      // console.log(daten);
      createExerciseMutation({
        variables: {
          category: selectedExercise.category,
          name: daten.exerciseName,
          workout: id,
        },
        refetchQueries: [{ query: READ_WORKOUT_QUERY }],
      });
      router.back();
    },
  });

  const selectedExercise = data?.readAllExercises?.find(
    (exercise) => exercise.name === formik.values.exerciseName
  );

  //Get unique exercises; nach name
  const allExistingExercises = data?.readAllExercises.map(
    (exercise) => exercise.name
  );
  // console.log(allExistingExercises);
  const allUniqueExercises = [
    // @ts-expect-error
    ...new Set(allExistingExercises?.map((exercise) => exercise)),
  ];
  // console.log(allUniqueExercises);
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
              {allUniqueExercises.map((exercise) => {
                return (
                  <option key={exercise._id} value={exercise}>
                    {firstLetterCapital(exercise)}
                  </option>
                );
              })}
            </Select>

            <FormErrorMessage>{formik.errors.exerciseName}</FormErrorMessage>
          </FormControl>
          {/* category
          <FormControl id="exerciseName">
            <Select {...formik.getFieldProps("category")}>
              {data.readAllExercises.map((exercise) => {
                return (
                  <option key={exercise._id} value={exercise.category}>
                    {exercise.category}
                  </option>
                );
              })}
            </Select>
          </FormControl> */}

          <ButtonGroup>
            <Button mt={8} colorScheme="frontend" type="submit">
              Hinzufügen 💪
            </Button>
            <Link href="/editExercise">
              <Button
                mt={8}
                colorScheme="frontend"
                type="button"
                variant="outline"
              >
                Neue Übung hinzufügen ➕
              </Button>
            </Link>
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
