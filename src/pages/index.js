import { useState } from 'react';
import CodeEditor from '@/compoents/CodeEditor';
import CodeImage from '@/compoents/CodeImage';

export default function Home() {
  const [code, setCode] = useState('');

  return (
    <div>
      <CodeEditor onCodeSubmit={(inputCode) => setCode(inputCode)} />
      {code && <CodeImage code={code} />}
    </div>
  );
}