/* ================================================================
   Anshumaan Singh — Premium Portfolio JS v30
   Canvas animations · Typing · Counters · Pipeline · Dark mode
   ================================================================ */
(function(){
'use strict';

/* ── LOADER ── */
const loader=document.getElementById('loader');
const fill=document.getElementById('loaderFill');
let prog=0;
const tick=setInterval(()=>{
  prog=Math.min(prog+Math.random()*14,95);
  if(fill)fill.style.width=prog+'%';
},80);
window.addEventListener('load',()=>{
  clearInterval(tick);
  if(fill)fill.style.width='100%';
  setTimeout(()=>{loader&&loader.classList.add('hidden');},380);
});

/* ── DARK MODE ── */
const darkBtn=document.getElementById('darkToggle');
const darkBtnMob=document.getElementById('darkToggleMob');
const stored=localStorage.getItem('theme');
if(stored==='dark'||(!stored&&window.matchMedia('(prefers-color-scheme:dark)').matches)){
  document.documentElement.setAttribute('data-theme','dark');
}
function toggleDark(){
  const isDark=document.documentElement.getAttribute('data-theme')==='dark';
  document.documentElement.setAttribute('data-theme',isDark?'light':'dark');
  localStorage.setItem('theme',isDark?'light':'dark');
  updateDarkIcons();
}
function updateDarkIcons(){
  const isDark=document.documentElement.getAttribute('data-theme')==='dark';
  [darkBtn,darkBtnMob].forEach(b=>{
    if(!b)return;
    b.innerHTML=isDark?
      '<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>':
      '<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  });
}
if(darkBtn)darkBtn.addEventListener('click',toggleDark);
if(darkBtnMob)darkBtnMob.addEventListener('click',toggleDark);
updateDarkIcons();

/* ── SCROLL PROGRESS ── */
const sbar=document.querySelector('.scroll-progress');
window.addEventListener('scroll',()=>{
  const h=document.documentElement;
  const pct=h.scrollTop/(h.scrollHeight-h.clientHeight)*100;
  if(sbar)sbar.style.width=pct+'%';
},{passive:true});

/* ── NAV SCROLL + SPY ── */
const nav=document.querySelector('.nav');
const sections=document.querySelectorAll('section[id]');
const navLinks=document.querySelectorAll('.nav-link');
window.addEventListener('scroll',()=>{
  if(nav)nav.classList.toggle('scrolled',window.scrollY>20);
  let cur='';
  sections.forEach(s=>{
    if(window.scrollY>=s.offsetTop-120)cur=s.id;
  });
  navLinks.forEach(l=>{
    l.classList.toggle('active',l.getAttribute('href')==='#'+cur);
  });
},{passive:true});

/* ── HAMBURGER ── */
const hbg=document.getElementById('hamburger');
const mm=document.getElementById('mobileMenu');
const mmClose=document.getElementById('mmClose');
const mmBg=document.getElementById('mmBg');
function openMM(){if(mm)mm.classList.add('open');}
function closeMM(){if(mm)mm.classList.remove('open');}
if(hbg)hbg.addEventListener('click',openMM);
if(mmClose)mmClose.addEventListener('click',closeMM);
if(mmBg)mmBg.addEventListener('click',closeMM);
document.querySelectorAll('.mm-link').forEach(l=>l.addEventListener('click',closeMM));

/* ── TYPING EFFECT ── */
const typed=document.getElementById('typedText');
const phrases=['DevSecOps Engineer','Cloud Security Engineer','Kubernetes Security Specialist','Security Automation Enthusiast','KubeAstronaut 🚀','Platform Security Engineer'];
let pi=0,ci=0,del=false,paused=false;
function typeLoop(){
  if(!typed)return;
  const phrase=phrases[pi];
  if(!del){
    typed.textContent=phrase.slice(0,ci+1);
    ci++;
    if(ci===phrase.length){del=true;setTimeout(typeLoop,2200);return;}
    setTimeout(typeLoop,60+Math.random()*30);
  }else{
    typed.textContent=phrase.slice(0,ci-1);
    ci--;
    if(ci===0){del=false;pi=(pi+1)%phrases.length;setTimeout(typeLoop,400);return;}
    setTimeout(typeLoop,28);
  }
}
typeLoop();

/* ── HERO CANVAS ── */
const canvas=document.getElementById('hero-canvas');
if(canvas){
  const ctx=canvas.getContext('2d');
  let W,H,nodes=[],particles=[];
  function resize(){
    W=canvas.width=canvas.offsetWidth;
    H=canvas.height=canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize',resize,{passive:true});

  // Kubernetes-style nodes
  class Node{
    constructor(){this.reset();}
    reset(){
      this.x=Math.random()*W;
      this.y=Math.random()*H;
      this.r=Math.random()*3+2;
      this.vx=(Math.random()-.5)*0.4;
      this.vy=(Math.random()-.5)*0.4;
      this.opacity=Math.random()*.5+.2;
      this.type=Math.floor(Math.random()*3);
    }
    update(){
      this.x+=this.vx;this.y+=this.vy;
      if(this.x<0||this.x>W)this.vx*=-1;
      if(this.y<0||this.y>H)this.vy*=-1;
    }
    draw(){
      ctx.save();
      ctx.globalAlpha=this.opacity;
      if(this.type===0){
        ctx.strokeStyle='rgba(124,58,237,0.4)';
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r+4,0,Math.PI*2);
        ctx.stroke();
      }
      ctx.fillStyle=this.type===0?'rgba(124,58,237,0.6)':this.type===1?'rgba(37,99,235,0.5)':'rgba(6,182,212,0.4)';
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      ctx.fill();
      ctx.restore();
    }
  }
  // Code particles
  class Particle{
    constructor(){this.reset();}
    reset(){
      this.x=Math.random()*W;
      this.y=Math.random()*H;
      this.char=['0','1','{}','<>','//','⎈','☁'][Math.floor(Math.random()*7)];
      this.vy=-Math.random()*.5-.2;
      this.vx=(Math.random()-.5)*.3;
      this.opacity=Math.random()*.25+.05;
      this.size=Math.random()*8+7;
      this.life=1;
    }
    update(){
      this.x+=this.vx;this.y+=this.vy;
      this.life-=0.003;
      if(this.life<=0||this.y<-20)this.reset();
    }
    draw(){
      ctx.save();
      ctx.globalAlpha=this.opacity*this.life;
      ctx.fillStyle='rgba(124,58,237,0.8)';
      ctx.font=this.size+'px JetBrains Mono,monospace';
      ctx.fillText(this.char,this.x,this.y);
      ctx.restore();
    }
  }

  for(let i=0;i<60;i++)nodes.push(new Node());
  for(let i=0;i<25;i++)particles.push(new Particle());

  let mx=W/2,my=H/2;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;},{passive:true});

  function draw(){
    ctx.clearRect(0,0,W,H);
    // connect close nodes
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<140){
          ctx.save();
          ctx.globalAlpha=(1-dist/140)*0.12;
          ctx.strokeStyle='rgba(124,58,237,1)';
          ctx.lineWidth=1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x,nodes[i].y);
          ctx.lineTo(nodes[j].x,nodes[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
    // mouse parallax
    nodes.forEach(n=>{
      const dx=(mx-n.x)*0.00005,dy=(my-n.y)*0.00005;
      n.vx+=dx;n.vy+=dy;
      n.vx=Math.max(-.8,Math.min(.8,n.vx));
      n.vy=Math.max(-.8,Math.min(.8,n.vy));
      n.update();n.draw();
    });
    particles.forEach(p=>{p.update();p.draw();});
    requestAnimationFrame(draw);
  }
  draw();
}

/* ── SCROLL REVEAL ── */
const revealEls=document.querySelectorAll('.reveal,.reveal-l,.reveal-r');
const ro=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const delay=e.target.dataset.delay||0;
      setTimeout(()=>e.target.classList.add('visible'),+delay);
    }
  });
},{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
revealEls.forEach(el=>ro.observe(el));

/* ── ANIMATED COUNTERS ── */
function animCounter(el,target,dur=1600,suffix=''){
  const start=performance.now();
  const from=0;
  function step(now){
    const t=Math.min((now-start)/dur,1);
    const eased=1-Math.pow(1-t,4);
    el.textContent=Math.round(from+(target-from)*eased)+(suffix||'');
    if(t<1)requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const counterObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const target=+e.target.dataset.target;
      const suffix=e.target.dataset.suffix||'';
      animCounter(e.target,target,1800,suffix);
      counterObs.unobserve(e.target);
    }
  });
},{threshold:0.5});
document.querySelectorAll('[data-target]').forEach(el=>counterObs.observe(el));

