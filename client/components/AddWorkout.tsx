import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useCreateWorkoutMutation } from "lib/graphql/createWorkout.graphql";
import { Dispatch, SetStateAction } from "react";
import * as Yup from "yup";
import { READ_WORKOUT_QUERY } from "./TableModal";

const AddWorkout = ({
  datum,
  setAddWorkout,
}: {
  datum: Date;
  setAddWorkout: Dispatch<SetStateAction<boolean>>;
}) => {
  const [createWorkoutMutation] = useCreateWorkoutMutation();
  const formik = useFormik({
    initialValues: { name: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Bitte einen Namen eingeben"),
    }),
    onSubmit: (daten, { resetForm }) => {
      //   console.log(daten, datum);
      createWorkoutMutation({
        variables: { datum: datum.toISOString(), name: daten.name },
        refetchQueries: [{ query: READ_WORKOUT_QUERY }],
      });
      setAddWorkout(false);
      resetForm();
    },
  });
  return (
    <Box mt={8}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          isInvalid={!!formik.errors.name && formik.touched.name}
          id="name"
        >
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            {...formik.getFieldProps("name")}
            placeholder="Name deiner Einheit"
          ></Input>
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>
        <Button type="submit" mt={8} colorScheme="frontend">
          Hinzufügen 💪
        </Button>
      </form>
    </Box>
  );
};

export default AddWorkout;
