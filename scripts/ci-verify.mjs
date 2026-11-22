import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';

const root = resolve(import.meta.dirname, '..');
const require = createRequire(import.meta.url);
const supplied = process.env.MAKEFUN_ENV ? JSON.parse(readFileSync(process.env.MAKEFUN_ENV, 'utf8')) : null;
const modulePath = supplied?.playwright_module ?? require.resolve('playwright');
const {chromium} = require(modulePath);
const chrome = supplied?.chrome_executable ?? chromium.executablePath();
const hash = b => createHash('sha256').update(b).digest('hex');
const artifacts = join(root, '.local', 'ci-artifacts');
mkdirSync(artifacts, {recursive:true});
const temp = mkdtempSync(join(tmpdir(), 'news-remote-'));
const original = readFileSync(join(root, 'art', 'edition.jpg'));
const report = {passed:false, node:process.version, platform:process.platform, shippedSha256:hash(original)};
const run = (file, env) => {
  const result = spawnSync(process.execPath, [file], {cwd:temp, env:{...process.env, ...env}, encoding:'utf8', timeout:180000});
  assert.equal(result.status, 0, result.stderr || result.error?.message || result.stdout);
  return result.stdout;
};

try {
  assert.ok(existsSync(chrome), 'Install Chromium with npx playwright install chromium');
  assert.ok(original.length > 0 && original.length <= 1048576, 'Shipped size limit');
  assert.equal(original.subarray(0,3).toString('hex'), 'ffd8ff');
  assert.equal(original.subarray(-2).toString('hex'), 'ffd9');
  for (const directory of ['art','tests']) mkdirSync(join(temp,directory));
  for (const file of ['main.ts','art/render.mjs','tests/acceptance.mjs']) copyFileSync(join(root,file),join(temp,file));
  copyFileSync(join(root,'art/edition.jpg'),join(temp,'art/edition.jpg'));
  const config = join(temp,'environment.json');
  writeFileSync(config,JSON.stringify({playwright_module:modulePath,chrome_executable:chrome}));
  const env = {MAKEFUN_ENV:config};
  const outputs = [];
  for (const name of ['first','second']) {
    const directory = join(temp,name);
    run(join(temp,'main.ts'),{...env,MAKEFUN_OUTPUT_DIR:directory});
    assert.deepEqual(readdirSync(directory),['entry.png']);
    outputs.push(readFileSync(join(directory,'entry.png')));
  }
  assert.ok(outputs.every(b=>b.equals(original)), 'Runtime must emit exact committed bytes');
  const browser = await chromium.launch({executablePath:chrome,headless:true});
  try {
    const page = await browser.newPage();
    const requests=[];
    await page.route('**/*',route=>{requests.push(route.request().url());return route.abort();});
    const dimensions = await page.evaluate(async base64=>{
      const bytes=Uint8Array.from(atob(base64),c=>c.charCodeAt(0));
      const bitmap=await createImageBitmap(new Blob([bytes],{type:'image/jpeg'}));
      const canvas=document.createElement('canvas'); canvas.width=bitmap.width; canvas.height=bitmap.height;
      const ctx=canvas.getContext('2d');ctx.drawImage(bitmap,0,0);ctx.getImageData(0,0,canvas.width,canvas.height);
      return {width:bitmap.width,height:bitmap.height};
    },original.toString('base64'));
    assert.deepEqual(dimensions,{width:1024,height:1024});
    assert.deepEqual(requests,[]);
    report.shippedDecode=dimensions;
    report.runtimeExactBytes=true;
  } finally {await browser.close();}
  copyFileSync(join(root,'art/edition.jpg'),join(artifacts,'committed-entry.jpg'));
  run(join(temp,'art/render.mjs'),env);
  const rebuilt=readFileSync(join(temp,'art/edition.jpg'));
  report.rebuiltSha256=hash(rebuilt);
  report.rebuildMatchesCommitted=rebuilt.equals(original);
  // The unchanged acceptance suite runs on a fresh artifact made with this OS's fonts/browser.
  // It still checks a second rebuild, output bytes, offline rendering, bounds and full decode.
  report.acceptance=JSON.parse(run(join(temp,'tests/acceptance.mjs'),env).trim());
  copyFileSync(join(temp,'art/edition.jpg'),join(artifacts,'rebuilt-entry.jpg'));
  assert.ok(readFileSync(join(root,'art/edition.jpg')).equals(original),'CI must preserve committed artwork');
  report.passed=true;
} finally {
  writeFileSync(join(artifacts,'report.json'),JSON.stringify(report,null,2)+'\n');
  rmSync(temp,{recursive:true,force:true});
}
console.log(JSON.stringify(report,null,2));
