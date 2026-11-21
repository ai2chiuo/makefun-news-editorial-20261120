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
${path('M642 293q-4 10 0 20 2 10 13 16l18-4 4-8 3-5 10-3-8-8-3-12-21-10z',C,`stroke="${I}" stroke-width="2"`)}
${path('M635 294q-10-19 9-25 24-11 41 5l-9 9-23-1-5 14z',C,`stroke="${I}" stroke-width="3"`)}
${path('M646 299q-5-5-6 2t8 9l8 13 9 3-10 3-12-10z',T,'opacity=".38"')}
${path('M641 281q15-10 29-5 M648 285q14-8 25-5 M664 293l12 1 M668 298h5 M676 313l-10 2 M651 313l2 6 M648 304q-7-8-6 1','none',`stroke="${I}" stroke-width="1.4"`)}
${path('M635 335l9 28-14-10 9 29-24-4 8-31z M677 336l-5 35 16-10z',T,'opacity=".5"')}
${path('M685 348l19 17 28-14','none',`stroke="${C}" stroke-width="1" opacity=".5"`)}
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
<ellipse cx="757" cy="647" rx="176" ry="9" fill="${I}" opacity=".18"/>
${path('M588 639l8-47 21-12 22 17 28-5 4 12-38 12-17-14 10 44z',I)}
${path('M608 581l8 20 11-16-10 7z',C)}
<ellipse cx="614" cy="565" rx="13" ry="17" fill="${C}" stroke="${I}" stroke-width="2"/>
${path('M601 566q-4-23 15-21 16 2 11 21l-7-13-14 3z',I)}
${path('M936 646l-3-50-17-13-20 10-25-8-7 9 37 17 12-9-4 42z',T)}
<ellipse cx="916" cy="565" rx="13" ry="17" fill="${C}" stroke="${I}" stroke-width="2"/>
${path('M903 560q0-22 17-17 15 4 10 23l-8-13-15 3z',I)}
${path('M904 582l12 17 10-15-11 8z',C)}
${path('M619 556l5 2 M620 562h2 M625 564l5 5-6 1 M618 575l7-1 M608 568q-4-4-3 2 M907 556l5 1 M908 562h2 M906 563l-5 6 7 1 M906 575l7-1','none',`stroke="${I}" stroke-width="1.2"`)}
${path('M604 569q2 9 11 12l6-2-8-4-4-14z M924 563q4 12-6 19l-6-5 8-3z',T,'opacity=".4"')}
${path('M601 604l8 26 M620 602l9 8 M927 605l-6 29 M909 603l-11 2','none',`stroke="${C}" stroke-width="1.3"`)}
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
<!-- Two children passing a ball: clothing, weight and gestures, not stick figures. -->
<ellipse cx="190" cy="824" rx="61" ry="10" fill="${I}" opacity=".2"/>
<ellipse cx="360" cy="821" rx="54" ry="9" fill="${I}" opacity=".2"/>
<!-- Left child's legs: planted left foot and reaching right kick. -->
${path('M163 771l25 1 5 18 35 15-5 11-46-15-5-13-9 27-12-1z',T,`stroke="${I}" stroke-width="2"`)}
${path('M151 811l13 2 1 9-26 3q-7-7 12-14 M221 804l13 4 10 8q3 8-9 8l-17-10z',C,`stroke="${I}" stroke-width="2"`)}
${path('M157 741l-22 9-16-13-5 6 18 19 33-12 M186 742l18 7 17-12 5 7-21 17-25-10',C,`stroke="${I}" stroke-width="2"`)}
${path('M158 738l14-5 14 5 12 8-7 12-6-3 3 22-32-1 3-22-6 2-6-11z',C,`stroke="${I}" stroke-width="2"`)}
${path('M157 761l29-2 1 8-30 2z',R)}
${path('M167 732l1 9q5 5 10-1l1-11z',C,`stroke="${I}" stroke-width="1.5"`)}
${path('M161 710q-7 21 7 26 14 2 19-14l-6-17z',C,`stroke="${I}" stroke-width="2"`)}
${path('M159 722q-12-16-2-22 4-11 13-7 11-5 17 6 10 6 0 18l-8-11-6 8-9-2z',I)}
${path('M170 720h2 M180 718h2 M175 724l2 2 M172 729q5 3 9-2 M160 720q-5-3-2 3','none',`stroke="${I}" stroke-width="1.4" stroke-linecap="round"`)}
${path('M156 778l9 6-7 21 M184 782l4 11 29 12 M160 748l5 5 M181 746l-1 7','none',`stroke="${I}" stroke-width="1.4" opacity=".5"`)}
<!-- Right child leans into the return pass. -->
${path('M346 771l24-2 12 28-3 21-11 1-1-22-10-11-23 20-18-1-1-9 20-3z',I)}
${path('M368 815l14-1 13 7q6 7-4 9l-24-5z M314 795l10 3-5 11-19 3q-6-6 14-17',C,`stroke="${I}" stroke-width="2"`)}
${path('M343 740l-19-8-11-13-6 4 11 20 26 12 M370 738l16 8 15-18 7 5-20 26-24-9',C,`stroke="${I}" stroke-width="2"`)}
${path('M345 735l12-6 16 8 10 8-8 12-6-4 8 24-34 4 2-26-9-4z',T,`stroke="${I}" stroke-width="2"`)}
${path('M351 729l2 11 8-2 3-10',C,`stroke="${I}" stroke-width="1.5"`)}
${path('M341 710q-1 18 13 22 13-1 16-17l-10-16z',C,`stroke="${I}" stroke-width="2"`)}
${path('M339 720q-10-25 11-26 18-2 23 15l-6 14-4-15-15 3-3 11z',I)}
${path('M352 752l12 13 M346 772l24-3','none',`stroke="${C}" stroke-width="1.4"`)}
${path('M347 719h2 M358 717h2 M353 722l-1 3 M350 727q5 2 9-2','none',`stroke="${I}" stroke-width="1.3" stroke-linecap="round"`)}
<circle cx="281" cy="793" r="15" fill="${C}" stroke="${I}" stroke-width="2"/>
${path('M272 789l9-7 9 7-4 10h-10z M268 799l6 5 M290 802l5-5',T)}
${path('M253 791l-12 1 M252 799l-8 4','none',`stroke="${C}" stroke-width="2" stroke-linecap="round"`)}
${headline(44,884,22,'GAZA / UNICEF')}
${text(44,915,28,'Back to Play launches',I,'font-family="Georgia,serif"')}
${text(44,940,17,"World Children's Day / safe play spaces")}
<!-- Turin: a single schematic player, not a traced portrait; result rather than a trophy. -->
${path('M575 744l278-40 132 118-283 39z',T)}
${path('M606 752l239-33 100 93-237 35z M722 737l103 94 M654 796l244-32','none',`stroke="${C}" stroke-width="2"`)}
${path('M649 729l7 108 M654 749l252 19 M906 747v72','none',`stroke="${I}" stroke-width="3"`)}
<!-- Original athletic forehand: a rotating torso, bent knees, connected hands and racket. -->
<ellipse cx="808" cy="837" rx="95" ry="13" fill="${I}" opacity=".3"/>
<!-- Rear leg and shoe, then the weight-bearing forward leg. -->
${path('M815 780q13 9 20 22l24 14-5 11-35-17-21-22z',C,`stroke="${I}" stroke-width="2"`)}
${path('M849 818l12-6 14 13 10 2q5 8-6 10l-25-8z',I,`stroke="${C}" stroke-width="1.5"`)}
${path('M787 781l17 6-23 25-20 17-9-8 15-23z',C,`stroke="${I}" stroke-width="2"`)}
${path('M751 819l14 7-3 12-25 9q-9-1-7-8l17-13z',I,`stroke="${C}" stroke-width="1.5"`)}
${path('M783 764l39-3 9 22-14 14-18-13-12 15-18-13z',C,`stroke="${I}" stroke-width="2"`)}
${path('M793 772l7 12 M818 771l5 10 M775 784l10 9','none',`stroke="${T}" stroke-width="2"`)}
<!-- Skin, free arm and racket arm are continuous organic contours. -->
${path('M790 730l-27-16-16-26-10 3 12 32 32 24z',C,`stroke="${I}" stroke-width="2"`)}
${path('M823 730l26-6 28-20 7 7-27 26-30 10z',C,`stroke="${I}" stroke-width="2"`)}
${path('M785 726l16-8 17 4 17 9-6 21-7-1 2 19-42 7-7-33-7-4 9-17z',R,`stroke="${I}" stroke-width="2"`)}
${path('M793 729l7 7 17-9 M785 744l6 21 22-3 M815 745l9 5','none',`stroke="${C}" stroke-width="2" opacity=".7"`)}
${path('M797 715l-1 13 10 6 10-11-4-13z',C,`stroke="${I}" stroke-width="1.5"`)}
${path('M792 690q-9 7-4 23l12 10 14-4 8-16-8-15z',C,`stroke="${I}" stroke-width="2"`)}
${path('M786 705q-9-20 4-24l8-5 11 4q16-2 16 15l-7 8-7-13-13 6-6 13z',I,`stroke="${C}" stroke-width="1"`)}
${path('M796 702l7-2 M810 699l7 1 M800 707h2 M813 705h2 M807 707l2 5-4 1 M801 716l9 1 M792 708q-6-4-4 3','none',`stroke="${I}" stroke-width="1.2"`)}
${path('M789 709l7 9 6 2-2 3-10-9z M778 803l-13 19 M831 806l20 12','none',`stroke="${T}" stroke-width="3" opacity=".5"`)}
${path('M738 692l-5-8 3-7 3 4 3-7 4 1 4 16 M877 705l7-8 7-1 1 4-9 13z',C,`stroke="${I}" stroke-width="1.5"`)}
${path('M883 703l16-14','none',`stroke="${I}" stroke-width="5"`)}
<ellipse cx="911" cy="676" rx="16" ry="25" fill="none" stroke="${C}" stroke-width="9" transform="rotate(42 911 676)"/>
<ellipse cx="911" cy="676" rx="16" ry="25" fill="none" stroke="${I}" stroke-width="3" transform="rotate(42 911 676)"/>
<g transform="rotate(42 911 676)" stroke="${I}" stroke-width=".7"><path d="M900 666h22 M898 674h26 M900 682h22 M906 655v42 M914 653v44"/></g>
<circle cx="955" cy="702" r="5" fill="${R}"/>
${path('M966 700l11-4','none',`stroke="${R}" stroke-width="1.5"`)}
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
