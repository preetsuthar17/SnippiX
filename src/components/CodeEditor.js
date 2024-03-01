import { useState } from "react";

export default function CodeEditor({ onCodeSubmit }) {
  const [code, setCode] = useState("function resolveAfter2Seconds() {\n    return new Promise((resolve) => { \n      setTimeout(() => { \n        resolve('resolved');\n      }, 2000);\n    });\n  }\n\n async function asyncCall() {\n    console.log('calling'); \n    const result = await resolveAfter2Seconds();\n    console.log(result);\n  }\n\nasyncCall();");

  return (
    <div className="code-editor-div">
      <textarea
        className="code-editor-textarea"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Type your code here..."
      />
      <button className="primary-button" onClick={() => onCodeSubmit(code)}>
        Snippixify code
      </button>
    </div>
  );
}
