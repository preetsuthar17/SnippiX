import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { toPng } from "html-to-image";
import { useRef } from "react";

export default function CodeImage({ code }) {
  const ref = useRef();
  const downloadImage = async () => {
    if (!ref.current) {
      return;
    }

    // Save the original size
    const originalWidth = ref.current.style.width;
    const originalHeight = ref.current.style.height;

    // Adjust the size to fit the content
    ref.current.style.width = "max-content";
    ref.current.style.height = "max-content";

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "code-image.png";
        link.href = dataUrl;
        link.click();

        // Restore the original size
        ref.current.style.width = originalWidth;
        ref.current.style.height = originalHeight;
      })
      .catch((err) => {
        console.error("oops, something went wrong!", err);
      });
  };

  return (
    <div className="code-image-div">
      <div ref={ref}>
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
          showLineNumbers={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      <button onClick={downloadImage} className="primary-button">
        Download Image
      </button>
    </div>
  );
}
