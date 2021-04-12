import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Heading,
  InputGroup,
  InputRightElement,
  IconButton,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// Formik und yup
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "authContext";
// Redux

const Login = () => {
  const { loginLoading, loginError, login, user } = useAuth();
  const router = useRouter();
  const [showPW, setShowPW] = useState(false);
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Eine Email ist nötig!"),
      password: Yup.string()
        .required("Ein Passwort ist nötig!")
        .min(6, "mindestens 6 Zeichen!"),
    }),
    onSubmit: (daten, { resetForm }) => {
      login(daten.email, daten.password);
    },
  });

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  return (
    <Box
      p={10}
      mt={16}
      boxShadow="md"
      borderRadius="lg"
      w={{ base: "100%", md: "65%" }}
      mx="auto"
    >
      <Heading bgGradient="linear(to-l,purple.100,frontend.200)" bgClip="text">
        Login
      </Heading>
      {loginError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>{loginError.message}</AlertTitle>
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        {/* Email */}
        <FormControl
          isInvalid={!!formik.errors.email && formik.touched.email}
          id="email"
          mt={4}
        >
          <FormLabel
            bgGradient="linear(to-l,purple.100,frontend.200)"
            bgClip="text"
          >
            E-Mail
          </FormLabel>
          <Input
            variant="flushed"
            type="text"
            placeholder="E-Mail Adresse"
            {...formik.getFieldProps("email")}
          />

          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>

        {/* Password */}
        <FormControl
          isInvalid={!!formik.errors.password && formik.touched.password}
          id="password"
          mt={4}
        >
          <FormLabel
            bgGradient="linear(to-l,purple.100,frontend.200)"
            bgClip="text"
          >
            Password
          </FormLabel>
          <InputGroup>
            <Input
              variant="flushed"
              type={showPW ? "text" : "password"}
              placeholder="******"
              {...formik.getFieldProps("password")}
            />
            <InputRightElement width="4.5rem">
              <IconButton
                aria-label="hide/show password"
                onClick={() => setShowPW(!showPW)}
                variant="ghost"
                colorScheme="frontend"
                h="1.75rem"
              >
                {showPW ? <FaEyeSlash /> : <FaEye />}
              </IconButton>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>

        <Button
          isLoading={loginLoading}
          mt={8}
          colorScheme="frontend"
          type="submit"
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
