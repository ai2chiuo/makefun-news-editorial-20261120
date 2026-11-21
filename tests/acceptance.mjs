import assert from 'node:assert/strict';
import {mkdtempSync,readFileSync,readdirSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
const root=resolve(import.meta.dirname,'..');
const temp=mkdtempSync(join(tmpdir(),'news-accept-'));
const env=JSON.parse(readFileSync(process.env.MAKEFUN_ENV ?? 'D:/codex/tools/makefun-other-build/environment.json','utf8'));
const {chromium}=createRequire(import.meta.url)(env.playwright_module);
try {
  const outputs=[];
  for(const name of ['one','two']){
    const out=join(temp,name);
    const run=spawnSync(process.execPath,[join(root,'main.ts')],{cwd:root,env:{...process.env,MAKEFUN_OUTPUT_DIR:out},encoding:'utf8'});
    assert.equal(run.status,0,run.stderr);
    assert.deepEqual(readdirSync(out),['entry.png']);
    outputs.push(readFileSync(join(out,'entry.png')));
  }
  assert.ok(outputs[0].equals(outputs[1]),'Two runs must be byte identical');
  assert.ok(outputs[0].equals(readFileSync(join(root,'art/edition.jpg'))));
  const b=outputs[0]; assert.ok(b.length>0&&b.length<=1048576,'Byte limit');
  assert.equal(b.subarray(0,3).toString('hex'),'ffd8ff','JPEG signature');
  assert.equal(b.subarray(-2).toString('hex'),'ffd9','Valid JPEG end marker');
  const browser=await chromium.launch({executablePath:env.chrome_executable,headless:true});
  try{
    const page=await browser.newPage({viewport:{width:1024,height:1024},deviceScaleFactor:1});
    const external=[];
    await page.route('**/*',r=>{if(!r.request().url().startsWith('file:')){external.push(r.request().url());return r.abort();}return r.continue();});
    await page.goto(pathToFileURL(join(root,'art/edition.svg')).href);
    const textBounds=await page.evaluate(()=>Array.from(document.querySelectorAll('text')).map(t=>{const b=t.getBBox();const r=t.getBoundingClientRect();return {text:t.textContent,x:r.x,y:r.y,right:r.right,bottom:r.bottom};}));
    for(const t of textBounds){assert.ok(t.x>=0&&t.y>=0&&t.right<=1024&&t.bottom<=1024,'Text outside image: '+t.text);}
    assert.ok(textBounds.some(t=>t.text==='20 NOV 2026'),'Dateline must be printed');
    const rendered=await page.screenshot({type:'jpeg',quality:94});
    assert.deepEqual(external,[],'Artwork must request no external resources');
    assert.ok(rendered.equals(b),'Offline SVG render must equal shipped image');
    const decoded=await page.evaluate(async data=>{
      const bytes=Uint8Array.from(atob(data),c=>c.charCodeAt(0));
      const bitmap=await createImageBitmap(new Blob([bytes],{type:'image/jpeg'}));
      const c=document.createElementNS('http://www.w3.org/1999/xhtml','canvas'); c.width=bitmap.width;c.height=bitmap.height;
      const ctx=c.getContext('2d');ctx.drawImage(bitmap,0,0);ctx.getImageData(0,0,c.width,c.height);
      return {width:bitmap.width,height:bitmap.height};
    },b.toString('base64'));
    assert.ok(decoded.width>0&&decoded.width<=1024);assert.ok(decoded.height>0&&decoded.height<=1024);
    assert.deepEqual(decoded,{width:1024,height:1024});
    console.log(JSON.stringify({passed:true,format:'JPEG',bytes:b.length,...decoded,deterministic:true,artifact:'output/entry.png'}));
  }finally{await browser.close();}
}finally{rmSync(temp,{recursive:true,force:true});}
