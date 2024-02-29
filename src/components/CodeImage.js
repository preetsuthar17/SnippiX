import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { toPng } from "html-to-image";
import { useRef, useState } from "react";

export default function CodeImage({ code }) {
  const ref = useRef();
  const [fontSize, setFontSize] = useState(16);

  const downloadImage = async () => {
    if (!ref.current) {
      return;
    }

    const originalWidth = ref.current.style.width;
    const originalHeight = ref.current.style.height;

    ref.current.style.width = "max-content";
    ref.current.style.height = "max-content";

    setTimeout(() => {
      toPng(ref.current, { cacheBust: true })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "code-image.png";
          link.href = dataUrl;
          link.click();

          ref.current.style.width = originalWidth;
          ref.current.style.height = originalHeight;
        })
        .catch((err) => {
          console.error("oops, something went wrong!", err);
        });
    }, 0);
  };

  const handleFontSizeChange = (event) => {
    const newFontSize = parseInt(event.target.value);
    setFontSize(newFontSize);
    document.documentElement.style.setProperty(
      "--font-size",
      `${newFontSize}px`
    );
  };

  return (
    <div className="code-image-div">
      <input
        type="range"
        min="13"
        max="40"
        value={fontSize}
        onChange={handleFontSizeChange}
        className="font-size-slider"
      />
      <div ref={ref}>
        <SyntaxHighlighter
          className="code-block"
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
