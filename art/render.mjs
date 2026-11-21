import {createRequire} from 'node:module';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const require=createRequire(import.meta.url);
const env=JSON.parse(readFileSync(process.env.MAKEFUN_ENV ?? 'D:/codex/tools/makefun-other-build/environment.json','utf8'));
const {chromium}=require(env.playwright_module);
const ink='#172e32', cream='#f2e8d2', red='#c7462f', teal='#367e7c';
let seed=2041; const rand=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);
let grain='';for(let i=0;i<15500;i++){const x=rand()*1024,y=rand()*1024;grain+=`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${(.2+rand()*.65).toFixed(2)}" fill="${ink}" opacity="${(.03+rand()*.08).toFixed(2)}"/>`;}
const text=(x,y,s,t,fill=ink,extra='')=>`<text x="${x}" y="${y}" font-size="${s}" fill="${fill}" ${extra}>${t}</text>`;
let pins='';for(let i=0;i<7;i++){let p=287+i*19;pins+=`<path d="M${p} 400v-22 M${p} 526v22 M264 ${410+i*17}h-22 M436 ${410+i*17}h22"/>`;}
let grid='';for(let i=-2;i<=2;i++)grid+=`<ellipse cx="530" cy="507" rx="${Math.abs(i)*66+44}" ry="272"/><ellipse cx="530" cy="${507+i*72}" rx="286" ry="${35+Math.abs(i)*13}"/>`;
let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
<defs><clipPath id="world"><circle cx="530" cy="507" r="282"/></clipPath><pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 8L8 0" stroke="${ink}" stroke-width="1" opacity=".22"/></pattern></defs>
<rect width="1024" height="1024" fill="${cream}"/>
<g font-family="Arial, sans-serif">
${text(44,49,15,'THE WORLD / A DAILY EDITORIAL',ink,'letter-spacing="3"')}
${text(980,49,19,'20 NOV 2026',ink,'text-anchor="end" font-weight="bold" letter-spacing="2"')}
<path d="M44 66H980" stroke="${ink}" stroke-width="2"/>
${text(42,151,87,'A world in the balance',ink,'font-family="Georgia,serif" letter-spacing="-4"')}
${text(46,186,16,'MARKETS  /  DIPLOMACY  /  CLIMATE  /  THE RIGHT TO PLAY',ink,'letter-spacing="2.1"')}
<circle cx="530" cy="507" r="284" fill="${teal}"/>
<g clip-path="url(#world)" fill="none" stroke="${cream}" stroke-width="1.5" opacity=".35" transform="rotate(-18 530 507)">${grid}</g>
<path d="M397 255l46 13 21 32-20 29 24 24-29 49-53 9-25 44-31-20-1-58-38-18 28-51z M483 438l61 16 26 47-12 52-31 25-8 74-27 40-21-81-32-39 13-62-24-39z M569 291l78-21 74 47 48 55-49 24-35-30-18 37-54-11-14 37-47-32 11-48-30-17z" fill="${cream}" opacity=".65"/>
<circle cx="530" cy="507" r="282" fill="url(#hatch)"/>
<!-- The shared horizon is a visual structure, not a causal arrow. -->
<path d="M71 704Q487 570 946 691L925 737Q510 630 92 751Z" fill="${ink}"/>
<path d="M96 716Q518 597 927 703" fill="none" stroke="${cream}" stroke-width="2"/>
<!-- Semiconductor and broken market trace -->
<g stroke="${ink}" stroke-width="5">${pins}<rect x="264" y="400" width="172" height="126" fill="${ink}"/><rect x="280" y="416" width="140" height="94" fill="${cream}"/></g>
${text(370,451,32,'AI',ink,'text-anchor="middle" font-weight="bold"')}
<path d="M76 346l65 28 42-20 51 61 42-10 54 67 36-14 67 96" fill="none" stroke="${cream}" stroke-width="18"/>
<path d="M76 346l65 28 42-20 51 61 42-10 54 67 36-14 67 96" fill="none" stroke="${red}" stroke-width="10"/>
<path d="M400 536l35 20-2-40" fill="${red}"/>
${text(57,271,23,'AI STOCKS SELL OFF',ink,'font-weight="bold"')}
${text(57,307,29,'S&amp;P 500 −3.7%',red,'font-family="Georgia,serif"')}
<!-- An empty negotiating table: talks, not a signed pact -->
<path d="M570 332v-35h31v35 M652 332v-35h31v35 M734 332v-35h31v35" fill="${ink}" stroke="${cream}" stroke-width="3"/>
<ellipse cx="669" cy="351" rx="132" ry="28" fill="${ink}" stroke="${cream}" stroke-width="4"/>
<path d="M587 365l-12 61 M751 365l12 61" stroke="${ink}" stroke-width="9"/>
<g fill="none" stroke="${cream}" stroke-width="2"><ellipse cx="669" cy="349" rx="20" ry="7"/><ellipse cx="669" cy="349" rx="20" ry="7" transform="rotate(60 669 349)"/><ellipse cx="669" cy="349" rx="20" ry="7" transform="rotate(-60 669 349)"/></g>
${text(964,243,23,'NUCLEAR DIPLOMACY',ink,'text-anchor="end" font-weight="bold"')}
${text(964,272,18,'US · CHINA · RUSSIA: TALKS',ink,'text-anchor="end"')}
<!-- Unsettled climate language: open pages, not signatures -->
<path d="M692 449l88-16 78 23-5 127-76-20-84 16z" fill="${cream}" stroke="${ink}" stroke-width="4"/>
<path d="M780 438l-3 125 M709 472l50-8 M710 487l49-8 M799 481l41 11 M799 498l41 11" stroke="${ink}" stroke-width="3"/>
<path d="M726 554v-37h17v37 M749 550v-49h16v49" fill="${ink}"/>
<path d="M813 549q-20-29 14-44q11 26-14 44" fill="${teal}"/>
<path d="M723 585H980V650H746Z" fill="${cream}"/>
${text(962,605,25,'COP31 / ANTALYA',ink,'text-anchor="end" font-weight="bold"')}
${text(962,628,18,'Fossil-fuel language &amp;',ink,'text-anchor="end"')}
${text(962,649,18,'climate finance disputed',ink,'text-anchor="end"')}
<!-- A small, dignified play space opens out of the world stage. -->
<path d="M217 762L647 716 819 831 345 888Z" fill="${red}"/>
<path d="M270 776l360-37 133 86-402 44z" fill="none" stroke="${cream}" stroke-width="2"/>
<path d="M393 802l169-17-63-38 M425 845l-32-43 77-8 30 43 M470 794l29-47" fill="none" stroke="${cream}" stroke-width="3"/>
<g stroke="${ink}" stroke-width="12" stroke-linecap="round" fill="none"><path d="M367 741l-9 45-30 35 M359 783l25 38 M363 756l-26-12 M366 759l29-16"/><path d="M612 735l13 44-15 37 M625 777l31 25 M617 750l-24-12 M618 751l23-26"/></g>
<g fill="${ink}"><circle cx="369" cy="721" r="13"/><circle cx="607" cy="715" r="13"/></g>
<circle cx="552" cy="817" r="16" fill="${cream}" stroke="${ink}" stroke-width="3"/><path d="M540 812l12-8 12 9-5 12h-14z" fill="${teal}"/>
${text(47,864,20,'GAZA',ink,'font-weight="bold" letter-spacing="3"')}
${text(47,900,34,'Back to Play',ink,'font-family="Georgia,serif"')}
${text(979,881,17,'UNICEF LAUNCH',ink,'text-anchor="end" letter-spacing="2"')}
${text(979,907,17,'WORLD CHILDREN’S DAY',ink,'text-anchor="end" letter-spacing="1"')}
<path d="M44 936H980" stroke="${ink}" stroke-width="2"/>
${text(44,970,17,'POWER. PROMISES. ROOM TO PLAY.',ink,'letter-spacing="3"')}
${text(980,970,14,'WORLD NEWS / 20.11.2026',ink,'text-anchor="end" letter-spacing="1"')}
</g><g>${grain}</g></svg>`;
mkdirSync('art',{recursive:true});mkdirSync('.local',{recursive:true});
writeFileSync('art/edition.svg',svg);
const browser=await chromium.launch({executablePath:env.chrome_executable,headless:true});
const page=await browser.newPage({viewport:{width:1024,height:1024},deviceScaleFactor:1});
let external=[];await page.route('**/*',r=>{if(!r.request().url().startsWith('file:')){external.push(r.request().url());return r.abort();}return r.continue();});
await page.goto(pathToFileURL(process.cwd()+'/art/edition.svg').href);
await page.screenshot({path:'art/edition.jpg',type:'jpeg',quality:94});
await browser.close();if(external.length)throw Error('External resources: '+external.join(','));
console.log('Rendered offline SVG with local Chrome to art/edition.jpg');
