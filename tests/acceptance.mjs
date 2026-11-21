import assert from 'node:assert/strict';
import {mkdtempSync,readFileSync,readdirSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {createRequire} from 'node:module';
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
    const page=await browser.newPage();
    await page.route('**/*',r=>r.abort());
    const decoded=await page.evaluate(async data=>{
      const bytes=Uint8Array.from(atob(data),c=>c.charCodeAt(0));
      const bitmap=await createImageBitmap(new Blob([bytes],{type:'image/jpeg'}));
      const c=document.createElement('canvas'); c.width=bitmap.width;c.height=bitmap.height;
      const ctx=c.getContext('2d');ctx.drawImage(bitmap,0,0);ctx.getImageData(0,0,c.width,c.height);
      return {width:bitmap.width,height:bitmap.height};
    },b.toString('base64'));
    assert.ok(decoded.width>0&&decoded.width<=1024);assert.ok(decoded.height>0&&decoded.height<=1024);
    assert.deepEqual(decoded,{width:1024,height:1024});
    console.log(JSON.stringify({passed:true,format:'JPEG',bytes:b.length,...decoded,deterministic:true,artifact:'output/entry.png'}));
  }finally{await browser.close();}
}finally{rmSync(temp,{recursive:true,force:true});}