/* ── SECURITY BAR ANIMATIONS ── */
const barObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.pc-fill[data-w]').forEach(bar=>{
        setTimeout(()=>{bar.style.width=bar.dataset.w;},200);
      });
      barObs.unobserve(e.target);
    }
  });
},{threshold:0.3});
document.querySelectorAll('.posture-card').forEach(c=>barObs.observe(c));

/* ── PIPELINE INTERACTION ── */
const pipeStages=document.querySelectorAll('.pipe-stage');
const pipeDetail=document.getElementById('pipeDetail');
const pipeData={
  code:{title:'Code & PR Governance',desc:'All merges gated by PR review, CODEOWNERS approval, and required status checks. Branch protection enforced on main. Secret scanning with push protection blocks credential leaks before they enter git history. Signed commit enforcement across GitHub Enterprise org.',tags:['CODEOWNERS','Branch Protection','Secret Scanning','Push Protection','Signed Commits']},
  sast:{title:'SAST + SCA + IaC Scanning',desc:'Multi-language static analysis with Semgrep and CodeQL. Software composition analysis via Snyk and Trivy blocking Critical/High CVEs at build time. IaC scanning with Checkov prevents cloud misconfigurations before they reach any environment. Gitleaks + TruffleHog for secrets detection.',tags:['Semgrep','CodeQL','Snyk','Trivy','Checkov','Gitleaks','TruffleHog']},
  scan:{title:'Container Vulnerability Scanning',desc:'Dual-layer container scanning: Trivy + Prisma Cloud (twistcli). CVSS + EPSS triage eliminates noise and blocks only on exploitable risk. High-severity CVEs halt promotion. Custom threshold policies per environment criticality.',tags:['Trivy','Prisma Cloud','CVSS + EPSS Triage','OWASP ZAP','Kubesec']},
  sbom:{title:'SBOM Generation + Image Signing',desc:'SBOM generated with Syft in CycloneDX/SPDX format — all OS packages, language dependencies, and transitive deps with license metadata. Cosign keyless signing with Sigstore OIDC flow — no long-lived keys. Signatures and attestations attached as OCI artifacts.',tags:['Syft','CycloneDX','SPDX','Cosign','Sigstore','SLSA Level 2']},
  promote:{title:'Controlled Artifact Promotion',desc:'QA approves exact scanned image for UAT/Prod — no rebuilds. Immutable SHA256 digest pinning replaces mutable :latest tags. Registry gate verifies image exists in approved path and carries valid signature before allowing deployment. Zero drift between environments.',tags:['Immutable Digests','Registry Gate','Digest Verification','SLSA']},
  deploy:{title:'Kubernetes Admission + GitOps',desc:'Kyverno admission policies enforce: no-privilege execution, image registry allowlist, required labels, resource quotas, liveness/readiness probes. ArgoCD GitOps ensures declarative state. Helm manages chart versions. OPA Gatekeeper for cluster-wide constraint enforcement.',tags:['Kyverno','ArgoCD','Helm','OPA Gatekeeper','Network Policies']},
  monitor:{title:'Runtime Detection + DAST + Observability',desc:'Falco runtime threat detection with custom rules for container escape, crypto-mining, reverse shells, unexpected binaries. OWASP ZAP DAST post-deployment against live endpoints. Slack telemetry with commit SHA, build actor, image digest per deploy. 0 production security incidents.',tags:['Falco','OWASP ZAP','DAST','Slack Telemetry','SIEM','0 Incidents']}
};
pipeStages.forEach(s=>{
  s.addEventListener('click',()=>{
    pipeStages.forEach(x=>x.classList.remove('active'));
    s.classList.add('active');
    const key=s.dataset.stage;
    const d=pipeData[key];
    if(!d||!pipeDetail)return;
    pipeDetail.innerHTML=`<div class="pipe-dtitle">${d.title}</div><div class="pipe-ddesc">${d.desc}</div><div class="pipe-dtags">${d.tags.map(t=>`<span class="pipe-dtag">${t}</span>`).join('')}</div>`;
  });
});

