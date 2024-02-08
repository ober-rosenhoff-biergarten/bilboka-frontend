'use client';

import corbadoTranslations from '@/config/corbado-translations';
import { Login, SignUp } from '@corbado/react';
import { CorbadoProvider } from '@corbado/react';
import { useRouter, usePathname } from 'next/navigation';
import { Tabs, Tab } from '@nextui-org/react';
import React, { Key } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export type Modes = 'login' | 'register';

export default function CorbadoLogin(props: { mode: Modes }) {
  const router = useRouter();
  const path = usePathname();

  const [selected, setSelected] = React.useState(props.mode);

  function closeModal() {
    signIn('corbado', {
      callbackUrl: path,
      cbo_short_session: localStorage.getItem('cbo_short_session')
    });
  }

  return (
    <CorbadoProvider
      projectId={process.env.NEXT_PUBLIC_CORBADO_PROJECT_ID}
      darkMode="off"
      customTranslations={corbadoTranslations}
    >
      <Tabs
        aria-label="Options"
        className="justify-center mt-4"
        selectedKey={selected}
        onSelectionChange={setSelected as (key: Key) => void}
      >
        <Tab key="login" title="Logg inn">
          <Login onLoggedIn={closeModal} />
        </Tab>
        <Tab key="register" title="Registrer">
          <SignUp onSignedUp={closeModal} />
        </Tab>
      </Tabs>
    </CorbadoProvider>
  );
}
