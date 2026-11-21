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
<!-- AP report of remarks, not a summit on this date. The microphone is symbolic. -->
<path d="M573 205H995V278H573Z" fill="${C}"/>
${headline(586,226,23,"Trump on China's nuclear build-up")}
${text(586,251,20,"AP reports remarks &amp; agreed talks")}
${text(586,273,15,"After earlier US / China / Russia meeting")}
<g transform="translate(48 40) scale(.92)">
<!-- Original, simplified speaker: swept hair, profile, suit and open-hand gesture. -->
${path('M607 380l13-42 28-15 31 6 30 27 31-12 6 13-39 20-30-21 12 58-77 5z',I)}
${path('M646 326l10 28 21-25-12 10z',C)}
${path('M660 341l-6 25 11 28 7-31-7-22z',R)}
${path('M642 293q-6 15 2 25l11 11 19-4 7-13 10-3-9-8-2-12-22-10z',C,`stroke="${I}" stroke-width="2"`)}
${path('M635 294q-10-19 9-25 24-11 41 5l-9 9-23-1-5 14z',C,`stroke="${I}" stroke-width="3"`)}
${path('M641 281l27-5 M654 286l16-4 M672 295h5 M673 315l-9 1','none',`stroke="${I}" stroke-width="1.5"`)}
${path('M736 345l11-13 3 1-3 9 12-7 3 3-10 9 10-3 1 4-16 10z',C,`stroke="${I}" stroke-width="2"`)}
${path('M692 376l4-28 13-8','none',`stroke="${I}" stroke-width="3"`)}
<ellipse cx="711" cy="338" rx="10" ry="5" fill="${I}" transform="rotate(-25 711 338)"/>
${path('M605 378h111l-11 49h-91z',I,`stroke="${C}" stroke-width="2"`)}
${path('M622 391h76 M621 398h75','none',`stroke="${T}" stroke-width="1"`)}
<!-- An unsigned report sheet, not an agreement. -->
${path('M794 288l132 7-5 106-132-7z',C,`stroke="${I}" stroke-width="2"`)}
${text(805,310,12,'AP / 20 NOV',I,'font-weight="bold"')}
${text(805,330,13,'CHINA / NUCLEAR',I,'font-weight="bold"')}
${text(805,346,13,'EXPANSION',I,'font-weight="bold"')}
<g fill="none" stroke="${T}" stroke-width="1.6"><ellipse cx="854" cy="374" rx="23" ry="7"/><ellipse cx="854" cy="374" rx="23" ry="7" transform="rotate(60 854 374)"/><ellipse cx="854" cy="374" rx="23" ry="7" transform="rotate(-60 854 374)"/></g>
${text(787,423,13,'NONPROLIFERATION TALKS',I,'letter-spacing=".6"')}
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
<!-- COP31 delegates seek revisions to a draft, with no completed agreement. -->
${path('M570 438l414-12v175l-414 10z',C)}
${headline(591,461,23,'ANTALYA / COP31')}
${text(591,489,23,'Countries demand more')}
${text(591,517,26,'on fossil fuels &amp; finance',I,'font-family="Georgia,serif"')}
<!-- Facing negotiators and an open, unsigned draft. -->
${path('M588 639l8-47 21-12 22 17 28-5 4 12-38 12-17-14 10 44z',I)}
${path('M608 581l8 20 11-16-10 7z',C)}
<ellipse cx="614" cy="565" rx="13" ry="17" fill="${C}" stroke="${I}" stroke-width="2"/>
${path('M601 566q-4-23 15-21 16 2 11 21l-7-13-14 3z',I)}
${path('M936 646l-3-50-17-13-20 10-25-8-7 9 37 17 12-9-4 42z',T)}
<ellipse cx="916" cy="565" rx="13" ry="17" fill="${C}" stroke="${I}" stroke-width="2"/>
${path('M903 560q0-22 17-17 15 4 10 23l-8-13-15 3z',I)}
${path('M904 582l12 17 10-15-11 8z',C)}
${path('M671 550l78-16 83 17-2 94-82-17-77 17z',C,`stroke="${I}" stroke-width="3"`)}
${path('M749 537l-1 91 M686 566l46-9 M686 578l46-9 M765 563l49 10 M765 576l49 10','none',`stroke="${I}" stroke-width="2"`)}
${text(694,607,14,'DRAFT',R,'transform="rotate(-10 694 607)" font-weight="bold"')}
${path('M694 621l38-7 M763 609l47 9','none',`stroke="${R}" stroke-width="2"`)}
${path('M661 594l13-9 11 2 1 4-13 5-3 9-9-3z M871 585l-16-6-8 3 4 4 9 2 6 8z',C,`stroke="${I}" stroke-width="1.8"`)}
${path('M842 598l20-21','none',`stroke="${R}" stroke-width="3"`)}
</g><g font-family="Arial,sans-serif">
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
