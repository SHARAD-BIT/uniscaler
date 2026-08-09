/**
 * A narrow lint pass for identifiers that only exist as browser globals.
 *
 *   npx eslint --config eslint.ssr.mjs src
 *
 * `<Content name={name} />` in DashboardUser referenced an undeclared `name`.
 * In a browser that silently resolves to the `window.name` global; on the
 * server it throws and kills the render. `no-undef` catches the whole class,
 * so `globals.browser` is deliberately NOT included here.
 */
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";

export default [
  {
    files: ["src/**/*.{js,jsx}"],
    // Loaded with no rules enabled, purely so the inline
    // `eslint-disable react/prop-types` comments in the source resolve.
    plugins: { react },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        ...globals.node,
        // Explicitly allowed browser APIs. Anything not listed that resolves
        // only via `window` is what this pass is meant to surface.
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        navigator: "readonly",
        fetch: "readonly",
        FormData: "readonly",
        Blob: "readonly",
        File: "readonly",
        FileReader: "readonly",
        AbortController: "readonly",
        Image: "readonly",
        alert: "readonly",
        confirm: "readonly",
        prompt: "readonly",
        atob: "readonly",
        btoa: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
        IntersectionObserver: "readonly",
        ResizeObserver: "readonly",
        MutationObserver: "readonly",
        getComputedStyle: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      // Only this rule matters for the SSR question; silence the rest so the
      // signal is not buried in style noise.
      "no-undef": "error",
      "no-unused-vars": "off",
      "no-empty": "off",
      "no-prototype-builtins": "off",
      "no-useless-escape": "off",
      "no-constant-binary-expression": "off",
      "no-irregular-whitespace": "off",
      "no-cond-assign": "off",
      "no-fallthrough": "off",
      "no-control-regex": "off",
      "no-misleading-character-class": "off",
      "no-sparse-arrays": "off",
    },
  },
];
