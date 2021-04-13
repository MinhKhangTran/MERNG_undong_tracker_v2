import { Box, Button, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
//Apollo
import { useReadWorkoutsQuery } from "../lib/graphql/readWorkouts.graphql";

const DashboardPage = () => {
  const { data, loading, error } = useReadWorkoutsQuery();
  const [datum, setDatum] = useState(new Date());
  // console.log(data);
  const options: any = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  if (loading)
    return (
      <Box>
        <Spinner />
      </Box>
    );
  return (
    <Box>
      <Flex justify="center">
        {/* <Button
          onClick={() => {
            setDatum((oldValue) => {
              const today = oldValue;
              const yesterday = new Date(today);
              oldValue = new Date(yesterday.setDate(yesterday.getDay() - 1));
              return oldValue;
            });
          }}
        >
          -
        </Button> */}
        <Heading>{datum.toLocaleDateString("de-DE", options)}</Heading>
        {/* <Button>+</Button> */}
      </Flex>
      {!loading &&
        data.readWorkouts.map((workout) => {
          return (
            <Box mt={8} key={workout._id}>
              <Heading>{workout.name}</Heading>
              <Text></Text>
            </Box>
          );
        })}
    </Box>
  );
};

export default DashboardPage;
