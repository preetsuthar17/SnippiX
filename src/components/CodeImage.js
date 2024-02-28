import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { toPng } from "html-to-image";
import { useRef } from "react";

export default function CodeImage({ code }) {
  const ref = useRef();

  const downloadImage = async () => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "code-image.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("oops, something went wrong!", err);
      });
  };

  return (
    <>
      <div style={{ backgroundColor: "", padding: "20px" }}>
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
          showLineNumbers={true}
          wrapLongLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      <button onClick={downloadImage}>Download Image</button>
    </>
  );
}
