(()=>{"use strict";const t=["Acura","Alfa Romeo","Aston Martin","Audi","Bentley","BMW","Bugatti","Volkswagen","Volvo","Lada","Geely","Great Wall","ГАЗ","Daewoo","Dodge","Jeep","ЗАЗ","ЗИЛ","Infiniti","IVECO","Cadillac","Citroen","Kia","КАМАЗ","Lamborghini","Land Rover","Lexus","Lifan","ЛуАЗ","Marussia","Maserati","Maybach","Mazda","McLaren","Mercedes-Benz","Mitsubishi","Москвич","Nissan","Opel","Peugeot","Pontiac","Porsche","Renault","Rolls-Royce","Rover","Ravon","Saab","Scion","SEAT","Skoda","Smart","SsangYong","Subaru","Suzuki","Toyota","ТагАЗ","УАЗ","FAW","Ferrari","Fiat","Ford","Honda","Hummer","Hyundai","Haval","Chery","Chevrolet","Chrysler","Jaguar"],e=["TLX","RLX","CDX","RDX","MDX","I3","I8","IX","M1","M2","M3","M4","M5","M6","M6 GRAN COUPE","M8","X1","X2","X3","X3 M","X4","X4 M","X5","X5 M","X6","X6 M","X7","Z4","A1","A3","A4","A4","A5","A6","A7","A7","A8","A8","Q2","Q3","A6","Q7","R8","TT","Q8","2104","2107","2110","4X4","GRANTA","GRANTA CROSS","GRANTA SPORT","KALINA","KALINA CROSS","KALINA NFR","KALINA SPORT","LARGUS","LARGUS CROSS","PRIORA","SAMARA","VESTA","VESTA CROSS","VESTA SPORT","XRAY","XRAY CROSS","CADENZA","CARENS","CARNIVAL","CEED","CERATO","EV6","K2 CROSS","K5","K9","K900","MAGENTIS","MOHAVE","NIRO","OPIRUS","OPTIMA","PICANTO","PROCEED","QUORIS","RIO","SELTOS","SORENTO","SOUL","SOUL EV","SPECTRA","SPORTAGE","STINGER","XCEED","ACCENT","COUPE","CRETA","ELANTRA","EQUUS","GENESIS","GENESIS COUPE","GETZ","GRAND SANTA FE","GRANDEUR","H-1","I10","I20","I30","I40","IONIQ","IONIQ 5","IX20","IX25","IX35","IX55","MATRIX","NF SONATA","PALISADE","SANTA FE","SOLARIS","SONATA","STAREX","TERRACAN","TUCSON","VELOSTER","XCENT"],n=()=>{const t=Math.floor(256*Math.random()).toString(16);return 2===t.length?t:`0${t}`},i=()=>`#${n()}${n()}${n()}`;var r=function(t,e,n,i){return new(n||(n=Promise))((function(r,s){function a(t){try{d(i.next(t))}catch(t){s(t)}}function o(t){try{d(i.throw(t))}catch(t){s(t)}}function d(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,o)}d((i=i.apply(t,e||[])).next())}))};const s=class{constructor(){this.url="http://127.0.0.1:3000",this.garageUrl=`${this.url}/garage`,this.winnersUrl=`${this.url}/winners`,this.garageLimit=7,this.winnersLimit=10,this.pageGarage=1,this.pageWinners=1,this.timeOrder="ASC",this.sort="id",this.winsOrder="ASC",this.isRenderGarage=!0}getUnits(t,e,n,i,s){return r(this,void 0,void 0,(function*(){const r=t,a=`${n}?${s}`,o=yield fetch(a),d=yield o.json(),c=o.headers.get("X-Total-Count");if(null===c||Number.isNaN(+c))throw new Error("X-Total-Count is null or not number");const l=+c,h=Math.ceil(l/i);t>h&&this.getUnits(h,e,n,i,s);const u={limit:i,currentPage:r,totalCount:l,cars:d};if(n!==this.winnersUrl)return e(u);this.completeResultForWinners(u,e)}))}completeResultForWinners(t,e){if(!t.cars)throw new Error("result is not exist");const n=t.cars.map((t=>r(this,void 0,void 0,(function*(){const e=`${this.garageUrl}/${t.id}`,n=yield fetch(e);return yield n.json()}))));Promise.all(n).then((e=>{e.forEach(((e,n)=>{if(!t.cars)throw new Error("result is not exist");const i=t.cars[n];i.color=e.color,i.name=e.name}))})).then((()=>e(t)))}getCars(t,e){return r(this,void 0,void 0,(function*(){this.isRenderGarage=!0,this.pageGarage=t<1?1:t;const n=`_page=${t}&_limit=${this.garageLimit}`;this.getUnits(this.pageGarage,e,this.garageUrl,this.garageLimit,n)}))}getWinners(t,e,n,i){return r(this,void 0,void 0,(function*(){this.isRenderGarage=!1,this.pageWinners=t<1?1:t;const r=`_page=${this.pageWinners}&_limit=${this.winnersLimit}&_sort=${n}&_order=${i}`;this.getUnits(t,e,this.winnersUrl,this.winnersLimit,r)}))}getWinnersByTime(t){return r(this,void 0,void 0,(function*(){this.timeOrder="DESC"===this.timeOrder?"ASC":"DESC",this.sort="time",this.getWinners(this.pageWinners,t,this.sort,this.timeOrder)}))}getWinnersByWins(t){return r(this,void 0,void 0,(function*(){this.winsOrder="DESC"===this.winsOrder?"ASC":"DESC",this.sort="wins",this.getWinners(this.pageWinners,t,this.sort,this.winsOrder)}))}getWinner(t,e){return r(this,void 0,void 0,(function*(){this.getUnit(this.winnersUrl,t,e)}))}addWinner(t,e){return r(this,void 0,void 0,(function*(){this.getWinner(t,(n=>r(this,void 0,void 0,(function*(){const i={};if(void 0!==n.time&&void 0!==n.wins){const r=+(e/1e3).toFixed(2);return i.time=r<n.time?r:n.time,i.wins=n.wins+1,i.id=t,void this.updateWinner(i)}i.time=+(e/1e3).toFixed(2),i.wins=1,i.id=t;const r=yield fetch(this.winnersUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});yield r.json()}))))}))}updateWinner(t){return r(this,void 0,void 0,(function*(){const{id:e,time:n,wins:i}=t,r=yield fetch(`${this.winnersUrl}/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({time:n,wins:i})});yield r.json()}))}getCar(t,e){return r(this,void 0,void 0,(function*(){this.getUnit(this.garageUrl,t,e)}))}getUnit(t,e,n){return r(this,void 0,void 0,(function*(){const i=`${t}/${e}`,r=yield fetch(i),s=yield r.json();if(t!==this.garageUrl)n(s);else{n(s)}}))}removeCar(t,e){return r(this,void 0,void 0,(function*(){const n=`${this.garageUrl}/${t}`,i=yield fetch(n,{method:"DELETE"});yield i.json(),yield this.getCars(this.pageGarage,e),this.removeWinner(t)}))}removeWinner(t){return r(this,void 0,void 0,(function*(){const e=`${this.winnersUrl}/${t}`,n=yield fetch(e,{method:"DELETE"});yield n.json()}))}createCar(t,e,n){return r(this,void 0,void 0,(function*(){const i={name:t,color:e},{pageGarage:r}=this,s=yield fetch(this.garageUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}),a=yield s.json();return n&&this.getCars(r,n),a}))}generateCars(n){return r(this,void 0,void 0,(function*(){const r=t.length,s=t.length,a=[];for(let n=0;n<100;n+=1){const n=`${t[Math.floor(Math.random()*r)]} ${e[Math.floor(Math.random()*s)]}`,o=i();a.push(this.createCar(n,o))}Promise.all(a).then((()=>{this.getCars(this.pageGarage,n)}))}))}updateCar(t,e,n,i){return r(this,void 0,void 0,(function*(){const r={name:e,color:n},{pageGarage:s}=this,a=yield fetch(`${this.garageUrl}/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});yield a.json(),this.getCars(s,i)}))}sendStatusCar(t,e){return r(this,void 0,void 0,(function*(){return yield fetch(`${this.url}/engine?id=${t}&status=${e}`,{method:"PATCH"})}))}startCar(t,e){return r(this,void 0,void 0,(function*(){const n=yield(yield this.sendStatusCar(t,"started")).json().then((t=>t.distance/t.velocity),null);e(n)}))}driveCar(t,e){return r(this,void 0,void 0,(function*(){const n=(yield this.sendStatusCar(t,"drive")).ok;e(n)}))}stopCar(t,e){return r(this,void 0,void 0,(function*(){(yield this.sendStatusCar(t,"stopped")).ok&&e()}))}startRace(t){return r(this,void 0,void 0,(function*(){const e=this.pageGarage;this.getCars(e,(e=>{const{cars:n}=e;if(!n)throw new Error("cars is not exist");const i=n.map((t=>r(this,void 0,void 0,(function*(){return(yield this.sendStatusCar(t.id,"started")).json().then((e=>{const n=e.distance/e.velocity,{id:i}=t;return{time:n,id:i}}))}))));Promise.all(i).then((e=>{this.arrayRaceCars=e,e.forEach(t)}))}))}))}resetRace(t){var e;return r(this,void 0,void 0,(function*(){null===(e=this.arrayRaceCars)||void 0===e||e.forEach((e=>r(this,void 0,void 0,(function*(){const{id:n}=e;(yield this.sendStatusCar(n,"stopped")).ok&&t(n)}))))}))}getOrder(){return"time"===this.sort?this.timeOrder:this.winsOrder}nextPage(t){if(this.isRenderGarage)return void this.getCars(this.pageGarage+1,t);const e=this.getOrder();this.getWinners(this.pageWinners+1,t,this.sort,e)}prevPage(t){if(this.isRenderGarage)return void this.getCars(this.pageGarage-1,t);const e=this.getOrder();this.getWinners(this.pageWinners-1,t,this.sort,e)}},a=(t,e,n,i)=>`<div class="${i}">\n      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"\n      width="${e}px" height="${n}px" viewBox="0 100 1280.000000 400.000000"\n      preserveAspectRatio="xMidYMid meet">\n        <metadata>\n        Created by potrace 1.15, written by Peter Selinger 2001-2017\n        </metadata>\n        <g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)"\n          fill="${t}" stroke="none">\n          <path d="M3565 5336 c-106 -30 -101 -26 -108 -111 -4 -42 -9 -80 -12 -85 -6\n          -10 -246 -105 -590 -234 -448 -167 -1052 -415 -1173 -483 -78 -43 -193 -91\n          -250 -104 -23 -5 -98 -14 -165 -19 -67 -6 -167 -19 -222 -30 -154 -31 -340\n          -49 -563 -57 l-203 -6 -43 -66 c-59 -91 -60 -95 -26 -130 37 -37 38 -65 3\n          -150 -25 -62 -27 -78 -31 -256 l-4 -190 -38 -32 c-91 -78 -133 -209 -134 -418\n          0 -194 11 -396 26 -482 13 -71 14 -74 72 -122 69 -58 130 -129 158 -184 64\n          -126 534 -211 1384 -250 l92 -4 -6 119 c-6 142 8 256 49 383 112 352 394 622\n          756 722 90 26 112 28 278 28 165 0 188 -2 278 -27 201 -56 361 -152 504 -302\n          140 -145 222 -293 274 -492 21 -79 24 -109 23 -279 -1 -127 -6 -214 -16 -263\n          l-15 -73 3006 7 c1653 4 3007 8 3009 9 1 1 -8 37 -20 81 -19 67 -22 105 -22\n          259 -1 166 1 187 27 279 117 421 467 736 885 797 119 17 325 7 432 -21 239\n          -63 453 -205 601 -399 70 -92 154 -267 185 -386 24 -88 27 -119 27 -260 1\n          -116 -4 -181 -16 -234 -10 -41 -16 -75 -15 -76 2 -1 62 2 133 6 266 16 458 45\n          525 79 48 24 97 81 127 146 l24 52 -16 157 c-15 152 -15 163 4 284 63 388 50\n          680 -35 802 -134 193 -526 336 -1429 519 -737 149 -1322 209 -2033 210 -228 0\n          -226 0 -347 85 -187 131 -1045 607 -1471 815 -383 187 -788 281 -1439 332\n          -208 17 -1106 16 -1400 0 -121 -7 -314 -19 -430 -27 -302 -22 -286 -22 -341\n          10 -140 81 -187 94 -269 71z m1885 -333 c6 -37 38 -238 71 -446 32 -209 66\n          -422 75 -474 9 -52 15 -96 13 -97 -11 -9 -1699 29 -1951 44 -206 13 -417 36\n          -485 54 -98 26 -198 119 -249 231 -35 75 -36 172 -5 255 17 45 30 61 68 86 83\n          54 135 80 253 127 341 136 858 230 1460 267 269 16 270 16 511 18 l227 2 12\n          -67z m630 47 c264 -18 777 -110 1029 -186 186 -56 445 -188 756 -387 211 -134\n          274 -181 250 -185 -75 -12 -133 -50 -162 -106 -19 -35 -21 -136 -4 -179 l11\n          -27 -907 2 -906 3 -59 160 c-110 302 -298 878 -298 916 0 6 95 2 290 -11z"/>\n          <path d="M2633 3125 c-223 -40 -410 -141 -568 -306 -132 -138 -213 -283 -262\n          -467 -22 -83 -26 -119 -26 -247 -1 -169 10 -236 65 -382 87 -230 271 -436 493\n          -551 85 -44 178 -78 271 -98 107 -23 312 -23 419 1 392 84 699 375 802 761 23\n          86 26 120 27 254 1 158 -5 199 -46 330 -98 310 -355 567 -668 669 -150 50\n          -354 64 -507 36z m350 -301 c249 -56 457 -247 543 -499 25 -72 28 -95 28 -220\n          1 -153 -15 -228 -74 -345 -94 -186 -283 -337 -485 -386 -96 -24 -268 -24 -360\n          0 -320 84 -544 355 -562 681 -20 359 209 673 558 765 94 24 253 26 352 4z"/>\n          <path d="M2600 2697 c-36 -13 -85 -36 -109 -51 l-44 -28 116 -115 c81 -82 120\n          -114 131 -110 14 6 16 29 16 167 0 186 6 178 -110 137z"/>\n          <path d="M2920 2561 c0 -139 2 -162 16 -168 11 -4 50 28 130 108 l115 114 -28\n          22 c-34 28 -138 70 -193 79 l-40 7 0 -162z"/>\n          <path d="M2282 2448 c-28 -36 -92 -191 -92 -225 0 -10 34 -13 165 -13 151 0\n          165 1 165 18 0 15 -206 232 -221 232 -4 0 -11 -6 -17 -12z"/>\n          <path d="M3222 2351 c-62 -59 -112 -115 -112 -124 0 -15 17 -17 165 -17 131 0\n          165 3 165 13 0 40 -69 205 -95 227 -7 6 -48 -27 -123 -99z"/>\n          <path d="M2781 2332 c-12 -22 11 -62 34 -62 8 0 21 10 29 22 20 28 4 58 -29\n          58 -13 0 -29 -8 -34 -18z"/>\n          <path d="M2749 2161 c-32 -33 -37 -67 -14 -110 29 -57 104 -64 151 -14 53 57\n          9 153 -71 153 -27 0 -44 -8 -66 -29z"/>\n          <path d="M2570 2125 c-26 -32 13 -81 48 -59 24 16 27 45 6 61 -23 17 -39 16\n          -54 -2z"/>\n          <path d="M3006 2124 c-20 -19 -20 -38 -2 -54 23 -19 61 -8 64 18 7 44 -32 67\n          -62 36z"/>\n          <path d="M2190 1975 c0 -29 41 -140 72 -194 l31 -53 117 117 c71 71 116 123\n          113 131 -4 11 -40 14 -169 14 -141 0 -164 -2 -164 -15z"/>\n          <path d="M3110 1972 c0 -9 51 -68 114 -131 l114 -114 31 54 c30 51 71 165 71\n          195 0 11 -31 14 -165 14 -151 0 -165 -1 -165 -18z"/>\n          <path d="M2780 1901 c-7 -15 -5 -24 8 -41 32 -40 85 -4 62 41 -14 25 -56 25\n          -70 0z"/>\n          <path d="M2562 1697 c-61 -62 -112 -115 -112 -119 0 -18 208 -108 249 -108 7\n          0 11 54 11 164 0 140 -2 165 -16 170 -9 3 -16 6 -17 6 -1 0 -53 -51 -115 -113z"/>\n          <path d="M2933 1803 c-15 -6 -19 -333 -4 -333 46 0 251 88 251 108 0 9 -223\n          232 -230 231 -3 0 -11 -3 -17 -6z"/>\n          <path d="M10700 3119 c-390 -84 -696 -376 -797 -759 -31 -117 -41 -292 -24\n          -411 33 -227 150 -453 318 -609 267 -250 643 -344 993 -249 117 32 283 118\n          380 196 487 396 518 1128 67 1560 -97 93 -166 140 -290 198 -137 64 -235 86\n          -407 91 -120 3 -162 0 -240 -17z m445 -313 c238 -81 409 -258 486 -506 30 -96\n          33 -289 5 -388 -110 -400 -513 -637 -911 -536 -149 38 -313 147 -402 267 -176\n          238 -203 533 -71 797 34 69 60 103 138 180 77 78 111 104 181 139 129 65 207\n          81 364 77 109 -3 143 -7 210 -30z"/>\n          <path d="M10703 2700 c-54 -19 -153 -71 -153 -80 0 -3 51 -57 114 -119 80 -80\n          119 -112 130 -108 14 5 16 29 16 167 l0 160 -27 -1 c-16 0 -52 -9 -80 -19z"/>\n          <path d="M11020 2561 c0 -139 2 -162 16 -168 22 -8 247 216 234 232 -17 20\n          -163 84 -207 91 l-43 7 0 -162z"/>\n          <path d="M10366 2424 c-29 -44 -76 -165 -76 -194 0 -19 7 -20 165 -20 126 0\n          165 3 165 13 0 7 -51 63 -114 126 l-114 114 -26 -39z"/>\n          <path d="M11313 2348 c-61 -62 -109 -119 -106 -125 6 -15 333 -19 333 -4 0 45\n          -88 241 -108 241 -4 0 -57 -51 -119 -112z"/>\n          <path d="M10882 2338 c-17 -17 -15 -32 7 -52 16 -14 23 -15 41 -6 31 17 24 64\n          -10 68 -14 2 -31 -3 -38 -10z"/>\n          <path d="M10846 2159 c-68 -81 17 -194 110 -144 89 48 56 175 -46 175 -30 0\n          -44 -6 -64 -31z"/>\n          <path d="M10670 2126 c-19 -23 -8 -61 18 -64 44 -7 67 32 36 62 -19 20 -38 20\n          -54 2z"/>\n          <path d="M11106 2127 c-21 -16 -18 -45 7 -61 37 -23 77 35 41 61 -10 7 -21 13\n          -24 13 -3 0 -14 -6 -24 -13z"/>\n          <path d="M10290 1970 c0 -29 43 -141 74 -195 l28 -48 116 116 c81 81 113 120\n          109 131 -6 14 -29 16 -167 16 -152 0 -160 -1 -160 -20z"/>\n          <path d="M11207 1978 c-3 -7 47 -66 111 -130 l116 -118 27 43 c27 44 79 177\n          79 203 0 12 -28 14 -164 14 -122 0 -166 -3 -169 -12z"/>\n          <path d="M10881 1901 c-14 -25 -5 -48 20 -56 27 -9 51 13 47 44 -4 34 -51 43\n          -67 12z"/>\n          <path d="M10662 1697 c-61 -62 -112 -115 -112 -119 0 -20 201 -108 247 -108\n          10 0 13 34 13 164 0 140 -2 165 -16 170 -9 3 -16 6 -17 6 -1 0 -53 -51 -115\n          -113z"/>\n          <path d="M11033 1803 c-10 -3 -13 -47 -13 -169 0 -90 4 -164 8 -164 36 0 186\n          61 239 98 16 10 -216 242 -234 235z"/>\n        </g>\n      </svg>\n    </div>`,o=t=>{const{currentPage:e,totalCount:n,cars:i}=t;if(!i)throw new Error("cars is not exist");const r=`\n  <form action="#" method="#">\n<div class="wrapper wrapper-color">\n  <input type="text" id="name-create">\n  <input type="color" name="color-create" id="color-create">\n  <button id="create-car">create</button>\n</div>\n<div class="wrapper wrapper-color">\n  <input type="text" id="name-update" disabled>\n  <input type="color" name="color-update" id="color-update" disabled>\n  <button id="update-car" disabled>update</button>\n</div>\n<div class="wrapper wrapper-buttons">\n  <button id="race">race</button><button id="reset" disabled>reset</button><button id="generate-cars">Generate cars</button>\n</div>\n</form>\n  <h2>Garage(${n})</h2>\n  <h3> Page #${e}</h3>\n  <div class="modal" id="modal">\n    <div class="modal__container">\n      <div class=modal__title>Winner!!!</div>\n      <div class="modal__text" id="modal__text"></div>\n      <div class="modal__close" id="modal__close"></div>\n    </div>\n  </div>\n  ${(t=>t.map((t=>{const{id:e,color:n,name:i}=t;if("string"!=typeof n)throw new Error("color is not string");return`<div class="car" data-id="${e}">\n        <div class="wrapper wrapper-buttons">\n          <button class="car__btn-select">select</button>\n          <button class="car__btn-remove">remove</button>\n          <h3 class="car__model">${i}</h3>\n        </div>\n        <div class="wrapper wrapper-image">\n          <button class="car__btn-start">A</button>\n          <button class="car__btn-stop" disabled>B</button>\n          ${a(n,64,25,"car__image")}\n          <div class="car__flag">\n          </div>\n        </div>\n      </div>`})).join("\n"))(i)}`;return r},d=t=>{const{totalCount:e,currentPage:n,cars:i}=t;if(!i)throw new Error("cars is not exist");return`\n  <h2> Winners(${e})</h2>\n  <h3> Page #${n}</h3>\n  <div class="winners__table">\n    <div class="winners__th winners__row">\n      <div class="winners__td winners__number">№</div>\n      <div class="winners__td winners__car">Car</div>\n      <div class="winners__td winners__name">Name</div>\n      <div class="winners__td winners__wins" id="winners__wins">Wins</div>\n      <div class="winners__td winners__time" id="winners__time">Best Time, s</div>\n    </div>\n    <div class="winners__tbody">\n      ${((t,e)=>t.map(((t,n)=>{const{color:i,name:r,time:s,wins:o}=t,d=10*(e-1)+n+1;if("string"!=typeof i)throw new Error("color is not string");if("number"!=typeof s)throw new Error("time is not number");if("number"!=typeof o)throw new Error("wins is not number");return`<div class="winners__tbody_tr winners__row">\n        <div class="winners__td winners__number">${d}</div>\n        <div class="winners__td winners__car">${a(i,64,25,"winner-image")}</div>\n        <div class="winners__td winners__name">${r}</div>\n        <div class="winners__td winners__wins">${o}</div>\n        <div class="winners__td winners__time">${s}</div>\n      </div>`})).join("\n"))(i,n)}\n    </div>\n  </div>\n  `},c=t=>{const e=document.getElementById(t);if(!e)throw new Error(`${t} is not exist`);return e},l=(t,e)=>{const n=e.querySelector(t);if(!n)throw new Error(`${t} is not exist`);return n};const h=class{clearGarageAndWinners(){if(null===this.garage)throw new Error("garage is not exist");if(this.garage=this.garage,this.garage.innerHTML="",null===this.winners)throw new Error("winners is not exist");this.winners=this.winners,this.winners.innerHTML=""}drawGarage(t){this.clearGarageAndWinners(),this.garage.insertAdjacentHTML("afterbegin",o(t)),this.getElementsGarage(),this.disablePagination(t)}drawWinners(t){this.clearGarageAndWinners(),this.winners.insertAdjacentHTML("afterbegin",d(t)),this.disablePagination(t)}drawContainer(){document.body.insertAdjacentHTML("afterbegin",'<div class="container">\n    <header class="header">\n      <button id="toGarageBtn" class="btn header__btn">to garage</button>\n      <button id="toWinnersBtn" class="btn header__btn">to winners</button>\n    </header>\n    <div class="wrapper-garage" id="wrapper-garage">\n      <div class="garage" id="garage"></div>\n    </div>\n    <div class="wrapper-winners" id="wrapper-winners">\n      <div class="winners" id="winners"></div>\n    </div>\n    <div class="pagination">\n      <button class="pagination__previous" id="pagination__previous">previous page</button>\n      <button class="pagination__next" id="pagination__next">next page</button>\n    </div>\n  </div>'),this.getElementsContainer()}getElementsContainer(){this.garageWrapper=c("wrapper-garage"),this.winnersWrapper=c("wrapper-winners"),this.garage=c("garage"),this.winners=c("winners"),this.nextPage=c("pagination__next"),this.previousPage=c("pagination__previous")}getElementsGarage(){this.createCarColor=c("color-create"),this.createCarName=c("name-create"),this.updateCarColor=c("color-update"),this.updateCarName=c("name-update"),this.updateCarBtn=c("update-car")}changeUpdateInputs(t){if(!this.updateCarColor||!this.updateCarName||!this.updateCarBtn)throw new Error("update inputs is not exist");if("string"!=typeof t.color)throw new Error("color is not string");if("string"!=typeof t.name)throw new Error("name is not string");const{updateCarColor:e,updateCarName:n,updateCarBtn:i}=this;e.disabled=!1,n.disabled=!1,i.disabled=!1,e.value=t.color,n.value=t.name}disableUpdateInputs(){if(!this.updateCarColor||!this.updateCarName||!this.updateCarBtn)throw new Error("update inputs is not exist");const{updateCarColor:t,updateCarName:e,updateCarBtn:n}=this;t.disabled=!0,e.disabled=!0,n.disabled=!0}startCar(t,e){const n=l(".car__image",e),i=l(".wrapper-image",e).offsetWidth;n.style.transitionDuration=`${t}ms`,n.style.left=i-120+"px",this.changeDisableBtn(e,".car__btn-start",".car__btn-stop")}stopCar(t){const e=l(".car__image",t);e.style.transitionDuration="",e.style.left="70px",this.changeDisableBtn(t,".car__btn-stop",".car__btn-start")}breakCar(t){const e=l(".car__image",t),n=l(".wrapper-image",t).getBoundingClientRect().left,i=e.getBoundingClientRect().left;e.style.transitionDuration="",e.style.left=i-n+"px"}changeDisableBtn(t,e,n){const i=l(e,t),r=l(n,t);i.disabled=!0,r.disabled=!1}showModal(t,e){const{name:n,id:i}=t,r=(e/1e3).toFixed(2),s=c("modal"),a=c("modal__text"),o=c("modal__close");a.textContent=`${n} #${i} ${r}s`,s.classList.add("modal-show"),o.addEventListener("click",(()=>{s.classList.remove("modal-show")}),{once:!0})}disableAllBtn(t){Array.from(document.querySelectorAll(t)).forEach((t=>{if("BUTTON"!==t.tagName)throw new Error(`stop button is not button (${t.tagName})`);t.disabled=!0}))}disableBtn(t){const e=document.querySelector(t);if(!e)throw new Error("button is not exist");e.disabled=!0}enableBtn(t){const e=document.querySelector(t);if(!e)throw new Error("button is not exist");e.disabled=!1}disablePagination(t){if(!this.previousPage||!this.nextPage)throw new Error("this.previousPage or this.nextPage is not exist");const{currentPage:e,totalCount:n,limit:i}=t,r=this.previousPage,s=this.nextPage;r.disabled=1===e;const a=Math.ceil(n/i);s.disabled=a===e}},u=t=>{var e;const n=t.closest(".car");if(!n)throw new Error("selected car is not exist");const i=null===(e=n.dataset)||void 0===e?void 0:e.id;if(!i)throw new Error("selected car don't have id");return{car:n,numberId:+i}},g=t=>{const e=document.querySelector(`.car[data-id="${t}"]`);if(!e)throw new Error("selected car is not exist");return e};(new class{constructor(){this.controller=new s,this.view=new h,this.garagePage=1,this.winnersPage=1,this.timeObj={}}start(){const{controller:t,view:e}=this;e.drawContainer();const n=t=>e.drawGarage(t),i=t=>e.drawWinners(t);t.getCars(1,n);document.addEventListener("click",(r=>{var s,a,o,d;if(null===r.target)throw new Error("target is null");const c=r.target;if(c.closest("#toGarageBtn"))t.getCars(t.pageGarage,n);else if(c.closest("#toWinnersBtn"))t.getWinners(t.pageWinners,i,"id","ASC");else if(c.closest("#winners__time"))t.getWinnersByTime(i);else if(c.closest("#winners__wins"))t.getWinnersByWins(i);else if(c.closest("#create-car")){const i=null===(s=e.createCarColor)||void 0===s?void 0:s.value,r=null===(a=e.createCarName)||void 0===a?void 0:a.value;if(void 0===r||void 0===i)throw new Error("name or color is undefined");t.createCar(r,i,n)}else{if(c.closest("#update-car")){const i=null===(o=e.updateCarColor)||void 0===o?void 0:o.value,r=null===(d=e.updateCarName)||void 0===d?void 0:d.value;if(void 0===r||void 0===i||void 0===this.id)throw new Error("name or color or id is undefined");const{id:s}=this;return t.updateCar(s,r,i,n),void e.disableUpdateInputs()}if(c.closest(".car__btn-select")){const{numberId:n}=u(c);return this.id=n,void t.getCar(n,(t=>{e.changeUpdateInputs(t)}))}if(c.closest(".car__btn-remove")){const{numberId:e}=u(c);return this.id=e,void t.removeCar(e,n)}if(c.closest(".car__btn-start")){c.closest(".car__btn-start").disabled=!0;const{car:n,numberId:i}=u(c);return this.id=i,void t.startCar(i,(r=>{e.startCar(r,n),t.driveCar(i,(t=>{t||e.breakCar(n)}))}))}if(c.closest("#race")){this.timeObj={};let n=0;e.disableBtn("#race"),t.startRace((i=>{const{time:r,id:s}=i;this.timeObj[s]=r;const a=g(s);e.startCar(r,a),t.driveCar(s,(i=>{i?n||(n=s,t.getCar(s,(n=>{e.enableBtn("#reset"),e.showModal(n,this.timeObj[n.id]),t.addWinner(s,r)}))):e.breakCar(a)}))}))}if(c.closest("#reset")&&(e.disableBtn("#reset"),e.disableAllBtn(".car__btn-stop"),t.resetRace((t=>{const n=g(t);e.stopCar(n),e.enableBtn("#race")}))),c.closest(".car__btn-stop")){const{car:n,numberId:i}=u(c);return this.id=i,void t.stopCar(i,(()=>{e.stopCar(n)}))}if(c.closest("#generate-cars"))t.generateCars(n);else{if(c.closest("#pagination__next"))return t.isRenderGarage?void t.nextPage(n):void t.nextPage(i);if(c.closest("#pagination__previous")){if(t.isRenderGarage)return void t.prevPage(n);t.prevPage(i)}}}}))}}).start()})();