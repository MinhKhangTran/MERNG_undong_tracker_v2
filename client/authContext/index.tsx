//statt redux
import { useGetLoggedUserQuery } from "lib/graphql/getLoggedUser.graphql";
import { useLoginMutation } from "lib/graphql/login.graphql";
import { useRegisterMutation } from "lib/graphql/register.graphql";
import { useContext, createContext, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";

interface IUser {
  // __typename: "User";
  _id: string;
  email: string;
  username: string;
}
interface IContextProps {
  //query state
  user: IUser;
  loginLoading: boolean;
  loginError: any;
  registerLoading: boolean;
  registerError: any;
  //mutation methods
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  //datum
  datum: Date;
  handleDateChange: (date: Date) => void;
}

const AuthContext = createContext<Partial<IContextProps>>({});

export const AuthProvider = ({ children }) => {
  const [datum, setDatum] = useState(new Date());
  const router = useRouter();
  const client = useApolloClient();
  //Query: user from apollo => get logged in user

  const { data } = useGetLoggedUserQuery({
    fetchPolicy: "network-only",
    errorPolicy: "ignore",
  });
  const user = data?.getLoggedUser;
  //Mutation: signin, signup, sign out (just remove token from storage) => signin, signup
  // query and state into the value object of the provider

  const [
    loginMutation,
    { loading: loginLoading, error: loginError },
  ] = useLoginMutation();
  const [
    registerMutation,
    { loading: registerLoading, error: registerError },
  ] = useRegisterMutation();

  const login = async (email, password) => {
    try {
      //signinMutation returns a Promise therefor we need async/await
      const { data } = await loginMutation({ variables: { email, password } });
      if (data.login.token && data.login.user) {
        localStorage.setItem("token", data.login.token);
        //client resetStore at login to refetch and set to cache
        client.resetStore().then(() => {
          router.push("/dashboard");
        });
      } else {
        throw new Error("Login schlug fehl");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const register = async (email, username, password) => {
    try {
      const { data } = await registerMutation({
        variables: { password, email, username },
      });
      if (data.register.token && data.register.user) {
        localStorage.setItem("token", data.register.token);
        //client resetStore
        client.resetStore().then(() => {
          router.push("/");
        });
      } else {
        throw new Error("Registrierung schlug fehl");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    client.resetStore().then(() => {
      router.push("/");
    });
  };

  const handleDateChange = (date) => setDatum(date);
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loginLoading,
        loginError,
        registerLoading,
        registerError,
        datum,
        handleDateChange,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
