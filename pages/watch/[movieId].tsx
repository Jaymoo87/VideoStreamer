import React from 'react';

import useMovie from '@/hooks/useMovie';
import { useRouter } from 'next/router';

import { AiOutlineArrowLeft } from 'react-icons/ai';

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);

  return (
    <div className="w-screen h-screen bg-black">
      <nav className="fixed z-10 flex flex-row items-center w-full gap-8 p-4 bg-black bg-opacity-70">
        <AiOutlineArrowLeft onClick={() => router.push('/')} className="text-white cursor-pointer" size={40} />
        <p className="text-xl font-bold text-white md:text-3xl">
          <span className="font-light">Watching: {data?.title}</span>
        </p>
      </nav>
      <video autoPlay controls src={data?.videoUrl} className="w-full h-full"></video>
    </div>
  );
};

export default Watch;
