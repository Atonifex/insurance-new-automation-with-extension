const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const isWatch = process.argv.includes('--watch');

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Copy static files
const staticFiles = ['manifest.json', 'src/popup/popup.html', 'src/popup/popup.css'];
staticFiles.forEach((file) => {
  const src = path.join(__dirname, file);
  const destName = file.includes('/') ? path.basename(file) : file;
  const dest = path.join(__dirname, 'dist', destName);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${file} -> dist/${destName}`);
  }
});

// Build configuration
const buildOptions = {
  entryPoints: [
    'src/popup/popup.ts',
    'src/content/content.ts',
    'src/background.ts',
  ],
  bundle: true,
  outdir: 'dist',
  format: 'iife',
  target: 'chrome90',
  sourcemap: isWatch ? 'inline' : false,
  minify: !isWatch,
};

async function build() {
  try {
    if (isWatch) {
      const ctx = await esbuild.context(buildOptions);
      await ctx.watch();
      console.log('Watching for changes...');
    } else {
      await esbuild.build(buildOptions);
      console.log('Build complete!');
    }
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();

