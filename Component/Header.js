import { css } from '@emotion/react';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <nav
        style={{ padding: '30px 56px', textAlign: 'center', fontSize: '20px' }}
      >
        <Link href="/">
          <a style={{ padding: '30px 56px' }}>Home</a>
        </Link>
        <Link href="/sports">
          <a style={{ padding: '30px 56px' }}>Sport</a>
        </Link>
        <Link href="/news">
          <a style={{ padding: '30px 56px' }}>News</a>
        </Link>
        <Link href="/login">
          <a style={{ padding: '30px 72px' }}>Login</a>
        </Link>
      </nav>
    </header>
  );
}
