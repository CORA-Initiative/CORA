import { AuthProvider } from "../context/AuthContext";
import Layout from "@/components/Layout";
import { UserContextProvider } from "../context/UserContext";
import "@/styles/globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UserContextProvider>
        <Layout>
          <ToastContainer />
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </AuthProvider>
  );
}
