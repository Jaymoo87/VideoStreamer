import React from 'react';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import Navbar from '@/components/Navbar';
import useCurrentUser from '@/hooks/useCurrentUser';

import BillBoard from '@/components/BillBoard';

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
      <Navbar />
      <BillBoard />
    </>
  );
};

export default Home;
