"use client"; 

import Link from 'next/link';

import { useSession, signIn, signOut } from "next-auth/react";
import { Logomark, LogomarkLightmode } from '@/components/Icons';

export function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return <button onClick={() => signOut()}>Sign out</button>;
  }
  return <button onClick={() => signIn()}>Sign in</button>;
};

export default function Navigation() {
  return (
    <header>
      <Link href='/' className='flex gap-1'>
        <LogomarkLightmode height='2.5rem' width='2.5rem'/>
        <span>Plebs</span>
      </Link>
      <AuthButton />
    </header>
  );
};
