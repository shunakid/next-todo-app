import React from "react";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import {
  Box,
  Button,
  HStack,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";

const Auth = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { isLoggedIn, user } = useAuth();

  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <Box position={"fixed"} top="5%" right="5%">
      <HStack>
        <Button onClick={() => toggleColorMode()}>
          {colorMode == "dark" ? <FaSun /> : <FaMoon />}
        </Button>{" "}
        {isLoggedIn && (
          <>
            <Button>
              <Text color="green.500">{user.email}</Text>
            </Button>
            <Button>
              <Link color="red.500" onClick={() => auth.signOut()}>
                ログアウト
              </Link>
            </Button>
          </>
        )}
        {!isLoggedIn && (
          <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
            Googleでログイン
          </Button>
        )}
      </HStack>
    </Box>
  );
};
export default Auth;
