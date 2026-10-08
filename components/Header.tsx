import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container nav">
        <a href="/" className="brand">THE EDITORIAL</a>
        <nav>
          <Link href="/?category=Design">Design</Link>
          <Link href="/?category=Technology">Technology</Link>
          <Link href="/?category=Culture">Culture</Link>
          <Link href="/admin">Write</Link>
        </nav>
      </div>
    </header>
  );
}