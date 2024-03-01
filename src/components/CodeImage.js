import { useState, useRef, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
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
  vscDarkPlus,
  xonokai,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
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
  xonokai,
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

export default function CodeImage({ code }) {
  const [selectedTheme, setSelectedTheme] = useState(vscDarkPlus);
  const [fontSize, setFontSize] = useState(16);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  const ref = useRef();

  useEffect(() => {
    const autoDetectLanguage = () => {

      const languageIdentifiers = {
        "javascript": ["import", "function", "const", "let", "var", "console", "console.log"],
        "python": ["import", "def", "class", "print"],
        "java": ["import", "public", "class", "System.out.println"],
        "ruby": ["require", "def", "class", "puts"],
        "csharp": ["using", "class", "public", "Console.WriteLine"],
        "php": ["<?php", "function", "class", "echo"],
        "go": ["package", "func", "var", "println"],
        "swift": ["import", "class", "func", "print"],
        "c": ["#include", "int", "void", "printf"],
        "c++": ["#include", "int", "void", "cout"],
        "haskell": ["module", "import", "data", "type", "where"],
        "scala": ["package", "import", "class", "def", "println"],
        "kotlin": ["package", "import", "fun", "class", "println"],
        "rust": ["use", "fn", "struct", "impl"],
        "html": ["<!DOCTYPE html>", "<html", "<head", "<body", "<h1", "<p"],
        "css": ["body", "margin", "padding", "font-size", "color"],
        "json": ["{", "}", "\"", ":"],
        "perl": ["use", "package", "sub", "print"],
        "shell": ["#!/bin/bash", "echo", "if", "then"],
        "matlab": ["function", "end", "plot", "for"],
        "r": ["library", "source", "sink", "transform"],
        "lua": ["function", "local", "if", "then"],
        "makefile": ["all:", "CC=", "CFLAGS=", "LDLIBS="],
        "markdown": ["#", "##", "###", "**", "*"],
        "objective-c": ["#import", "@interface", "@implementation", "NSObject"],
        "racket": ["#lang", "define", "if", "cond"],
        "sql": ["SELECT", "FROM", "WHERE", "GROUP BY", "HAVING"],
        "scss": ["@import", "$", "@mixin", "@media"],
        "typescript": ["import", "interface", "class", "let", "const"],
        "vbnet": ["Imports", "Public", "Class", "Console.WriteLine"],
        "xml": ["<?xml", "<root", "<child", "/>", ">"],
        "bash": ["#!/bin/bash", "echo", "if", "then"],
        "clojure": ["ns", "defn", "def", "if", "cond"],
        "coffeescript": ["import", "class", "if", "then"],
        "d": ["import", "module", "public", "void", "writeln"],
        "elixir": ["defmodule", "def", "defp", "IO.puts"],
        "erlang": ["-module", "-export", "io:format"],
        "fsharp": ["module", "let", "type", "printfn"],
        "groovy": ["import", "class", "def", "println"],
        "haxe": ["import", "class", "function", "trace"],
        "ini": ["[section]", "key=value"],
        "jade": ["doctype", "html", "head", "body", "h1", "p"],
        "less": ["@import", "@media", "body", "color"],
        "nim": ["import", "proc", "echo", "if", "then"],
        "ocaml": ["module", "type", "let", "print_endline"],
        "powershell": ["Import-Module", "function", "if", "then"],
        "python": ["from", "import", "def", "class", "print"],
        "r": ["library", "source", "sink", "transform"],
        "coffeescript": ["class", "if", "then", "console.log"],
        "dart": ["import", "class", "void", "print"],
      };


      for (const [language, identifiers] of Object.entries(languageIdentifiers)) {

        if (identifiers.some(identifier => code.includes(identifier))) {
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

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleFontSizeChange = (event) => {
    const newFontSize = parseInt(event.target.value);
    setFontSize(newFontSize);
    document.documentElement.style.setProperty(
      "--font-size",
      `${newFontSize}px`
    );
  };
  const downloadImage = async () => {
    if (!ref.current) {
      return;
    }

    const originalWidth = ref.current.style.width;
    const originalHeight = ref.current.style.height;
    const originalPadding = ref.current.style.padding;

    ref.current.style.width = "max-content";
    ref.current.style.height = "max-content";
    ref.current.style.padding = "10px";

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
        <div className="theme-select-div ">
          <select onChange={handleThemeChange} className="theme-selector">
            {Object.keys(themes).map((theme, index) => (
              <option key={index} value={theme}>
                {theme}
              </option>
            ))}
          </select>
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
        </div>
      </div>

      <div ref={ref}>
        <SyntaxHighlighter
          className="code-block"
          language={selectedLanguage}
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
