import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";

import { MongoClient } from "mongodb";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="We have a list of React Meetups that you can also create" />
      </Head>
      <h1>Home Page</h1>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:admin@cluster0.lpjis.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        ...meetup,
        id: meetup._id.toString(),
        _id: "",
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
