import { css } from '@emotion/react';
import Link from 'next/link';

const navStyle = css`
  padding: 30px 72px;
  a {
    color: #f2f2f2;
    text-align: center;
    padding: 30px 56px;
    text-decoration: none;
    font-size: 20px;
  }
  a:hover {
    color: #ff1966;
  }
`;

export default function Header() {
  return (
    <header>
      <nav css={navStyle}>
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
