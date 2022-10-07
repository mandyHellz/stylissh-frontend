import Head from "next/head";
import { Header } from "./Header";

interface DefaultLayoutProps {
  children: JSX.Element;
  title: string;
}

export const DefaultLayout = ({ children, title }: DefaultLayoutProps) => {
  return (
    <>
      <Header />
      <main className="py-20 px-10 mx-auto max-w-container min-w-xs">
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {children}
      </main>
    </>
  );
};
