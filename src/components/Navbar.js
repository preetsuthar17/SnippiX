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
              <Link href="https://preetsuthar.me" target="_blank">
                developer
              </Link>
            </li>
            <li>
              <Link
                href="https://buy.stripe.com/fZeaGJeU23Cn9u8288"
                target="_blank"
              >
                support
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
