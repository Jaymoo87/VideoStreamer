import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';

import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';

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

const Profiles = () => {
  const router = useRouter();
  const { data: user } = useCurrentUser();

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col">
        <h1 className="text-3xl text-center text-white md:text-6xl">Who is Watching?</h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => router.push('/')}>
            <div className="flex-row mx-auto group w-44">
              <div className="flex items-center justify-center overflow-hidden border-2 border-transparent rounded-md w-44 h-44 group-hover:cursor-pointer group-hover:border-white">
                <img src="/images/profileLogo.png" alt="" className="p-5" />
              </div>
              <div className="mt-4 text-2xl text-center text-gray-400 group-hover:text-white">Justin</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
