module.exports = {
  extends: ["next", "turbo", "prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    // react
    "react/function-component-definition": "off",
    "import/prefer-default-export": "off",
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": 0,
    "react/no-array-index-key": "off",
    "react-hooks/exhaustive-deps": [
      "error",
      {
        enableDangerousAutofixThisMayCauseInfiniteLoops: true,
      },
    ],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
  },
};