/* ── CLOUD SECURITY INTERACTION ── */
const cloudItems=document.querySelectorAll('.cloud-item');
const cdPanel=document.getElementById('cloudDetail');
const cloudData={
  iam:{title:'IAM + Least Privilege',body:'Principle of least privilege enforced at every layer. Service accounts granted only what they need. Workload Identity Federation eliminates static key files. Conditional IAM bindings restrict access by time, IP, and resource tag. Regular access reviews automated.',tags:['IAM','Workload Identity','Service Accounts','Conditional Bindings']},
  vpc:{title:'VPC Service Controls + Network Security',body:'VPC Service Controls perimeters prevent data exfiltration from GCP APIs. Private Google Access for internal workloads. Firewall rules follow default-deny with explicit allowlists. Cloud NAT for controlled egress. VPN/interconnect for hybrid connectivity.',tags:['VPC-SC','Cloud Firewall','Cloud NAT','Private Access']},
  secrets:{title:'Secret Manager + Key Management',body:'All secrets stored in GCP Secret Manager with automatic rotation and audit logging. CMEK with Cloud KMS for data encryption at rest. Workload Identity for K8s pods to access secrets without static credentials. No plaintext secrets in config maps or env vars.',tags:['Secret Manager','Cloud KMS','CMEK','Automatic Rotation']},
  monitor:{title:'Security Command Center + Monitoring',body:'Security Command Center Premium for threat detection, vulnerability findings, and compliance posture. Cloud Logging captures all audit events with 90-day retention. Custom log-based metrics trigger alerts on anomalous activity. Cloud Monitoring dashboards for security KPIs.',tags:['SCC Premium','Cloud Logging','Cloud Monitoring','Audit Logs']},
  armor:{title:'Cloud Armor + DDoS Protection',body:'Cloud Armor WAF rules protect against OWASP Top 10. DDoS protection at the network edge. Adaptive protection for ML-based threat detection. Rate limiting rules per client IP. Pre-configured security policies for common attack patterns.',tags:['Cloud Armor','WAF','DDoS Protection','Rate Limiting']},
  org:{title:'Organization Policies + Compliance',body:'Org-level policy constraints enforce security baselines: disable service account key creation, require OS login, restrict resource locations, enforce uniform bucket access. CIS Google Cloud Benchmark compliance monitored continuously with automated remediation.',tags:['Org Policies','CIS GCP Benchmark','Resource Constraints','Compliance']}
};
cloudItems.forEach(item=>{
  item.addEventListener('click',()=>{
    cloudItems.forEach(x=>x.classList.remove('active'));
    item.classList.add('active');
    const key=item.dataset.cloud;
    const d=cloudData[key];
    if(!d||!cdPanel)return;
    cdPanel.innerHTML=`<div class="cdp-title">${d.title}</div><div class="cdp-body">${d.body}</div><div class="cdp-tags">${d.tags.map(t=>`<span class="cdp-tag">${t}</span>`).join('')}</div>`;
  });
});

