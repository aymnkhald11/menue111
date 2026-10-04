/* ============ عدّل هنا ============
   الصور: ضع الصور في مجلد اسمه images بجانب هذا الملف، واكتب اسم الصورة في img
   اللوجو: ضع ملف images/logo.png (لو مش موجود يظهر أول حرف من الاسم)
================================== */
const CFG={
  name:"مطعم الذوق الرفيع", en:"Le Gourmet Restaurant",
  sub:"تجربة طعام راقية بنكهات أصيلة",
  logo:"images/logo.png", currency:"ج.م", foot:"الأسعار بالجنيه المصري وتشمل الضريبة"
};
const MENU=[
{cat:"الأطباق الرئيسية",items:[
 {n:"كباب مشوي",d:"قطع كباب طازجة مشوية على الفحم، تُقدم مع أرز بالشعيرية وسلطة وطحينة.",p:260,img:"images/kebab.jpg",tag:"الأكثر طلباً"},
 {n:"فراخ مشوية",d:"نص فرخة متبلة بالأعشاب والليمون، مع بطاطس محمرة.",p:180,img:"images/chicken.jpg"},
 {n:"ستيك لحم",d:"قطعة ستيك طرية مع صوص المشروم وخضار سوتيه.",p:340,img:"images/steak.jpg",tag:"جديد"},
 {n:"سمك مشوي",d:"سمك طازج مشوي مع الأرز الأحمر وسلطة الطحينة.",p:290,img:"images/fish.jpg"}]},
{cat:"المقبلات",items:[
 {n:"حمص بالطحينة",d:"حمص ناعم مع زيت الزيتون والبقدونس.",p:35,img:"images/hummus.jpg"},
 {n:"سلطة يونانية",d:"خضار طازجة مع جبنة فيتا وزيتون.",p:55,img:"images/salad.jpg"},
 {n:"بطاطس مقرمشة",d:"بطاطس ذهبية مع صوص خاص.",p:40,img:"images/fries.jpg"}]},
{cat:"المشروبات",items:[
 {n:"عصير ليمون بالنعناع",d:"ليمون طازج مع النعناع والثلج.",p:35,img:"images/lemon.jpg"},
 {n:"عصير مانجو",d:"مانجو طبيعي بدون إضافات.",p:45,img:"images/mango.jpg"},
 {n:"قهوة تركي",d:"قهوة محوّجة على الطريقة التقليدية.",p:25,img:"images/coffee.jpg"}]},
{cat:"الحلويات",items:[
 {n:"أم علي",d:"أم علي ساخنة بالمكسرات والقشطة.",p:55,img:"images/omali.jpg",tag:"الأكثر طلباً"},
 {n:"كنافة بالقشطة",d:"كنافة مقرمشة بالقشطة والقطر.",p:50,img:"images/kunafa.jpg"},
 {n:"تشيز كيك",d:"تشيز كيك كريمي بصوص التوت.",p:70,img:"images/cheesecake.jpg"}]}
];

const $=id=>document.getElementById(id);
const FORK='<svg viewBox="0 0 24 24" fill="none" stroke="#f77f00" stroke-width="1.4" stroke-linecap="round"><path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 21V3c-2 1-3.5 4-3.5 8h3.5"/></svg>';
document.title="منيو "+CFG.name;
$("name").textContent=CFG.name;$("en").textContent=CFG.en;$("sub").textContent=CFG.sub;$("foot").textContent=CFG.foot;
const lg=$("logo"),sp=document.createElement("span"),li=new Image();
sp.textContent=CFG.name.replace(/^مطعم\s*/,"").charAt(0);lg.appendChild(sp);
li.onload=()=>{sp.textContent="";sp.appendChild(li)};li.alt=CFG.name;li.src=CFG.logo;

function photo(it,cls){
  const ph=document.createElement("div");ph.className=cls||"ph";
  ph.innerHTML=FORK;
  if(it.img){
    const base=it.img.replace(/\.(jpe?g|png|webp)$/i,"");
    const tries=/^https?:/i.test(it.img)?[it.img]:[it.img,base+".jpeg",base+".png",base+".webp",base+".JPG"];
    const im=new Image();im.alt=it.n;let k=0;
    im.onload=()=>{ph.querySelector("svg")?.remove();ph.prepend(im)};
    im.onerror=()=>{k++;if(k<tries.length)im.src=tries[k]};
    im.src=tries[0];
  }
  return ph;
}
const nav=$("nav"),main=$("main");
MENU.forEach((s,i)=>{
  const b=document.createElement("button");b.textContent=s.cat;b.onclick=()=>document.getElementById("s"+i).scrollIntoView();nav.appendChild(b);
  const h=document.createElement("h2");h.id="s"+i;h.style.scrollMarginTop="72px";h.textContent=s.cat;main.appendChild(h);
  const g=document.createElement("div");g.className="grid";
  s.items.forEach(it=>{
    const c=document.createElement("div");c.className="card";
    const ph=photo(it);
    if(it.tag){const t=document.createElement("span");t.className="badge";t.textContent=it.tag;ph.appendChild(t)}
    const inf=document.createElement("div");inf.className="info";
    inf.innerHTML="<h3></h3><p></p><div class='price'></div>";
    inf.children[0].textContent=it.n;inf.children[1].textContent=it.d;
    inf.children[2].innerHTML=it.p+" <small>"+CFG.currency+"</small>";
    c.append(ph,inf);c.onclick=()=>open(it);g.appendChild(c);
  });
  main.appendChild(g);
});
function open(it){
  const sh=$("sheet");sh.innerHTML="";
  const w=document.createElement("div");w.className="wrap";
  const x=document.createElement("button");x.className="close";x.textContent="✕";x.onclick=close;
  w.append(x,photo(it));
  const b=document.createElement("div");b.className="body";
  b.innerHTML="<h3></h3><p></p><div class='price'></div>";
  b.children[0].textContent=it.n;b.children[1].textContent=it.d;
  b.children[2].innerHTML=it.p+" <small>"+CFG.currency+"</small>";
  sh.append(w,b);$("modal").classList.add("on");document.body.style.overflow="hidden";
}
function close(){$("modal").classList.remove("on");document.body.style.overflow=""}
$("modal").onclick=e=>{if(e.target.id==="modal")close()};
addEventListener("keydown",e=>{if(e.key==="Escape")close()});
const secs=[...document.querySelectorAll("h2")],btns=[...nav.children];
addEventListener("scroll",()=>{let k=0;secs.forEach((h,i)=>{if(h.getBoundingClientRect().top<140)k=i});
  btns.forEach((b,i)=>{b.classList.toggle("on",i===k);if(i===k)b.scrollIntoView({inline:"center",block:"nearest"})})},{passive:true});
btns[0].classList.add("on");
