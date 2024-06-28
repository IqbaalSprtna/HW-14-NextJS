import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@/context/authContext";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Navbar />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}
