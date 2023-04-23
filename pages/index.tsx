import useCurrentUser from '@/hooks/useCurrentUser';
import { NextPageContext } from 'next';
import { getSession, signOut } from 'next-auth/react';

import React from 'react';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/Auth',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const Home = () => {
  const { data: user } = useCurrentUser();

  return (
    <>
      <h1 className="">Streaming App</h1>
      <p>Logged in as: {user?.email}</p>
      <button className="w-full h-10 bg-white" onClick={() => signOut()}>
        Logout
      </button>
    </>
  );
};

export default Home;
