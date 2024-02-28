// components/CodeEditor.js
import { useState } from 'react';

export default function CodeEditor({ onCodeSubmit }) {
  const [code, setCode] = useState('');

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Type your code here..."
      />
      <button onClick={() => onCodeSubmit(code)}>Generate Image</button>
    </div>
  );
}