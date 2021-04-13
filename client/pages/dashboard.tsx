import { Box, Button, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
//Apollo
import { useReadWorkoutsQuery } from "../lib/graphql/readWorkouts.graphql";

const DashboardPage = () => {
  const { data, loading, error } = useReadWorkoutsQuery();
  const [datum, setDatum] = useState(new Date());

  const options: any = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  console.log(data, loading, error);
  if (loading)
    return (
      <Box>
        <Spinner />
      </Box>
    );
  return (
    <Box>
      <Flex justify="center">
        <Heading>{datum.toLocaleDateString("de-DE", options)}</Heading>
      </Flex>
      {/* {!loading &&
        data.readWorkouts.map((workout) => {
          console.log(workout.datum);
          return (
            <Box mt={8} key={workout._id}>
              <Heading>{workout.name}</Heading>
              <Text></Text>
            </Box>
          );
        })} */}
    </Box>
  );
};

export default DashboardPage;
