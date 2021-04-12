import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
//Apollo
import { useReadWorkoutsQuery } from "../lib/graphql/readWorkouts.graphql";

const DashboardPage = () => {
  const { data, loading, error } = useReadWorkoutsQuery();
  console.log(data);
  if (loading)
    return (
      <Box>
        <Spinner />
      </Box>
    );
  return (
    <Box>
      <Text>Hier sind deine Einheiten</Text>
      {!loading &&
        data.readWorkouts.map((workout) => {
          return (
            <Box key={workout._id}>
              <Heading>{workout.name}</Heading>
              <Text></Text>
            </Box>
          );
        })}
    </Box>
  );
};

export default DashboardPage;
