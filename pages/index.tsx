import type { NextPage } from "next";
import Head from "next/head";
import { EventList } from "../components/events/EventList";
import { InputForm } from "../components/form/InputForm";

const Home: NextPage = () => {
  return (
    <div className="main-container">
      <Head>
        <title> Event List </title>
      </Head>
      <div className="input-output-container">
        <InputForm />
        <EventList />
      </div>
    </div>
  );
};

export default Home;