/* ── TECH STACK TABS ── */
const techTabs=document.querySelectorAll('.tech-tab');
const techItems=document.querySelectorAll('.tech-item');
techTabs.forEach(tab=>{
  tab.addEventListener('click',()=>{
    techTabs.forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    const cat=tab.dataset.cat;
    techItems.forEach(item=>{
      const show=cat==='all'||item.dataset.cat===cat;
      item.style.display=show?'flex':'none';
      item.style.opacity=show?'1':'0';
    });
  });
});

/* ── CVE TICKER DUPLICATE ── */
const ctInner=document.querySelector('.ct-inner');
if(ctInner)ctInner.innerHTML+=ctInner.innerHTML;

/* ── PIPELINE DRAG SCROLL ── */
const pscroll=document.querySelector('.pipeline-scroll');
if(pscroll){
  let isDown=false,startX,sl;
  pscroll.addEventListener('mousedown',e=>{isDown=true;startX=e.pageX-pscroll.offsetLeft;sl=pscroll.scrollLeft;});
  pscroll.addEventListener('mouseleave',()=>isDown=false);
  pscroll.addEventListener('mouseup',()=>isDown=false);
  pscroll.addEventListener('mousemove',e=>{if(!isDown)return;e.preventDefault();const x=e.pageX-pscroll.offsetLeft;pscroll.scrollLeft=sl-(x-startX);});
}

/* ── TERMINAL TYPING ── */
const termLines=document.querySelectorAll('.term-type');
let termIdx=0;
function typeLine(){
  if(termIdx>=termLines.length)return;
  const el=termLines[termIdx];
  const text=el.dataset.text||'';
  el.textContent='';el.style.opacity='1';
  let ci=0;
  const t=setInterval(()=>{
    el.textContent+=text[ci]||'';
    ci++;
    if(ci>=text.length){clearInterval(t);termIdx++;setTimeout(typeLine,200);}
  },30);
}
const termObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){typeLine();termObs.unobserve(e.target);}
  });
},{threshold:0.3});
const termEl=document.querySelector('.terminal');
if(termEl)termObs.observe(termEl);

})();
