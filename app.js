const bikes = [
 {id:'ninja400',brand:'Kawasaki',name:'Ninja 400',category:'Sport',cc:399,year:2023,km:5200,price:159000,image:'photo-1580310614729-ccd69652491d',description:'สปอร์ตแฟริ่งในตระกูล Ninja สำหรับคนที่ชอบเส้นสายโฉบเฉี่ยวและการขี่ที่คล่องตัว ข้อมูลปี ระยะทาง และราคาเป็นตัวอย่างสำหรับสาธิตเว็บไซต์'},
 {id:'z900',brand:'Kawasaki',name:'Z900',category:'Naked',cc:948,year:2023,km:8400,price:289000,image:'photo-1580310614729-ccd69652491d',description:'เส้นสายดุดันในสไตล์ซูเปอร์เน็กเก็ต เหมาะกับคนที่ชอบการขี่คล่องตัวและบุคลิกที่ชัดเจน'},
 {id:'cbr650r',brand:'Honda',name:'CBR650R',category:'Sport',cc:649,year:2023,km:6200,price:279000,image:'photo-1568772585407-9361f9bf3a87',description:'สปอร์ตแฟริ่งเต็มคันที่ผสานความคล่องตัวกับรูปทรงโฉบเฉี่ยว สำหรับทุกวันและเส้นทางวันหยุด'},
 {id:'mt09',brand:'Yamaha',name:'MT-09',category:'Naked',cc:890,year:2022,km:11500,price:329000,image:'photo-1558981403-c5f9899a28bc',description:'ดีไซน์เน็กเก็ตในเมือง สำหรับคนที่ชอบตำแหน่งขี่สบายและคาแรกเตอร์ที่เป็นตัวเอง'},
 {id:'panigale',brand:'Ducati',name:'Panigale V2',category:'Sport',cc:955,year:2022,km:4800,price:659000,image:'photo-1568772585407-9361f9bf3a87',description:'รูปทรงสปอร์ตจากอิตาลี สำหรับผู้ที่หลงใหลในเส้นสายของรถซูเปอร์สปอร์ต'},
 {id:'gs',brand:'BMW',name:'R 1250 GS',category:'Adventure',cc:1254,year:2021,km:22400,price:729000,image:'photo-1558981806-ec527fa84c39',description:'แอดเวนเจอร์สำหรับนักเดินทางที่อยากออกไปสำรวจเส้นทางไกล พร้อมพื้นที่สำหรับสัมภาระและเรื่องราวใหม่'},
 {id:'bonneville',brand:'Triumph',name:'Bonneville T100',category:'Classic',cc:900,year:2022,km:7900,price:319000,image:'photo-1558981806-ec527fa84c39',description:'อารมณ์คลาสสิกที่เข้ากับการเดินทางแบบไม่เร่งรีบ สำหรับคนที่ชอบรายละเอียดเหนือกาลเวลา'}
];
const $ = (s) => document.querySelector(s);
const money = n => new Intl.NumberFormat('th-TH',{maximumFractionDigits:0}).format(n);
const photo = (b,w=900) => `https://images.unsplash.com/${b.image}?auto=format&fit=crop&w=${w}&q=85`;
let favorites = [];
try {const value=JSON.parse(localStorage.getItem('apex-favorites')||'[]');if(Array.isArray(value))favorites=value.filter(id=>bikes.some(b=>b.id===id));}catch{}
let category='all', savedOnly=false, toastTimer;
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2500);}
function save(id){favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];try{localStorage.setItem('apex-favorites',JSON.stringify(favorites));}catch{toast('เบราว์เซอร์ไม่อนุญาตให้บันทึกถาวร รายการนี้จะอยู่เฉพาะรอบการใช้งาน');}render();}
function render(){
 let filtered=bikes.filter(b=>(category==='all'||b.category===category)&&($('#brand').value==='all'||b.brand===$('#brand').value)&&($('#budget').value==='all'||b.price<=Number($('#budget').value))&&(!savedOnly||favorites.includes(b.id))&&(`${b.brand} ${b.name}`.toLowerCase().includes($('#search').value.trim().toLowerCase())));
 if($('#sort').value==='price-asc')filtered.sort((a,b)=>a.price-b.price);
 if($('#sort').value==='price-desc')filtered.sort((a,b)=>b.price-a.price);
 $('#results').textContent=`${savedOnly?'รายการโปรด · ':''}พบรถ ${filtered.length} คัน`;
 $('#saved-count').textContent=favorites.length;
 $('#saved-nav').setAttribute('aria-pressed',String(savedOnly));
 $('#bike-grid').innerHTML=filtered.length?filtered.map(b=>`<article class="bike-card"><div class="bike-photo"><img loading="lazy" src="${photo(b)}" alt="ภาพประกอบหมวด ${b.category} ไม่ใช่ภาพรถ ${b.brand} ${b.name} คันจริง"><span class="category-tag">${b.category.toUpperCase()}</span><button class="favorite" data-save="${b.id}" aria-label="${favorites.includes(b.id)?'นำออกจาก':'เพิ่มใน'}รายการโปรด ${b.brand} ${b.name}" aria-pressed="${favorites.includes(b.id)}">${favorites.includes(b.id)?'♥':'♡'}</button></div><div class="bike-info"><div class="bike-brand">${b.brand}</div><h3>${b.name}</h3><div class="specs"><span>ปี ${b.year}</span><span>·</span><span>${money(b.cc)} cc</span><span>·</span><span>${money(b.km)} กม.</span></div><div class="bike-bottom"><div><div class="price-label">ราคาตัวอย่าง</div><div class="price">${money(b.price)} <small>บาท</small></div></div><button class="detail-button" data-detail="${b.id}" aria-label="ดูรายละเอียด ${b.brand} ${b.name}">↗</button></div></div></article>`).join(''):'<div class="empty"><h3>ยังไม่พบคันที่ใช่</h3><p>ลองเปลี่ยนตัวกรอง หรือเพิ่มรถในรายการโปรด</p><button class="button orange" id="empty-reset">ดูรถทั้งหมด ↗</button></div>';
 document.querySelectorAll('[data-save]').forEach(el=>el.addEventListener('click',()=>save(el.dataset.save)));
 document.querySelectorAll('[data-detail]').forEach(el=>el.addEventListener('click',()=>showDetail(el.dataset.detail)));
 $('#empty-reset')?.addEventListener('click',reset);
}
function reset(){category='all';savedOnly=false;$('#search').value='';$('#brand').value='all';$('#budget').value='all';$('#sort').value='featured';updateTabs();render();}
function updateTabs(){document.querySelectorAll('[data-category]').forEach(el=>{el.classList.toggle('active',el.dataset.category===category);el.setAttribute('aria-pressed',String(el.dataset.category===category));});}
function showDetail(id){const b=bikes.find(b=>b.id===id);if(!b)return;
 $('#detail-content').innerHTML=`<img class="modal-image" src="${photo(b,1200)}" alt="ภาพประกอบสไตล์ ${b.category}"><div class="modal-body"><div class="eyebrow dark">${b.brand.toUpperCase()} / ${b.category.toUpperCase()}</div><h2>${b.brand} ${b.name}</h2><p>${b.description}</p><div class="modal-specs"><div><span>ปีตัวอย่าง</span><b>${b.year}</b></div><div><span>ความจุเครื่องยนต์ตัวอย่าง</span><b>${money(b.cc)} cc</b></div><div><span>ระยะทางตัวอย่าง</span><b>${money(b.km)} กม.</b></div></div><p>ข้อมูลและราคาใช้สาธิตเท่านั้น ภาพเป็นภาพประกอบ อาจไม่ตรงรุ่นหรือสีของรถ ยังไม่มีระบบจอง รับเงิน หรือติดต่อร้านจริง</p><div class="modal-actions"><div class="price">${money(b.price)} <small>บาท</small></div><button id="plan-bike" class="button orange">วางแผนงบคันนี้ ↗</button></div></div>`;
 $('#plan-bike').addEventListener('click',()=>{$('#price').value=b.price;estimate();$('#detail').close();$('#finance').scrollIntoView({behavior:'smooth'});});$('#detail').showModal();
}
function estimate(){const p=Number($('#price').value);if(!$('#price').validity.valid||!Number.isFinite(p)){$('#monthly').textContent='—';return;}$('#monthly').textContent=money(p*(1-Number($('#deposit').value)/100)/Number($('#months').value));}
$('#search').addEventListener('input',render);['brand','budget','sort'].forEach(id=>$('#'+id).addEventListener('change',render));
document.querySelectorAll('[data-category]').forEach(el=>el.addEventListener('click',()=>{category=el.dataset.category;updateTabs();render();}));
$('#reset').addEventListener('click',reset);
$('#saved-nav').addEventListener('click',()=>{savedOnly=!savedOnly;render();$('#inventory').scrollIntoView({behavior:'smooth'});});
$('#detail .close').addEventListener('click',()=>$('#detail').close());
$('#detail').addEventListener('click',e=>{if(e.target===$('#detail')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
$('#finance-form').addEventListener('submit',e=>e.preventDefault());['price','deposit','months'].forEach(id=>$('#'+id).addEventListener('input',estimate));
$('#year').textContent=new Date().getFullYear();updateTabs();render();estimate();
