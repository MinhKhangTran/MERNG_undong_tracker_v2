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
import * as Yup from "yup";

const AddWorkoutPage = () => {
  const formik = useFormik({
    initialValues: { name: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Bitte einen Namen eingeben"),
    }),
    onSubmit: (daten, { resetForm }) => {
      console.log(daten);
    },
  });
  return (
    <Box>
      <Heading>Füge eine Einheit hinzu</Heading>
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

export default AddWorkoutPage;
