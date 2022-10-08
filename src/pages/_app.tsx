import type { AppProps } from "next/app";
import { Provider, createClient } from "urql";
import { ShopProvider } from "../contexts/ShopContext";
import "../styles/globals.css";

const client = createClient({ url: `${process.env.NEXT_PUBLIC_BACKEND_API}` });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ShopProvider>
        <Component {...pageProps} />
      </ShopProvider>
    </Provider>
  );
}

export default MyApp;
