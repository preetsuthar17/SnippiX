import Link from "next/link";
import snippixBanner from "../../public/snippix-banner.svg";
import Image from "next/image";

export const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-header">
          <Image
            src={snippixBanner}
            width={100}
            height={100}
            alt="snippix"
            loading="lazy"
          />
        </div>
        <div className="footer-links">
          <div className="section-1">
            <p>EXPLORE</p>
            <ul>
              <li>
                <Link href="https://preetsuthar.me" target="_blank">
                  Developer
                </Link>
              </li>
              <li>
                <Link href="https://github.com/preetsuthar17" target="_blank">
                  Github
                </Link>
              </li>
              <li>
                <Link href="https://x.com/preetsuthar17" target="_blank">
                  Twitter (x)
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/preetsuthar17/SnippiX"
                  target="_blank"
                >
                  Source Code
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};
