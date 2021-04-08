//Next

//Chakra
import { Box, Button, Heading } from "@chakra-ui/react";
//Next auth
import { signIn, signOut, useSession } from "next-auth/client";

const IndexPage = () => {
  const [session, loading] = useSession();
  //   console.log(session);
  return (
    <Box>
      <Heading>Dummy Login</Heading>
      {!session && (
        <>
          Not signed in <br />
          <Button
            colorScheme="purple"
            onClick={() => {
              signIn();
            }}
          >
            Sign In
          </Button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <div>You can now access our super secret pages</div>
          <button
            onClick={() => {
              signOut();
            }}
          >
            sign out
          </button>
        </>
      )}
    </Box>
  );
};

export default IndexPage;
