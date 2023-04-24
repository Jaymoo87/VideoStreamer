import React from 'react';
import useBillboard from '@/hooks/useBillBoard';

import { AiOutlineInfoCircle } from 'react-icons/ai';
import PlayButton from './PlayButton';

const BillBoard = () => {
  const { data } = useBillboard();

  return (
    <div className="relative h-[56.25vw]">
      <video
        className="w-full h-[56.25vs] object-cover brightness-[60%]"
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
        autoPlay
        muted
        loop
      />
      <div className="absolute top-[40%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] ">
          {data?.description}
        </p>

        <div className="flex flex-row items-center gap-3 mt-3 md:mt-4">
          <PlayButton movieId={data?.id} />
          <button className="flex flex-row items-center w-auto px-2 py-1 text-xs font-semibold text-white transition bg-white rounded-md md:py-2 bg-opacity-30 md:px-4 lg:text-lg hover:bg-opacity-20">
            <AiOutlineInfoCircle className="mr-3" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillBoard;
