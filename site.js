// ===== SHARED SITE JS =====

// Load config
function getCfg(){return JSON.parse(localStorage.getItem('gmas_config')||'{}');}

// Apply brand config to page
function applyConfig(){
  const cfg=getCfg();
  if(cfg.colorSky)document.documentElement.style.setProperty('--sky',cfg.colorSky);
  if(cfg.colorRed)document.documentElement.style.setProperty('--red',cfg.colorRed);
  if(cfg.colorDark)document.documentElement.style.setProperty('--dark',cfg.colorDark);
  if(cfg.siteName)document.querySelectorAll('.logo-name').forEach(e=>e.textContent=cfg.siteName);
  if(cfg.siteTagline)document.querySelectorAll('.logo-tag').forEach(e=>e.textContent=cfg.siteTagline);
  if(cfg.footerDesc)document.querySelectorAll('.footer-brand-desc').forEach(e=>e.textContent=cfg.footerDesc);
  if(cfg.logoBase64){
    document.querySelectorAll('.logo-icon').forEach(el=>{
      el.innerHTML=`<img src="${cfg.logoBase64}" style="width:32px;height:32px;object-fit:contain;position:relative;z-index:2;" />`;
    });
  }
  if(cfg.contactPhone){
    document.querySelectorAll('[data-cfg="phone"]').forEach(e=>e.innerHTML=cfg.contactPhone);
  }
  if(cfg.contactAddr){
    document.querySelectorAll('[data-cfg="addr"]').forEach(e=>e.textContent=cfg.contactAddr);
  }
}

// Navbar scroll behavior
function initNavScroll(isHero){
  const nav=document.getElementById('mainNav');
  if(!nav)return;
  if(!isHero){nav.classList.add('dark-nav');return;}
  function onScroll(){
    if(window.scrollY>80){nav.classList.add('dark-nav');nav.classList.remove('light-nav');}
    else{nav.classList.remove('dark-nav');}
  }
  window.addEventListener('scroll',onScroll);
  onScroll();
}

// Mobile nav
function initMobileNav(){
  const toggle=document.getElementById('navToggle');
  const links=document.getElementById('navLinks');
  const overlay=document.getElementById('navOverlay');
  function closeNav(){links.style.cssText='';overlay.classList.remove('active');toggle?.classList.remove('open');}
  toggle?.addEventListener('click',()=>{
    const isOpen=links.style.display==='flex';
    if(isOpen){closeNav();}else{
      links.style.cssText='display:flex;position:fixed;top:0;right:0;bottom:0;width:290px;flex-direction:column;background:#0C1A2E;padding:100px 1.5rem 2rem;z-index:1099;box-shadow:-4px 0 40px rgba(0,0,0,0.6);list-style:none;gap:0.3rem;';
      overlay.classList.add('active');toggle.classList.add('open');
    }
  });
  overlay?.addEventListener('click',closeNav);
}

// FAQ accordion
function initFaq(){
  document.querySelectorAll('.faq-q').forEach(q=>{
    q.addEventListener('click',()=>{
      const item=q.parentElement;
      const wasOpen=item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
      if(!wasOpen)item.classList.add('open');
    });
  });
}

// Counter animation
function animateCounters(){
  document.querySelectorAll('.count-anim').forEach(el=>{
    if(el.dataset.animated)return;
    el.dataset.animated='1';
    const target=parseInt(el.dataset.target);
    if(!target)return;
    let start=0;const dur=2000;const step=target/(dur/16);
    const t=setInterval(()=>{start+=step;if(start>=target){el.textContent=target.toLocaleString();clearInterval(t);}else{el.textContent=Math.floor(start).toLocaleString();}},16);
  });
}

// Page cover builder (for inner pages)
function buildPageCover(pageKey){
  const cfg=getCfg();
  const covers=cfg.pageCovers||{};
  const cover=covers[pageKey];
  const bgEl=document.getElementById('coverBg');
  const overlayEl=document.getElementById('coverOverlay');
  if(!bgEl||!overlayEl)return;
  if(cover&&cover.bg){bgEl.style.backgroundImage=`url('${cover.bg}')`;overlayEl.style.background=cover.overlay||'rgba(10,20,40,0.75)';}
  else{
    const defaults={
      services:{bg:'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80',overlay:'rgba(10,20,40,0.78)'},
      training:{bg:'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&q=80',overlay:'rgba(10,15,30,0.76)'},
      about:{bg:'https://images.unsplash.com/photo-1560472355-536de3962603?w=1600&q=80',overlay:'rgba(8,18,38,0.78)'},
      contact:{bg:'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80',overlay:'rgba(10,20,40,0.76)'},
      enquiry:{bg:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80',overlay:'rgba(5,15,30,0.78)'},
    };
    const d=defaults[pageKey]||{bg:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80',overlay:'rgba(10,20,40,0.78)'};
    bgEl.style.backgroundImage=`url('${d.bg}')`;
    overlayEl.style.background=d.overlay;
  }
}

// Init on load
document.addEventListener('DOMContentLoaded',()=>{
  applyConfig();
  initMobileNav();
  initFaq();
  const statsBand=document.getElementById('statsBand');
  if(statsBand){
    const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){animateCounters();obs.disconnect();}});},{threshold:0.3});
    obs.observe(statsBand);
  }
});
