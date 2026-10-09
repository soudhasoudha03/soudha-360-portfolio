import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BriefcaseBusiness, Code2, Database, Download, Github, GraduationCap, Heart, Mail, Menu, Monitor, RotateCcw, Send, Sparkles, Wrench, X, Linkedin, Languages, ShoppingCart, UserRound, Layers3 } from 'lucide-react';
import './styles.css';

const profile = {
  name: 'Soudha VM', role: 'MERN + Python Full Stack Developer', email: 'soudhavm23@gmail.com', phone: '6238657241', location: 'Calicut, Kerala',
  linkedin: 'https://linkedin.com/in/soudha-v-m-414276367', github: 'https://github.com/soudha03',
  summary: 'MERN and Python Full Stack Developer with practical experience in backend development, REST API development, database integration, authentication, and e-commerce workflows. Hands-on experience with Node.js, Express.js, MongoDB, React.js, Python, Django, Flask, and FastAPI through structured internships and team-based project development.'
};
const panels = [
  { id:'home', label:'Home', title:'Hello, I’m', icon:Sparkles },
  { id:'about', label:'About', title:'A little about me', icon:UserRound },
  { id:'skills', label:'Skills', title:'My tech stack', icon:Code2 },
  { id:'experience', label:'Experience', title:'Where I’ve grown', icon:BriefcaseBusiness },
  { id:'projects', label:'Projects', title:'Things I’ve built', icon:Layers3 },
  { id:'education', label:'Education', title:'Learning journey', icon:GraduationCap },
  { id:'contact', label:'Contact', title:'Let’s connect', icon:Mail }
];
const skills = [
  ['Programming & Frameworks','Python, JavaScript, Node.js, Express.js, React.js, Django, Flask, FastAPI',Code2],
  ['Frontend','HTML5, CSS3, JavaScript, React.js',Monitor],
  ['Backend & APIs','REST APIs, Authentication, JWT, Middleware, CRUD, frontend-backend integration',Layers3],
  ['Databases','MongoDB, PostgreSQL, MySQL',Database],
  ['Tools & Deployment','Git, GitHub, Docker, AWS, Heroku',Wrench]
];
const experience = [
  { role:'Backend Developer Intern', company:'Fedgix Technologies', date:'11 Aug 2026 – Present', desc:'Worked on e-commerce backend modules including Cart, Wishlist, Coupon, Checkout, Order, and Payment functionality.', tags:['Node.js','Express.js','MongoDB'] },
  { role:'Web Development Intern', company:'Astrobyte Technologies', date:'10 Jun 2026 – 24 Jun 2026', desc:'Completed a 14-day internship focused on web development concepts, assigned tasks, and implementation workflows.', tags:['Web Development','Implementation'] },
  { role:'Python and MERN Full Stack Development Intern', company:'Gen Corpus Data Hub, Calicut', date:'19 May 2025 – 31 Jan 2026', desc:'Completed an industry-oriented internship with hands-on exposure to API development, frontend-backend integration, and deployment.', tags:['MERN','Next.js','FastAPI'] }
];
const education = [
  ['Diploma in Python and MERN Full Stack Development','Gen Corpus Data Hub, Calicut','2025'],
  ['Diploma in Hospital Administration','International School of Skill Development, Kochin','2022'],
  ['Bachelor of Arts in Public Administration','Rajiv Gandhi Memorial Government Arts and Science College, Attappady, Palakkad','2022'],
  ['Plus Two','Government Vocational Higher Secondary School, Agali','2019']
];

