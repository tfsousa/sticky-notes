module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'pnpm tsc --noEmit',

  // Lint then format TypeScript and JavaScript files
  'src/**/*.(ts|tsx|js)': (filenames) => [
    `pnpm lint --fix ${filenames.join(' ')}`,
    `pnpm prettier --write ${filenames.join(' ')}`
  ],

  // Format MarkDown and JSON
  '**/*.(md|json)': (filenames) =>
    `pnpm prettier --write ${filenames.join(' ')}`,

  // Format SCSS files
  '**/*.(scss)': (filenames) => [`stylelint --fix ${filenames.join(' ')}`]
}
