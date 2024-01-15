'use client';

import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import LoginModal from '@/components/auth/login-modal';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function User({ user }: { user: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showLogin = searchParams.get('login') && !user;

  return (
    <div className="hidden sm:ml-6 sm:flex sm:items-center">
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button
            className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            onClick={() => !user && router.push('?login=true')}
          >
            <div className="grid grid-flow-col auto-cols-max gap-4">
              <div className="place-self-center">
                {user?.name || 'Logg inn'}
              </div>
              <div className="place-self-end">
                <span className="sr-only">Open user menu</span>
                {/* TODO: bytt ut default pic */}
                <Image
                  className="h-8 w-8 rounded-full"
                  src={user?.image || 'https://avatar.vercel.sh/leerob'}
                  height={32}
                  width={32}
                  alt={`${user?.name || 'placeholder'} avatar`}
                />
              </div>
            </div>
          </Menu.Button>
        </div>
        {user && (
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                <button
                  className="hover:bg-gray-100 flex w-full px-4 py-2 text-sm text-gray-700"
                  onClick={() => signOut()}
                >
                  Logg ut
                </button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        )}
      </Menu>
      {showLogin && <LoginModal />}
    </div>
  );
}
