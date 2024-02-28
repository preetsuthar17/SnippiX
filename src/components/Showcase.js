import CodeEditor from "./CodeEditor";
import CodeImage from "./CodeImage";
import { useState } from "react";

export const Showcase = () => {
  const [code, setCode] = useState("");

  return (
    <>
      <main className="showcase">
        <div className="showcase-headings">
          <h1>Snippix</h1>
          <p>
            Easily convert your code snippets in beautiful images and share
            seamlessly.
          </p>
        </div>
      </main>
      <section className="showcase-code-input-section">
        <CodeEditor onCodeSubmit={(inputCode) => setCode(inputCode)} />
        {code && <CodeImage code={code} />}
      </section>
    </>
  );
};
