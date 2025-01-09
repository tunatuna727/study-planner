/** @type {import("prettier").Config} */
const config = {
  tabWidth: 2,
  printWidth: 100,
  trailingComma: "es5",
  semi: true,
  singleQuote: true,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["clsx", "cn"],
};

export default config;
