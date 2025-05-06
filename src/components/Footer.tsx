import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex items-center justify-space-between p-8 pb-20 gap-16 sm:p-20">
      <p>© {(new Date().getFullYear())} Plebs Network. All Rights Reserved.</p>
      <div className="flex items-center justify-items-center gap-4">
        <Link href='/'>
          About Plebs
        </Link>
        <Link href='/'>
          Contact
        </Link>
        <Link href='/'>
          Privacy Policy
        </Link>
        <Link href='/'>
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}
