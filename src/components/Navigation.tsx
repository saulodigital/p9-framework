"use client"; 

import Link from 'next/link';

import { useSession, signIn, signOut } from "next-auth/react";
import { Logomark } from '@/components/Icons';

export function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return <button onClick={() => signOut()}>Sign out</button>;
  }
  return <button onClick={() => signIn()}>Sign in</button>;
};

export default function Navigation() {
  return (
    <header className='flex items-center justify-space-between p-4 mb-12 w-fullitems-center backdrop-blur-lg bg-black/85 text-gray-100 flex flex-col text-base h-full left-0 leading-relaxed min-h-screen fixed top-0 w-[76px]'>
      <Link href='/' className="flex justify-center h-8 w-8 leading-relaxed">
        <Logomark />
      </Link>
      <AuthButton />
    </header>
  );
};
