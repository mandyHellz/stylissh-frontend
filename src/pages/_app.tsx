import type { AppProps } from "next/app";
import { Provider, createClient } from "urql";
import { ShopProvider } from "../contexts/ShopContext";
import { UserProvider } from "@auth0/nextjs-auth0";
import "../styles/globals.css";

const client = createClient({ url: `${process.env.NEXT_PUBLIC_BACKEND_API}` });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ShopProvider>
        <Provider value={client}>
          <Component {...pageProps} />
        </Provider>
      </ShopProvider>
    </UserProvider>
  );
}

export default MyApp;
