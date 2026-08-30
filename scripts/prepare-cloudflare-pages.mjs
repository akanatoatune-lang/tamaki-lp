import { cp, copyFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const clientDir = path.join(root, 'dist', 'client');
const serverDir = path.join(root, 'dist', 'server');

if (!existsSync(clientDir) || !existsSync(serverDir)) {
  throw new Error('Run vinext build before preparing Cloudflare Pages output.');
}

await mkdir(clientDir, { recursive: true });
await copyFile(path.join(serverDir, 'index.js'), path.join(clientDir, '_worker.js'));
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
