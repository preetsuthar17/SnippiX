import { useState, useEffect } from "react";

export default function CodeEditor({ onCodeSubmit }) {
  const [code, setCode] = useState(
    "function resolveAfter2Seconds() {\n    return new Promise((resolve) => { \n      setTimeout(() => { \n        resolve('resolved');\n      }, 2000);\n    });\n  }\n\n async function asyncCall() {\n    console.log('calling'); \n    const result = await resolveAfter2Seconds();\n    console.log(result);\n  }\n\nasyncCall();"
  );
  const [fileName, setFileName] = useState("index.js");

  useEffect(() => {
    onCodeSubmit(code, fileName);
  }, [code, fileName, onCodeSubmit]);

  return (
    <div className="code-editor-div">
      <input
        type="text"
        value={fileName}
        className="code-editor-name-input"
        onChange={(e) => setFileName(e.target.value)}
        placeholder="index.js"
      />
      <textarea
        className="code-editor-textarea"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Type your code here..."
      />
    </div>
  );
}
