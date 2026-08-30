import { cp, copyFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const clientDir = path.join(root, 'dist', 'client');
const serverDir = path.join(root, 'dist', 'server');

if (!existsSync(clientDir) || !existsSync(serverDir)) {
  throw new Error('Run vinext build before preparing Cloudflare Pages output.');
}

await mkdir(clientDir, { recursive: true });
await copyFile(path.join(serverDir, 'index.js'), path.join(clientDir, 'index.js'));

const entriesToCopy = [
  '_next',
  'ssr',
  'BUILD_ID',
  '__vite_rsc_assets_manifest.js',
  'vinext-client-assets.js',
  'vinext-externals.json',
  'vinext-server.json',
];

for (const entry of entriesToCopy) {
  const source = path.join(serverDir, entry);
  if (!existsSync(source)) {
    continue;
  }

  await cp(source, path.join(clientDir, entry), {
    recursive: true,
    force: true,
  });
}

await cp(path.join(clientDir, '_next'), path.join(clientDir, 'assets', '_next'), {
  recursive: true,
  force: true,
});

await writeFile(
  path.join(clientDir, '_worker.js'),
  `import app from './index.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/_next/static/')) {
      url.pathname = '/assets' + url.pathname;
      return env.ASSETS.fetch(new Request(url, request));
    }

    return app.fetch(request, env, ctx);
  },
};
`,
);
