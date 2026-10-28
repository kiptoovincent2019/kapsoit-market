// Demo catalogue. Replace these products and the WhatsApp number for a real shop.
const SHOP_WHATSAPP = '254717452095';
const products = [
  {id:1,name:'Fresh farm eggs',detail:'Tray of 30 · Local farm',price:450,category:'Fresh picks',emoji:'🥚',tone:'cream',badge:'LOCAL FAVOURITE'},
  {id:2,name:'Maize flour',detail:'2 kg · Fortified',price:190,category:'Pantry',emoji:'🌽',tone:'yellow',badge:''},
  {id:3,name:'Kenyan tea leaves',detail:'250 g · Rich & bold',price:160,category:'Pantry',emoji:'🍵',tone:'green',badge:''},
  {id:4,name:'Fresh tomatoes',detail:'1 kg · Market fresh',price:120,category:'Fresh picks',emoji:'🍅',tone:'red',badge:'FRESH TODAY'},
  {id:5,name:'Cooking oil',detail:'1 litre · Everyday essential',price:320,category:'Pantry',emoji:'🫒',tone:'olive',badge:''},
  {id:6,name:'Laundry bar soap',detail:'800 g · Family size',price:110,category:'Home care',emoji:'🧼',tone:'blue',badge:''},
  {id:7,name:'Long-life milk',detail:'500 ml · Full cream',price:75,category:'Fresh picks',emoji:'🥛',tone:'sky',badge:''},
  {id:8,name:'Sukuma wiki',detail:'Fresh bunch · Picked today',price:50,category:'Fresh picks',emoji:'🥬',tone:'lime',badge:'FRESH TODAY'},
  {id:9,name:'Wheat flour',detail:'2 kg · Home baking',price:210,category:'Pantry',emoji:'🍞',tone:'sand',badge:''},
  {id:10,name:'Sugar',detail:'1 kg · White granulated',price:165,category:'Pantry',emoji:'🍚',tone:'pink',badge:''},
  {id:11,name:'Dishwashing liquid',detail:'500 ml · Lemon fresh',price:180,category:'Home care',emoji:'🧽',tone:'mint',badge:''},
  {id:12,name:'Bananas',detail:'Small bunch · Sweet & ripe',price:100,category:'Fresh picks',emoji:'🍌',tone:'yellow',badge:''},
  {id:13,name:'Chicken feed',detail:'Per kg · Sample price',price:40,category:'Animal feeds',emoji:'🐔',tone:'sand',badge:'KSh 40 / KG'},
  {id:14,name:'Cow feed',detail:'Dairy meal · Per kg · Sample price',price:55,category:'Animal feeds',emoji:'🐄',tone:'green',badge:'SAMPLE PRICE'},
  {id:15,name:'Rice',detail:'Per kg · Sample price',price:130,category:'Pantry',emoji:'🍚',tone:'cream',badge:'KSh 130 / KG'},
  {id:16,name:'Beans',detail:'Per kg · Sample price',price:180,category:'Pantry',emoji:'🫘',tone:'red',badge:'SAMPLE PRICE'}
];
const money = n => `KSh ${Number(n).toLocaleString('en-KE')}`;
let cart = JSON.parse(localStorage.getItem('karibu-cart') || '{}');
let activeCategory = 'All items';
const grid = document.querySelector('#productGrid');
const categoryNames = ['All items','Fresh picks','Pantry','Home care','Animal feeds'];
function renderCategories(){ document.querySelector('#categories').innerHTML=categoryNames.map(c=>`<button class="category-chip ${activeCategory===c?'active':''}" data-category="${c}">${c}</button>`).join(''); }
function renderProducts(){
 const term=document.querySelector('#search').value.trim().toLowerCase();
 const visible=products.filter(p=>(activeCategory==='All items'||p.category===activeCategory)&&(!term||`${p.name} ${p.detail} ${p.category}`.toLowerCase().includes(term)));
 grid.innerHTML=visible.length?visible.map(p=>`<article class="product-card"><div class="product-visual tone-${p.tone}">${p.badge?`<span class="product-badge">${p.badge}</span>`:''}<span class="product-emoji" aria-hidden="true">${p.emoji}</span><span class="visual-orbit"></span><span class="product-number">${String(p.id).padStart(2,'0')}</span></div><div class="product-info"><div><h3>${p.name}</h3><p>${p.detail}</p></div><button class="add-button" data-add="${p.id}" aria-label="Add ${p.name} to basket"><span>+</span><small>ADD</small></button></div><div class="product-price">${money(p.price)}</div></article>`).join(''):`<div class="no-results"><span>⌕</span><strong>No shelf matches just yet.</strong><p>Try another search or message us and we'll check for you.</p></div>`;
}
function save(){localStorage.setItem('karibu-cart',JSON.stringify(cart));renderCart();}
function add(id){cart[id]=(cart[id]||0)+1;save();toast(`${products.find(p=>p.id===id).name} added to your basket`);}
function changeQty(id,delta){cart[id]=(cart[id]||0)+delta;if(cart[id]<=0)delete cart[id];save();}
function cartData(){return Object.entries(cart).map(([id,qty])=>({product:products.find(p=>p.id===Number(id)),qty})).filter(x=>x.product);}
function renderCart(){const items=cartData(),count=items.reduce((s,x)=>s+x.qty,0),total=items.reduce((s,x)=>s+x.product.price*x.qty,0);document.querySelector('#cartCount').textContent=count;document.querySelector('#drawerCount').textContent=`(${count})`;document.querySelector('#subtotal').textContent=money(total);document.querySelector('#modalSubtotal').textContent=money(total);document.querySelector('#emptyCart').hidden=items.length>0;document.querySelector('#drawerBottom').hidden=items.length===0;document.querySelector('#cartItems').innerHTML=items.map(({product:p,qty})=>`<div class="cart-item"><div class="cart-item-emoji tone-${p.tone}">${p.emoji}</div><div class="cart-item-copy"><strong>${p.name}</strong><span>${money(p.price)} each</span><div class="quantity"><button data-qty="${p.id}" data-delta="-1" aria-label="Remove one ${p.name}">−</button><span>${qty}</span><button data-qty="${p.id}" data-delta="1" aria-label="Add one ${p.name}">+</button></div></div><strong class="line-total">${money(p.price*qty)}</strong></div>`).join('');}
const overlay=document.querySelector('#overlay'),drawer=document.querySelector('#cartDrawer');
function openCart(){overlay.hidden=false;drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');document.body.classList.add('locked');}
function closeCart(){drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');if(document.querySelector('#checkoutModal').hidden){overlay.hidden=true;document.body.classList.remove('locked');}}
function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=`✓  ${msg}`;document.body.append(t);setTimeout(()=>t.remove(),2400);}
function askUs(){const text=encodeURIComponent('Hi Kapsoit MARKET! I have a question about your products.');window.open(`https://wa.me/${SHOP_WHATSAPP}?text=${text}`,'_blank','noopener');}
document.querySelector('#categories').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(b){activeCategory=b.dataset.category;renderCategories();renderProducts();}});
document.querySelector('#search').addEventListener('input',renderProducts);
grid.addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(b)add(Number(b.dataset.add));});
document.querySelector('#cartItems').addEventListener('click',e=>{const b=e.target.closest('[data-qty]');if(b)changeQty(Number(b.dataset.qty),Number(b.dataset.delta));});
document.querySelector('#cartOpen').addEventListener('click',openCart);document.querySelector('#cartClose').addEventListener('click',closeCart);overlay.addEventListener('click',closeCart);document.querySelector('#continueShopping').addEventListener('click',closeCart);
document.querySelector('#checkout').addEventListener('click',()=>{closeCart();document.querySelector('#checkoutModal').hidden=false;document.body.classList.add('locked');});
document.querySelector('#modalClose').addEventListener('click',()=>{document.querySelector('#checkoutModal').hidden=true;document.body.classList.remove('locked');});
document.querySelector('#checkoutModal').addEventListener('click',e=>{if(e.target.id==='checkoutModal'){e.currentTarget.hidden=true;document.body.classList.remove('locked');}});
document.querySelector('#orderForm').addEventListener('submit',e=>{e.preventDefault();const form=new FormData(e.currentTarget),items=cartData();if(!items.length)return;const lines=items.map(({product,qty})=>`• ${product.name} × ${qty} — ${money(product.price*qty)}`);const total=items.reduce((s,x)=>s+x.product.price*x.qty,0);const msg=`Hi Kapsoit MARKET! I'd like to place an order.\n\n${lines.join('\n')}\n\nItems subtotal: ${money(total)}\n\nName: ${form.get('name')}\nPhone: ${form.get('phone')}\nDelivery location: ${form.get('location')}${form.get('notes')?`\nNotes: ${form.get('notes')}`:''}\n\nPlease confirm availability, delivery fee and payment options. I understand this is a demo shop order.`;window.open(`https://wa.me/${SHOP_WHATSAPP}?text=${encodeURIComponent(msg)}`,'_blank','noopener');document.querySelector('#checkoutModal').hidden=true;document.body.classList.remove('locked');});
document.querySelector('#askUs').addEventListener('click',askUs);document.querySelector('#catalogueAsk').addEventListener('click',askUs);
renderCategories();renderProducts();renderCart();
