'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import WagmiProvider from "@/components/WagmiProvider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const pathname = usePathname() ?? '/';
  const isHome = pathname === '/';

  useEffect(() => {
    const bodyClasses = document.body.classList;
    isHome ? bodyClasses.add('home') : bodyClasses.remove('home');
  }, [isHome]);

  return <WagmiProvider>{children}</WagmiProvider>;
}
