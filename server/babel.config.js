export default {
  presets: [
    [
      "@babel/preset-env",
      { targets: { node: "current" } }
    ]
  ],
  plugins: ["babel-plugin-transform-import-meta"]
};
