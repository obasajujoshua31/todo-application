module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ]
  ],
  plugins: [
    "@babel/transform-runtime",
    "@babel/proposal-object-rest-spread",
    "@babel/plugin-proposal-class-properties"
  ]
};
