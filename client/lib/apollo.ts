//to connect our apollo server with frontend, and init apollo client
//React
import { useMemo } from "react";
//Apollo Stuff
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
//apolloClient
let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

//create a apollo client
function createApolloClient() {
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("token");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  const httpLink = new HttpLink({
    uri: "http://localhost:5000/graphql",
    // uri: "/graphql",
    credentials: "include",
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}
//for rehydration init Apollo
export function initializeApollo(initialState: any = null) {
  // ?? returned right operand if left operand is null or undefined. Here: at first apolloClient is defiend as undefined so we create a new one with createApolloclient, in the next run we take the existing apollo client
  const _apolloClient = apolloClient ?? createApolloClient();
  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

//custom hook to use Apollo
export function useApollo(initialState: any) {
  // onyl if initState changes useMemo kicks in and init a apollo client
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
