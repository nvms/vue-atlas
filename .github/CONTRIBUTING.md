# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with me, nvms, before submitting your changes or additions.

## Issue Reporting Guidelines

- Follow the issue reporting template, otherwise the issue will be closed.

## Pull Request Guidelines

- Work in the `src` and `tests` folders and **do not** checkin `dist` in the commits.
- Make sure `yarn test:unit` passes.
- If you are adding a new feature:
  - Please try to add accompanying test case(s).
  - Provide a **convincing reason** to add this feature. You are encouraged to open a suggestion issue first and have it approved beforehand.
- If you are fixing a bug:
  - Provide a detailed description of the bug in the PR. You are encouraged to open a bug report issue ahead of time.

## Development Setup

Clone the repository and run:

```bash
$ npm install # or yarn
```

Start the development server:

```bash
$ npm run serve # or yarn
```

This project is built in VSCode. If you are going to use VSCode as well,
it is encouraged to:

- Install Vetur
- Install [Sass](https://marketplace.visualstudio.com/items?itemName=robinbentley.sass-indented) for syntax highlighting
- Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Modify your editor settings to include the following configuration rules:

```json
{
  "eslint.validate": [
        {
            "language": "vue",
            "autoFix": true
        },
        {
            "language": "javascript",
            "autoFix": true
        },
    ],
    "eslint.autoFixOnSave": true,
    "vetur.format.defaultFormatter.html": "prettyhtml",
    "vetur.format.defaultFormatter.css": "prettier",
    "vetur.format.defaultFormatter.postcss": "prettier",
    "vetur.format.defaultFormatter.scss": "prettier",
    "vetur.format.defaultFormatter.less": "prettier",
    "vetur.format.defaultFormatter.js": "prettier",
    "vetur.format.defaultFormatter.ts": "prettier",
    "vetur.format.options.tabSize": 2,
    "vetur.format.options.useTabs": false,
    "vetur.format.defaultFormatterOptions": {
        "prettyhtml": {
          "printWidth": 80, // No line exceeds 80 characters
          "singleQuote": false
        },
        "prettier": {
            "eslintIntegration": true,
            "singleQuote": true
        }
      }
}
```