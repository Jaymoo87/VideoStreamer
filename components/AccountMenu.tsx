import React from 'react';

import { signOut } from 'next-auth/react';
import useCurrentUser from '@/hooks/useCurrentUser';

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data } = useCurrentUser();

  if (!visible) {
    return null;
  }

  return (
    <div className="absolute right-0 flex flex-col w-56 py-5 bg-black border-gray-800 top-14">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center w-full gap-3 px-3 group/item">
          <img src="/images/profileLogo.png" alt="profile logo" className="w-8 rounded-md" />
          <p className="text-sm text-white group-hover/item:underline"> {data?.name} </p>
        </div>
        <hr className="h-px my-4 bg-gray-600 border-0" />
        <div onClick={() => signOut()} className="px-3 text-sm text-center text-white hover:underline">
          Sign Out
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
