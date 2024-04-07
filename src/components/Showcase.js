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
        <section className="showcase-code-input-section">
          <CodeEditor
            onCodeSubmit={(inputCode, inputFileName) => {
              setCode(inputCode);
              setFileName(inputFileName);
            }}
          />{" "}
          <CodeImage code={code} fileName={fileName} />
        </section>
      </main>
    </>
  );
};
