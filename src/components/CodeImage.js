import { useState, useRef, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import ReactGPicker from "react-gcolor-picker";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { toPng } from "html-to-image";
import * as clipboard from "clipboard-polyfill";

export default function CodeImage({ code, fileName }) {
  const [fontSize, setFontSize] = useState(16);
  const [margin, setMargin] = useState(20);
  const [boxShadow, setBoxShadow] = useState("");
  const [hasBoxShadow, setHasBoxShadow] = useState(true);
  const [watermark, setWatermark] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [gradientColor, setGradientColor] = useState(
    "linear-gradient(90deg, rgb(120, 115, 245) 0.00%,rgb(236, 119, 171) 100.00%)"
  );
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [settingsDropdown, setSettingsDropdown] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lineCount, setLineCount] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const ref = useRef();
  const colorPickerRef = useRef();
  const settingsMenuRef = useRef();

  const themes = {
    oneDark,
  };

  const supportedLanguages = [
    "1c",
    "abnf",
    "accesslog",
    "actionscript",
    "ada",
    "angelscript",
    "apache",
    "applescript",
    "arcade",
    "arduino",
    "armasm",
    "asciidoc",
    "aspectj",
    "autohotkey",
    "autoit",
    "avrasm",
    "awk",
    "axapta",
    "bash",
    "basic",
    "bnf",
    "brainfuck",
    "c-like",
    "c",
    "cal",
    "capnproto",
    "ceylon",
    "clean",
    "clojure-repl",
    "clojure",
    "cmake",
    "coffeescript",
    "coq",
    "cos",
    "cpp",
    "crmsh",
    "crystal",
    "csharp",
    "csp",
    "css",
    "d",
    "dart",
    "delphi",
    "diff",
    "django",
    "dns",
    "dockerfile",
    "dos",
    "dsconfig",
    "dts",
    "dust",
    "ebnf",
    "elixir",
    "elm",
    "erb",
    "erlang-repl",
    "erlang",
    "excel",
    "fix",
    "flix",
    "fortran",
    "fsharp",
    "gams",
    "gauss",
    "gcode",
    "gherkin",
    "glsl",
    "gml",
    "go",
    "golo",
    "gradle",
    "groovy",
    "haml",
    "handlebars",
    "haskell",
    "haxe",
    "hsp",
    "htmlbars",
    "http",
    "hy",
    "inform7",
    "ini",
    "irpf90",
    "isbl",
    "java",
    "javascript",
    "jboss-cli",
    "json",
    "julia-repl",
    "julia",
    "kotlin",
    "lasso",
    "latex",
    "ldif",
    "leaf",
    "less",
    "lisp",
    "livecodeserver",
    "livescript",
    "llvm",
    "lsl",
    "lua",
    "makefile",
    "markdown",
    "mathematica",
    "matlab",
    "maxima",
    "mel",
    "mercury",
    "mipsasm",
    "mizar",
    "mojolicious",
    "monkey",
    "moonscript",
    "n1ql",
    "nginx",
    "nim",
    "nix",
    "node-repl",
    "nsis",
    "objectivec",
    "ocaml",
    "openscad",
    "oxygene",
    "parser3",
    "perl",
    "pf",
    "pgsql",
    "php-template",
    "php",
    "plaintext",
    "pony",
    "powershell",
    "processing",
    "profile",
    "prolog",
    "properties",
    "protobuf",
    "puppet",
    "purebasic",
    "python-repl",
    "python",
    "q",
    "qml",
    "r",
    "reasonml",
    "rib",
    "roboconf",
    "routeros",
    "rsl",
    "ruby",
    "ruleslanguage",
    "rust",
    "sas",
    "scala",
    "scheme",
    "scilab",
    "scss",
    "shell",
    "smali",
    "smalltalk",
    "sml",
    "sqf",
    "sql",
    "sql_more",
    "stan",
    "stata",
    "step21",
    "stylus",
    "subunit",
    "swift",
    "taggerscript",
    "tap",
    "tcl",
    "thrift",
    "tp",
    "twig",
    "typescript",
    "vala",
    "vbnet",
    "vbscript-html",
    "vbscript",
    "verilog",
    "vhdl",
    "vim",
    "x86asm",
    "xl",
    "xml",
    "xquery",
    "yaml",
    "zephir",
  ];

  useEffect(() => {
    document.documentElement.style.setProperty("--margin-color", gradientColor);
    document.documentElement.style.setProperty("--margin-image", `${margin}px`);
    document.documentElement.style.setProperty(
      "--box-shadow",
      `0 20px 68px rgba(0, 0, 0, 0.55)`
    );
    setHasBoxShadow(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target)
      ) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        settingsMenuRef.current &&
        !settingsMenuRef.current.contains(event.target)
      ) {
        setSettingsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const autoDetectLanguage = () => {
      const languageIdentifiers = {
        javascript: [
          "import",
          "function",
          "const",
          "let",
          "var",
          "console",
          "console.log",
        ],
        python: ["import", "def", "class", "print"],
        java: ["import", "public", "class", "System.out.println"],
        ruby: ["require", "def", "class", "puts"],
        csharp: ["using", "class", "public", "Console.WriteLine"],
        php: ["<?php", "function", "class", "echo"],
        go: ["package", "func", "var", "println"],
        swift: ["import", "class", "func", "print"],
        c: ["#include", "int", "void", "printf"],
        "c++": ["#include", "int", "void", "cout"],
        haskell: ["module", "import", "data", "type", "where"],
        scala: ["package", "import", "class", "def", "println"],
        kotlin: ["package", "import", "fun", "class", "println"],
        rust: ["use", "fn", "struct", "impl"],
        html: ["<!DOCTYPE html>", "<html", "<head", "<body", "<h1", "<p"],
        css: ["body", "margin", "padding", "font-size", "color"],
        json: ["{", "}", '"', ":"],
        perl: ["use", "package", "sub", "print"],
        shell: ["#!/bin/bash", "echo", "if", "then"],
        matlab: ["function", "end", "plot", "for"],
        r: ["library", "source", "sink", "transform"],
        lua: ["function", "local", "if", "then"],
        makefile: ["all:", "CC=", "CFLAGS=", "LDLIBS="],
        markdown: ["#", "##", "###", "**", "*"],
        "objective-c": ["#import", "@interface", "@implementation", "NSObject"],
        racket: ["#lang", "define", "if", "cond"],
        sql: ["SELECT", "FROM", "WHERE", "GROUP BY", "HAVING"],
        scss: ["@import", "$", "@mixin", "@media"],
        typescript: ["import", "interface", "class", "let", "const"],
        vbnet: ["Imports", "Public", "Class", "Console.WriteLine"],
        xml: ["<?xml", "<root", "<child", "/>", ">"],
        bash: ["#!/bin/bash", "echo", "if", "then"],
        clojure: ["ns", "defn", "def", "if", "cond"],
        coffeescript: ["import", "class", "if", "then"],
        d: ["import", "module", "public", "void", "writeln"],
        elixir: ["defmodule", "def", "defp", "IO.puts"],
        erlang: ["-module", "-export", "io:format"],
        fsharp: ["module", "let", "type", "printfn"],
        groovy: ["import", "class", "def", "println"],
        haxe: ["import", "class", "function", "trace"],
        ini: ["[section]", "key=value"],
        jade: ["doctype", "html", "head", "body", "h1", "p"],
        less: ["@import", "@media", "body", "color"],
        nim: ["import", "proc", "echo", "if", "then"],
        ocaml: ["module", "type", "let", "print_endline"],
        powershell: ["Import-Module", "function", "if", "then"],
        python: ["from", "import", "def", "class", "print"],
        r: ["library", "source", "sink", "transform"],
        coffeescript: ["class", "if", "then", "console.log"],
        dart: ["import", "class", "void", "print"],
      };

      for (const [language, identifiers] of Object.entries(
        languageIdentifiers
      )) {
        if (identifiers.some((identifier) => code.includes(identifier))) {
          setSelectedLanguage(language);
          return;
        }
      }

      setSelectedLanguage("plaintext");
    };

    autoDetectLanguage();
  }, [code]);

  const handleThemeChange = (event) => {
    const themeName = event.target.value;
    setSelectedTheme(themes[themeName]);
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSettingsDropdown = () => {
    setSettingsDropdown(!settingsDropdown);
  };

  const handleMarginChange = (event) => {
    const newMargin = parseInt(event.target.value);
    setMargin(newMargin);
    document.documentElement.style.setProperty(
      "--margin-image",
      `${newMargin}px`
    );
  };

  const handleBoxShadowToggle = () => {
    setBoxShadow((prevState) => !prevState);
    setHasBoxShadow(!hasBoxShadow);
    const newBoxShadow = boxShadow ? "0 20px 68px rgba(0, 0, 0, 0.55)" : "";
    document.documentElement.style.setProperty("--box-shadow", newBoxShadow);
  };

  const handleWatermarkToggle = () => {
    setWatermark(!watermark);
  };

  const handleLineCountToggle = () => {
    setLineCount(!lineCount);
  };

  const handleFontSizeChange = (event) => {
    const newFontSize = parseInt(event.target.value);
    setFontSize(newFontSize);
    document.documentElement.style.setProperty(
      "--font-size",
      `${newFontSize}px`
    );
  };

  const onGradientColorChange = (value) => {
    setGradientColor(value);
    document.documentElement.style.setProperty("--margin-color", `${value}`);
  };

  const downloadImage = async () => {
    setIsProcessing(true);
    if (!ref.current) {
      return;
    }
    const originalWidth = ref.current.style.width;
    const originalHeight = ref.current.style.height;
    const originalPadding = ref.current.style.padding;
    const originalOverflow = ref.current.style.overflow;

    ref.current.style.width = "max-content";
    ref.current.style.height = "max-content";
    ref.current.style.padding = "10px 10px";
    ref.current.style.overflow = "hidden";

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
          ref.current.style.overflow = originalOverflow;
        })
        .catch((err) => {
          console.error("oops, something went wrong!", err);
        });
    }, 0);
    setIsProcessing(false);
  };

  const copyImage = async () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 5000);

    if (!ref.current) {
      return;
    }

    const originalWidth = ref.current.style.width;
    const originalHeight = ref.current.style.height;
    const originalPadding = ref.current.style.padding;
    const originalOverflow = ref.current.style.overflow;

    ref.current.style.width = "max-content";
    ref.current.style.height = "max-content";
    ref.current.style.padding = "10px 10px";
    ref.current.style.overflow = "hidden";

    setTimeout(() => {
      toPng(ref.current, { cacheBust: true })
        .then((dataUrl) => {
          fetch(dataUrl)
            .then((res) => res.blob())
            .then((blob) => {
              const item = new clipboard.ClipboardItem({ "image/png": blob });
              clipboard.write([item]);
            });

          ref.current.style.width = originalWidth;
          ref.current.style.height = originalHeight;
          ref.current.style.padding = originalPadding;
          ref.current.style.overflow = originalOverflow;
        })
        .catch((err) => {
          console.error("oops, something went wrong!", err);
        });
    }, 0);
  };

  return (
    <div className="code-image-div">
      <div className="code-image-config-options">
        <div className="theme-select-div ">
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="language-selector theme-selector"
          >
            {supportedLanguages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
          <div className="PB-range-slider-div">
            {" "}
            <small>Font Size</small>{" "}
            <input
              type="range"
              id="myRange"
              min="13"
              max="40"
              value={fontSize}
              onChange={handleFontSizeChange}
              className="font-size-slider PB-range-slider"
            />
          </div>
          <div className="PB-range-slider-div">
            {" "}
            <small>Margin</small>{" "}
            <input
              type="range"
              id="myRange"
              min="0"
              max="100"
              value={margin}
              onChange={handleMarginChange}
              className="font-size-slider PB-range-slider"
            />
          </div>
          <div className="color-picker">
            <div
              ref={colorPickerRef}
              style={{
                width: "50px",
                height: "50px",
                background: gradientColor,
                cursor: "pointer",
                borderRadius: "2px",
              }}
              onClick={toggleColorPicker}
            />
            {showColorPicker && (
              <div className="color-picker-menu" ref={colorPickerRef}>
                <ReactGPicker
                  gradient={true}
                  value={gradientColor}
                  onChange={onGradientColorChange}
                />
              </div>
            )}
          </div>
          <div className="settings-dropdown-menu">
            <div
              ref={settingsMenuRef}
              className="settings-dropdown-toggle"
              onClick={handleSettingsDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M10.825 22q-.675 0-1.162-.45t-.588-1.1L8.85 18.8q-.325-.125-.612-.3t-.563-.375l-1.55.65q-.625.275-1.25.05t-.975-.8l-1.175-2.05q-.35-.575-.2-1.225t.675-1.075l1.325-1Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337l-1.325-1Q2.675 9.9 2.525 9.25t.2-1.225L3.9 5.975q.35-.575.975-.8t1.25.05l1.55.65q.275-.2.575-.375t.6-.3l.225-1.65q.1-.65.588-1.1T10.825 2h2.35q.675 0 1.163.45t.587 1.1l.225 1.65q.325.125.613.3t.562.375l1.55-.65q.625-.275 1.25-.05t.975.8l1.175 2.05q.35.575.2 1.225t-.675 1.075l-1.325 1q.025.175.025.338v.674q0 .163-.05.338l1.325 1q.525.425.675 1.075t-.2 1.225l-1.2 2.05q-.35.575-.975.8t-1.25-.05l-1.5-.65q-.275.2-.575.375t-.6.3l-.225 1.65q-.1.65-.587 1.1t-1.163.45zm1.225-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.013 2.475T12.05 15.5"
                />
              </svg>
            </div>
            {settingsDropdown && (
              <div
                className="settings-dropdown-menu-content"
                ref={settingsMenuRef}
              >
                <label>
                  <input
                    type="checkbox"
                    onClick={handleBoxShadowToggle}
                    checked={hasBoxShadow}
                  />
                  box shadow
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={watermark}
                    onClick={handleWatermarkToggle}
                  />{" "}
                  watermark
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={lineCount}
                    onClick={handleLineCountToggle}
                  />{" "}
                  line count
                </label>
              </div>
            )}
          </div>
          <div className="settings-dropdown-menu">
            <div className="settings-dropdown-toggle" onClick={downloadImage}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="29"
                  height="29"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-8 4v-5h2v3h12v-3h2v5z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="settings-dropdown-menu">
            <div className="settings-dropdown-toggle" onClick={copyImage}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="29"
                  height="29"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm0-2h9V4H9zm-4 6q-.825 0-1.412-.587T3 20V6h2v14h11v2zm4-6V4z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="code-image-background" ref={ref}>
        <div className="code-image-main-div">
          {fileName ? (
            <div className="file-name-div">
              <SyntaxHighlighter
                className="file-name"
                language="plaintext"
                style={oneDark}
              >
                {fileName}
              </SyntaxHighlighter>
              <div className="interaction-buttons">
                <div className="gray_circle"></div>
                <div className="gray_circle"></div>
                <div className="gray_circle"></div>
              </div>
            </div>
          ) : (
            <div className="file-name-div">
              <SyntaxHighlighter
                className="file-name"
                language="plaintext"
                style={oneDark}
              >
                &nbsp;
              </SyntaxHighlighter>
              <div className="interaction-buttons">
                <div className="gray_circle"></div>
                <div className="gray_circle"></div>
                <div className="gray_circle"></div>
              </div>
            </div>
          )}
          <SyntaxHighlighter
            className="code-block"
            language={selectedLanguage}
            style={oneDark}
            showLineNumbers={lineCount}
          >
            {code}
          </SyntaxHighlighter>
          <div className="watermark-content">
            {watermark && <p>snippix.netlify.app</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
