import Link from "next/link";
import Image from "next/image";

import snippix_logo from "../../public/snippix-no-bg-logo.svg";

export const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-header">
          <Link href="/">
            <Image
              src={snippix_logo}
              width={60}
              height={60}
              priority={true}
              alt="SnippiX"
            />
          </Link>
        </div>
        <div className="navbar-links">
          <ul>
            <li>
              <Link href="https://github.com/preetsuthar17" target="_blank">
                Github
              </Link>
            </li>
            <li>
              <Link href="https://preetsuthar.me" target="_blank">
                Owner
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
