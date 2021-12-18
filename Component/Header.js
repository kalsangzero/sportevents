import { css } from '@emotion/react';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/sports">
          <a>Sport</a>
        </Link>
        <Link href="/news">
          <a>News</a>
        </Link>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </nav>
    </header>
  );
}
