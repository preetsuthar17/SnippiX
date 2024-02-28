import { useState } from "react";

export default function CodeEditor({ onCodeSubmit }) {
  const [code, setCode] = useState("");

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
