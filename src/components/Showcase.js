import CodeEditor from "./CodeEditor";
import CodeImage from "./CodeImage";
import { useState } from "react";

export const Showcase = () => {
  const [code, setCode] = useState(
    "function resolveAfter2Seconds() {\n    return new Promise((resolve) => { \n      setTimeout(() => { \n        resolve('resolved');\n      }, 2000);\n    });\n  }\n\n async function asyncCall() {\n    console.log('calling'); \n    const result = await resolveAfter2Seconds();\n    console.log(result);\n  }\n\nasyncCall();"
  );
  const [fileName, setFileName] = useState("index.js");

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
        <CodeEditor
          onCodeSubmit={(inputCode, inputFileName) => {
            setCode(inputCode);
            setFileName(inputFileName);
          }}
        />{" "}
        {code && <CodeImage code={code} fileName={fileName} />}{" "}
      </section>
    </>
  );
};
