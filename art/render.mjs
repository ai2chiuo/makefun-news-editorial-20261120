import {createRequire} from 'node:module';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const env=JSON.parse(readFileSync(process.env.MAKEFUN_ENV ?? 'D:/codex/tools/makefun-other-build/environment.json','utf8'));
const {chromium}=createRequire(import.meta.url)(env.playwright_module);
const I='#172e32', C='#f2e8d2', R='#c7462f', T='#367e7c';
const text=(x,y,size,value,fill=I,extra='')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" ${extra}>${value}</text>`;
const headline=(x,y,size,value,fill=I)=>text(x,y,size,value,fill,'font-weight="700"');
const path=(d,fill=I,extra='')=>`<path d="${d}" fill="${fill}" ${extra}/>`;
let seed=20261120;
const rand=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
let grain='';
for(let i=0;i<16000;i++)grain+=`<circle cx="${(rand()*1024).toFixed(2)}" cy="${(rand()*1024).toFixed(2)}" r="${(.2+rand()*.6).toFixed(2)}" opacity="${(.025+rand()*.07).toFixed(2)}"/>`;
let globeGrid='';
for(let i=0;i<5;i++)globeGrid+=`<ellipse cx="516" cy="541" rx="${48+i*64}" ry="326"/><ellipse cx="516" cy="${345+i*96}" rx="329" ry="${31+i*9}"/>`;
let chipPins='';
for(let i=0;i<7;i++)chipPins+=path(`M${173+i*22} 295v-17 M${173+i*22} 409v17 M158 ${305+i*15}h-18 M326 ${305+i*15}h18`,'none',`stroke="${I}" stroke-width="5"`);
const diplomat=(x,hair)=>`<g transform="translate(${x} 0)">
${path('M-25 340l6-30 19-9 19 9 6 30',I)}
<ellipse cx="0" cy="287" rx="14" ry="19" fill="${C}" stroke="${I}" stroke-width="2"/>
${path(hair,I)}${path('M-10 310l10 15 10-15-10 5z',C)}${path('M0 319l-4 15h8z',R)}
</g>`;
const bridge=(x,y,w,broken=false)=>`<g transform="translate(${x} ${y})">
${path(`M0 0H${w}V10H0Z`,C)}
${path(`M12 8v25 M${w-12} 8v25 M${w/2} 8v25`,'none',`stroke="${C}" stroke-width="7"`)}
${path(`M0-2Q${w/2}-50 ${w}-2 M${w/2}-26V0`,'none',`stroke="${C}" stroke-width="2"`)}
${broken?path(`M${w*.52}-13l-10 16 15 9-12 17`, 'none',`stroke="${R}" stroke-width="9"`):''}
</g>`;
let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
<defs>
<clipPath id="globe"><circle cx="516" cy="541" r="329"/></clipPath>
<pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M0 7L7 0" stroke="${I}" stroke-width=".7" opacity=".18"/></pattern>
</defs>
<rect width="1024" height="1024" fill="${C}"/>
<g font-family="Arial,sans-serif">
${text(43,45,15,'THE WORLD / FRIDAY EDITION',I,'letter-spacing="2"')}
${headline(620,48,29,'20 NOV 2026')}
${path('M43 65H981','none',`stroke="${I}" stroke-width="2"`)}
${text(40,150,88,'FAULT LINES',I,'font-family="Georgia,serif" letter-spacing="-3"')}
${text(650,145,48,'&amp; lifelines',I,'font-family="Georgia,serif" font-style="italic" letter-spacing="-2"')}
${text(44,180,14,'SIX DISPATCHES FROM ONE DAY',I,'letter-spacing="3.4"')}
${text(979,180,14,'20 NOVEMBER 2026',I,'text-anchor="end" letter-spacing="2"')}
<!-- One shared world, not six framed panels. Grid and ribbon are editorial structure only. -->
<circle cx="516" cy="541" r="329" fill="${T}"/>
<g clip-path="url(#globe)" transform="rotate(-18 516 541)" fill="none" stroke="${C}" stroke-width="1" opacity=".38">${globeGrid}</g>
${path('M306 291l72-19 53 33-24 45 25 22-35 53-46 8-36 53-30-40-10-62-34-22z M425 460l62 3 39 47-20 44-31 39-10 74-32 33-8-74-39-48 13-65z M540 280l74-13 92 39 58 53-31 32-40-20-25 38-54-19-27 40-45-28 15-47-38-32z',C,'opacity=".64"')}
<circle cx="516" cy="541" r="329" fill="url(#hatch)"/>
<!-- Markets: a falling schematic trace, not a literal intraday price chart. -->
${headline(44,226,25,'AI selloff hits Wall Street')}
${text(44,258,30,'S&amp;P 500 falls 3.7%',R,'font-family="Georgia,serif"')}
<g>${chipPins}<rect x="158" y="295" width="168" height="114" fill="${I}"/><rect x="174" y="311" width="136" height="82" fill="${C}"/>
${headline(261,342,28,'AI')}</g>
${path('M48 293l45 16 27-13 42 47 31-8 48 42 27-13 76 67','none',`stroke="${C}" stroke-width="16"`)}
${path('M48 293l45 16 27-13 42 47 31-8 48 42 27-13 76 67','none',`stroke="${R}" stroke-width="8"`)}
${path('M325 421l22 12-3-30',R)}
<!-- Diplomacy: retrospective symbolic figures, not a new summit or signed deal. -->
<path d="M573 207H982V271H573Z" fill="${C}"/>
${headline(586,226,25,'Trump / Xi / Putin')}
${text(586,251,20,'AP: nuclear talks agreed')}
${text(586,273,16,"After the leaders' meeting")}
<g transform="translate(0 18)">
${diplomat(636,'M-15 282q-6-20 14-19l20 7-9 8-16-2z')}
${diplomat(741,'M-15 283q-3-23 18-20 17 2 12 22l-7-11-17 1z')}
${diplomat(846,'M-13 284q-2-18 12-20 13-1 16 17l-7-8-15 1z')}
<ellipse cx="741" cy="356" rx="142" ry="27" fill="${I}" stroke="${C}" stroke-width="3"/>
${path('M626 371l-9 48 M852 371l9 48','none',`stroke="${I}" stroke-width="7"`)}
<g fill="none" stroke="${C}" stroke-width="1.5"><ellipse cx="741" cy="354" rx="18" ry="6"/><ellipse cx="741" cy="354" rx="18" ry="6" transform="rotate(60 741 354)"/><ellipse cx="741" cy="354" rx="18" ry="6" transform="rotate(-60 741 354)"/></g>
${text(603,407,14,'US',I,'letter-spacing="1"')}${text(718,407,14,'CHINA',I,'letter-spacing="1"')}${text(826,407,14,'RUSSIA',I,'letter-spacing="1"')}
</g>
<!-- The river ribbon holds the Kyiv scene; the breaks refer only to the reported strikes. -->
${path('M0 449Q230 421 431 458T1024 604V710Q824 665 602 665T0 706Z',I)}
${path('M0 668Q274 595 519 627T1024 674','none',`stroke="${T}" stroke-width="3"`)}
${path('M0 686Q274 613 519 645T1024 692','none',`stroke="${T}" stroke-width="1.5"`)}
${headline(44,482,21,'KYIV / DNIPRO CROSSINGS',C)}
${text(44,511,24,'Mayor: Russian missiles hit',C)}
${text(44,539,27,'three bridges',C,'font-family="Georgia,serif"')}
${text(44,561,14,'Reuters: not independently confirmed',C)}
${bridge(35,607,126,true)}${bridge(190,600,123,true)}${bridge(342,605,126,true)}
${path('M89 573l5-15 5 15 15 5-15 4-5 15-5-15-15-4z M242 567l4-13 5 13 12 4-12 5-5 13-4-13-13-5z M396 574l5-14 4 14 13 4-13 5-4 12-5-12-12-5z',R)}
<!-- COP31: open draft and opposing negotiating marks, no signature or accord. -->
${path('M570 438l414-12v175l-414 10z',C)}
${headline(591,461,23,'ANTALYA / COP31')}
${text(591,489,23,'Draft disputed over')}
${text(591,517,26,'fossil fuels &amp; finance',I,'font-family="Georgia,serif"')}
${path('M655 550l72-15 75 15v97l-75-17-72 17z',C,`stroke="${I}" stroke-width="3"`)}
${path('M727 538v92 M667 568l44-8 M667 580l44-8 M743 565l43 9 M743 578l43 9','none',`stroke="${I}" stroke-width="2"`)}
${text(682,616,13,'DRAFT',R,'transform="rotate(-10 682 616)" font-weight="bold"')}
${path('M832 646v-43h15v-37h12v80 M864 646v-66h18v66 M826 646h68',I)}
${path('M850 550q-19-15 0-25 M876 565q-15-15 3-27','none',`stroke="${T}" stroke-width="4"`)}
${path('M612 642q-25-33 13-53 15 31-13 53',T)}
<!-- Lower foreground: play has space and movement, children are not disaster props. -->
${path('M39 746l349-46 153 103-365 57z',R)}
${path('M82 756l299-38 116 78-315 48z M218 736l130 90 M119 790l293-38','none',`stroke="${C}" stroke-width="2"`)}
<g stroke="${I}" stroke-width="11" stroke-linecap="round" fill="none">
<path d="M174 724l-8 43-29 38 M166 767l22 34 M172 737l-29-16 M172 739l31-18"/>
<path d="M357 716l13 42-11 38 M370 756l29 25 M361 731l-25-14 M361 731l24-29"/></g>
<circle cx="176" cy="704" r="12" fill="${I}"/><circle cx="351" cy="696" r="12" fill="${I}"/>
<circle cx="295" cy="801" r="14" fill="${C}" stroke="${I}" stroke-width="2"/>
${path('M286 799l9-7 9 7-4 10h-10z',T)}
${headline(44,884,22,'GAZA / UNICEF')}
${text(44,915,28,'Back to Play launches',I,'font-family="Georgia,serif"')}
${text(44,940,17,"World Children's Day / safe play spaces")}
<!-- Turin: a single schematic player, not a traced portrait; result rather than a trophy. -->
${path('M575 744l278-40 132 118-283 39z',T)}
${path('M606 752l239-33 100 93-237 35z M722 737l103 94 M654 796l244-32','none',`stroke="${C}" stroke-width="2"`)}
${path('M649 729l7 108 M654 749l252 19 M906 747v72','none',`stroke="${I}" stroke-width="3"`)}
<g transform="translate(0 20)">
<g stroke="${I}" stroke-width="12" stroke-linecap="round" fill="none"><path d="M795 718l-13 46-34 23 M783 764l45 37 M793 730l-25-24-14-25 M797 732l32-26 24-26"/></g>
<circle cx="801" cy="696" r="13" fill="${I}"/>
${path('M782 721l18-3 9 30-24 13-10-12z',C)}
<ellipse cx="868" cy="664" rx="13" ry="22" fill="none" stroke="${C}" stroke-width="8" transform="rotate(35 868 664)"/><ellipse cx="868" cy="664" rx="13" ry="22" fill="none" stroke="${I}" stroke-width="3" transform="rotate(35 868 664)"/>
${path('M857 681l-10 14 M858 655l17 13 M857 666l13 10','none',`stroke="${I}" stroke-width="2"`)}
</g>
<circle cx="928" cy="698" r="5" fill="${R}"/>
${headline(586,884,22,'TURIN / ATP FINALS')}
${text(586,915,28,'Alcaraz beats Cobolli',I,'font-family="Georgia,serif"')}
${text(586,940,19,'6-4, 6-1 / unbeaten in group')}
${path('M44 960H980','none',`stroke="${I}" stroke-width="2"`)}
${text(44,988,13,'AP / UN / UNICEF / REUTERS / ATP',I,'letter-spacing="1.2"')}
${text(980,988,15,'WORLD NEWS / 20 NOV 2026',I,'text-anchor="end" letter-spacing="1"')}
</g><g fill="${I}">${grain}</g></svg>`;
mkdirSync(resolve(root,'art'),{recursive:true});
writeFileSync(resolve(root,'art/edition.svg'),svg);
const browser=await chromium.launch({executablePath:env.chrome_executable,headless:true});
try {
  const page=await browser.newPage({viewport:{width:1024,height:1024},deviceScaleFactor:1});
  const external=[];
  await page.route('**/*',route=>{
    if(!route.request().url().startsWith('file:')){external.push(route.request().url());return route.abort();}
    return route.continue();
  });
  await page.goto(pathToFileURL(resolve(root,'art/edition.svg')).href);
  await page.screenshot({path:resolve(root,'art/edition.jpg'),type:'jpeg',quality:94});
  if(external.length)throw Error('External resources: '+external.join(','));
  console.log('Rendered six original scenes in local Chrome; external resources: 0');
} finally {await browser.close();}
