import { Box } from "@chakra-ui/react";
import { useReadExercisesQuery } from "../../lib/graphql/readExercise.graphql";

const AddExercise = ({ id }) => {
  const { data, loading, error } = useReadExercisesQuery({
    variables: { workout: id },
  });
  console.log(data);
  return <Box>Dropdown mit Namen</Box>;
};

AddExercise.getInitialProps = ({ query: { id } }) => {
  return { id };
};

export default AddExercise;