function App(){
  const [active,setActive] = useState(0); const [rotation,setRotation] = useState(0); const [menuOpen,setMenuOpen] = useState(false);
  const startX = useRef(null); const startY = useRef(null); const wheelLock = useRef(false);
  const step = 360 / panels.length;
  const go = useCallback((index)=>{ const next=(index+panels.length)%panels.length; setActive(next); setRotation(-next*step); setMenuOpen(false); },[step]);
  const next=()=>go(active+1); const prev=()=>go(active-1);
  useEffect(()=>{const key=(e)=>{if(e.key==='ArrowRight') next(); if(e.key==='ArrowLeft') prev(); if(e.key==='Home')go(0);}; window.addEventListener('keydown',key); return ()=>window.removeEventListener('keydown',key);});
  const onWheel=(e)=>{if(wheelLock.current)return; wheelLock.current=true; if(e.deltaY>12||e.deltaX>12)next(); else if(e.deltaY< -12||e.deltaX< -12)prev(); setTimeout(()=>wheelLock.current=false,650);};
  const onPointerDown=(e)=>{startX.current=e.clientX; startY.current=e.clientY;};
  const onPointerUp=(e)=>{if(startX.current===null)return; const dx=e.clientX-startX.current; const dy=e.clientY-startY.current; if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)){dx<0?next():prev();} startX.current=null; startY.current=null;};
  const activePanel=panels[active];
  return <main className="site" onWheel={onWheel}>
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/><div className="grid-floor"/>
    <header className="topbar"><button className="brand" onClick={()=>go(0)} aria-label="Go home"><span className="brand-mark">SV<span>.</span></span><span><b>SOUDHA <em>VM</em></b><small>MERN + Python Full Stack Developer</small></span></button>
      <nav className={menuOpen?'nav nav-open':'nav'}>{panels.map((p,i)=><button key={p.id} onClick={()=>go(i)} className={i===active?'nav-link selected':'nav-link'}>{p.label}</button>)}</nav>
      <button className="menu-toggle" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen?<X/>:<Menu/>}</button>
    </header>
    <section className="stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
      <div className="orbit orbit-back"/><div className="orbit orbit-front"/><div className="platform"><span>360°</span><i/></div>
      <div className="carousel" style={{'--rotation':`${rotation}deg`,'--panel-count':panels.length}}>
        {panels.map((p,i)=>{const Icon=p.icon; return <article key={p.id} className={`panel panel-${p.id} ${i===active?'panel-active':''}`} style={{'--angle':`${i*step}deg`}} aria-hidden={i!==active}>
          <div className="panel-heading"><span className="panel-icon"><Icon size={19}/></span><div><small>0{i+1} / 0{panels.length}</small><h2>{p.title}</h2></div></div>
          <div className="panel-content">{p.id==='home'&&<Home go={go}/>}{p.id==='about'&&<About/>}{p.id==='skills'&&<Skills/>}{p.id==='experience'&&<Experience/>}{p.id==='projects'&&<Projects/>}{p.id==='education'&&<Education/>}{p.id==='contact'&&<Contact/>}</div>
          <div className="panel-footer"><span>SOUDHA VM</span><span>{p.label.toUpperCase()}</span></div>
        </article>})}
      </div>
      <div className="side-hint hint-left"><ArrowLeft size={15}/> DRAG TO ROTATE</div><div className="side-hint hint-right">EXPLORE <ArrowRight size={15}/></div>
    </section>
    <div className="controls"><button className="round-control" onClick={prev} aria-label="Previous section"><ArrowLeft/></button><div className="dots">{panels.map((p,i)=><button key={p.id} className={i===active?'dot active-dot':'dot'} onClick={()=>go(i)} aria-label={`Go to ${p.label}`} title={p.label}/>)}</div><button className="round-control" onClick={next} aria-label="Next section"><ArrowRight/></button><button className="reset-control" onClick={()=>go(0)}><RotateCcw size={14}/> Reset view</button></div>
    <footer className="footer"><div className="footer-script">Code <span>·</span> Build <span>·</span> Grow</div><div className="footer-center"><span className="status-dot"/> {activePanel.label} <span className="footer-muted">/ 360° portfolio</span></div><div className="footer-social"><a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={17}/></a><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a></div></footer>
    <div className="mobile-tip"><ArrowLeft size={14}/> Swipe or use arrows to rotate <ArrowRight size={14}/></div>
  </main>
}
function Home({go}){return <div className="home-content"><div className="eyebrow"><span/> AVAILABLE TO CONNECT</div><p className="hello">HELLO, I’M</p><h1>SOUDHA <span>VM</span></h1><h3>{profile.role}</h3><p className="intro">Building practical web experiences with modern technologies, thoughtful APIs, and a passion for clean code.</p><div className="social-row"><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a><a href={`mailto:${profile.email}`} aria-label="Email"><Mail/></a></div><div className="home-actions"><button className="primary-btn" onClick={()=>go(4)}>Explore my work <ArrowUpRight size={17}/></button><button className="ghost-btn" onClick={()=>go(6)}>Let’s talk <Send size={15}/></button></div><div className="portrait-wrap"><div className="portrait-ring"/><div className="portrait-orbit"/><div className="portrait-placeholder"><img src="/soudha-profile.jpeg" alt="Soudha VM — MERN and Python Full Stack Developer" className="portrait-photo" /></div><div className="float-chip chip-code"><Code2 size={15}/> Clean code</div><div className="float-chip chip-api"><Database size={15}/> REST APIs</div></div><div className="home-bottom"><span><Sparkles size={14}/> Curious by nature</span><span>SCROLL TO EXPLORE <ArrowDown size={14}/></span></div></div>}
function About(){return <div className="about-content"><p className="lead">I enjoy turning complex problems into <span>simple, useful solutions.</span></p><p>{profile.summary}</p><div className="stat-grid"><div><b>3</b><span>Internship experiences</span></div><div><b>5+</b><span>Core technologies</span></div><div><b>API</b><span>Backend-focused</span></div></div><div className="quote-card"><Sparkles size={20}/><p>“Learn consistently. Build thoughtfully. Improve every day.”</p></div><div className="detail-line"><span>LOCATION</span><b>{profile.location}</b></div><div className="detail-line"><span>FOCUS</span><b>Backend · Full Stack · APIs</b></div></div>}
function Skills(){return <div className="skills-list">{skills.map(([title,desc,Icon],i)=><div className="skill-item" key={title}><div className={`skill-icon si-${i}`}><Icon size={19}/></div><div className="skill-text"><h3>{title}</h3><p>{desc}</p><div className="skill-track"><i style={{width:[92,86,90,82,75][i]+'%'}}/></div></div></div>)}<div className="tag-row"><span>Problem solving</span><span>Debugging</span><span>Git workflow</span></div></div>}
function Experience(){return <div className="timeline">{experience.map((e,i)=><div className="timeline-item" key={e.company}><div className="timeline-pin"/><div className="timeline-meta"><span>0{i+1}</span><time>{e.date}</time></div><h3>{e.role}</h3><h4>{e.company}</h4><p>{e.desc}</p><div className="tag-row">{e.tags.map(t=><span key={t}>{t}</span>)}</div></div>)}<div className="resume-note"><BriefcaseBusiness size={17}/> Practical, project-based learning</div></div>}
function Projects(){return <div className="project-content"><div className="project-feature"><div className="project-visual project-image-visual"><img src="/portfolio-preview.png" alt="Soudha VM 360-degree portfolio design preview"/><div className="preview-caption">360° PORTFOLIO CONCEPT</div></div><div className="project-label"><span>FEATURED PROJECT</span><span className="project-status"><i/> BACKEND</span></div><h3>E-commerce Web Application</h3><p>Developed backend features for cart management, wishlist, coupons, checkout, orders, and payment-related APIs.</p><div className="tag-row"><span>Node.js</span><span>Express.js</span><span>MongoDB</span><span>Git/GitHub</span></div></div><div className="project-capabilities"><h4>CORE FEATURES</h4>{['Cart & wishlist management','Coupon and checkout workflows','Order and payment APIs','Authentication & protected routes'].map((x,i)=><div key={x}><span>0{i+1}</span>{x}<ArrowUpRight size={14}/></div>)}</div><div className="project-note"><Heart size={16}/> Built with a focus on reliable backend workflows.</div></div>}
function Education(){return <div className="education-content"><div className="education-intro"><GraduationCap size={28}/><p>Every step adds a new layer to my journey.</p></div><div className="education-list">{education.map(([degree,school,year],i)=><div className="education-item" key={degree}><div className="edu-year">{year}</div><div className="edu-copy"><h3>{degree}</h3><p>{school}</p></div><span className="edu-index">0{i+1}</span></div>)}</div><div className="languages"><h4><Languages size={17}/> LANGUAGES</h4><div className="language-pills">{['English','Malayalam','Tamil','Kannada'].map(l=><span key={l}>{l}</span>)}</div></div></div>}
function Contact(){return <div className="contact-content"><p className="lead">Have an idea? Let’s make it <span>real.</span></p><p>I’m happy to connect about development, collaboration, and new opportunities.</p><a className="contact-card" href={`mailto:${profile.email}`}><span className="contact-icon"><Mail/></span><span><small>EMAIL ME AT</small><b>{profile.email}</b></span><ArrowUpRight/></a><a className="contact-card" href={profile.linkedin} target="_blank" rel="noreferrer"><span className="contact-icon"><Linkedin/></span><span><small>CONNECT ON</small><b>LinkedIn profile</b></span><ArrowUpRight/></a><a className="contact-card" href={profile.github} target="_blank" rel="noreferrer"><span className="contact-icon"><Github/></span><span><small>EXPLORE MY CODE</small><b>GitHub profile</b></span><ArrowUpRight/></a><div className="contact-location"><span className="status-dot"/> Based in {profile.location}</div><a className="primary-btn mail-cta" href={`mailto:${profile.email}?subject=Portfolio%20enquiry`}>Send a message <Send size={16}/></a></div>}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
