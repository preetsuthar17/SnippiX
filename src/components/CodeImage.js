import { useState, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark, atomDark, base16AteliersulphurpoolLight, cb, coldarkCold, coldarkDark, coy, dracula, dark, duotoneDark, duotoneEarth, duotoneForest, duotoneLight, duotoneSea, duotoneSpace, funky, ghcolors, hopscotch, materialDark, materialLight, materialOceanic, nightOwl, nord, okaidia, oneDark, oneLight, pojoaque, prism, shadesOfPurple, solarizedlight, synthwave84, tomorrow, twilight, vs, vsDark, vscDarkPlus, xonokai } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { toPng } from "html-to-image";

const themes = {
  vscDarkPlus,
  a11yDark,
  atomDark,
  base16AteliersulphurpoolLight,
  cb,
  coldarkCold,
  coldarkDark,
  coy,
  dracula,
  dark,
  duotoneDark,
  duotoneEarth,
  duotoneForest,
  duotoneLight,
  duotoneSea,
  duotoneSpace,
  funky,
  ghcolors,
  hopscotch,
  materialDark,
  materialLight,
  materialOceanic,
  nightOwl,
  nord,
  okaidia,
  oneDark,
  oneLight,
  pojoaque,
  prism,
  shadesOfPurple,
  solarizedlight,
  synthwave84,
  tomorrow,
  twilight,
  vs,
  vsDark,
  xonokai
};

export default function CodeImage({ code }) {
  const [selectedTheme, setSelectedTheme] = useState(vscDarkPlus);
  const [fontSize, setFontSize] = useState(16);
  const ref = useRef();

  const handleThemeChange = (event) => {
    const themeName = event.target.value;
    setSelectedTheme(themes[themeName]);
  };

  const handleFontSizeChange = (event) => {
    const newFontSize = parseInt(event.target.value);
    setFontSize(newFontSize);
    document.documentElement.style.setProperty("--font-size", `${newFontSize}px`);
  };
  const downloadImage = async () => {
    if (!ref.current) { return; }


    const originalWidth = ref.current.style.width;
    const originalHeight = ref.current.style.height;
    const originalPadding = ref.current.style.padding;

    ref.current.style.width = "max-content";
    ref.current.style.height = "max-content";
    ref.current.style.padding = '10px'

    setTimeout(() => {
      toPng(ref.current, { cacheBust: true })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "code-image.png";
          link.href = dataUrl;
          link.click();

          ref.current.style.width = originalWidth;
          ref.current.style.height = originalHeight;
          ref.current.style.padding = originalPadding;
        })
        .catch((err) => {
          console.error("oops, something went wrong!", err);
        });
    }, 0);
  };
  return (
    <div className="code-image-div">
      <div className="code-image-config-options">
        <div className="theme-select-div">
          <select onChange={handleThemeChange} className="theme-selector">
            {Object.keys(themes).map((theme, index) => (
              <option key={index} value={theme}>{theme}</option>
            ))}
          </select>
        </div>
        <div className="PB-range-slider-div"> <small>Font Size</small> <input type="range" id="myRange" min="13" max="40" value={fontSize} onChange={handleFontSizeChange} className="font-size-slider PB-range-slider" />
        </div>
      </div>

      <div ref={ref}>
        <SyntaxHighlighter
          className="code-block"
          language="javascript"
          style={selectedTheme}
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