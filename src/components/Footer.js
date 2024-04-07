import Link from "next/link";
export const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-links">
          <div className="section-1">
            <ul>
              <li>
                <Link href="https://github.com/preetsuthar17" target="_blank">
                  Github{" "}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z"
                      />
                    </svg>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="https://preetsuthar.me" target="_blank">
                  Made by Preet Suthar{" "}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z"
                      />
                    </svg>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="https://x.com/preetsuthar17" target="_blank">
                  Twitter (x){" "}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z"
                      />
                    </svg>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};
