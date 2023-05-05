import { AuthProvider } from "../context/AuthContext";
import Layout from "@/components/Layout";
import { UserContextProvider } from "../context/UserContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UserContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </AuthProvider>
  );
}
