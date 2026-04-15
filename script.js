/* ── VISITOR COUNTER ─────────────────────── */
(function(){
  const el=document.getElementById("visitorCount");
  if(!el)return;
  let count=parseInt(localStorage.getItem("imc_visits")||"847",10);
  if(!sessionStorage.getItem("imc_s")){count++;localStorage.setItem("imc_visits",count);sessionStorage.setItem("imc_s","1");}
  const from=Math.max(0,count-40),t0=performance.now();
  function tick(now){const p=Math.min((now-t0)/1400,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(from+(count-from)*e).toLocaleString();if(p<1)requestAnimationFrame(tick);}
  setTimeout(()=>requestAnimationFrame(tick),1000);
})();

/* ── DARK MODE ───────────────────────────── */
const html=document.documentElement;
const themeBtn=document.getElementById("themeToggle");
function applyTheme(t){html.setAttribute("data-theme",t);localStorage.setItem("imc-theme",t);}
const saved=localStorage.getItem("imc-theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
applyTheme(saved);
themeBtn?.addEventListener("click",()=>applyTheme(html.getAttribute("data-theme")==="dark"?"light":"dark"));

/* ── SCROLL REVEAL ───────────────────────── */
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");obs.unobserve(e.target);}}),{threshold:.14,rootMargin:"0px 0px -36px 0px"});
document.querySelectorAll(".reveal").forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i*75,300)}ms`;obs.observe(el);});

/* ── CONTACT FORM ────────────────────────── */
document.getElementById("formSubmit")?.addEventListener("click",()=>{
  const n=document.getElementById("fname")?.value.trim();
  const em=document.getElementById("femail")?.value.trim();
  const s=document.getElementById("fsubject")?.value.trim();
  const m=document.getElementById("fmessage")?.value.trim();
  if(!n||!em||!m){
    ["fname","femail","fmessage"].forEach(id=>{const el=document.getElementById(id);if(el&&!el.value.trim()){el.style.borderColor="var(--accent)";el.style.animation="shake .35s ease";el.addEventListener("animationend",()=>{el.style.animation="";},{once:true});}});
    return;
  }
  window.location.href=`mailto:ishimwecynthia6@gmail.com?subject=${encodeURIComponent(s||"Portfolio Contact")}&body=${encodeURIComponent(`Name: ${n}\nEmail: ${em}\n\n${m}`)}`;
  document.getElementById("contactForm").classList.add("hidden");
  document.getElementById("formSuccess").classList.remove("hidden");
  setTimeout(()=>{document.getElementById("formSuccess").classList.add("hidden");document.getElementById("contactForm").classList.remove("hidden");["fname","femail","fsubject","fmessage"].forEach(id=>{const el=document.getElementById(id);if(el)el.value="";});},4000);
});
const ss=document.createElement("style");
ss.textContent="@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}75%{transform:translateX(7px)}}";
document.head.appendChild(ss);

/* ── i18n ────────────────────────────────── */
const langBtns=document.querySelectorAll(".lang-btn");
const i18nEls=document.querySelectorAll("[data-i18n]");
const T={
  en:{
    "nav.about":"About","nav.experience":"Experience","nav.skills":"Skills","nav.contact":"Contact","nav.cta":"Let's Talk",
    "hero.eyebrow":"Portfolio / Rwanda","hero.title":"Full Stack Developer & IT Student",
    "hero.text":"I build thoughtful digital experiences focused on clarity, problem solving, and practical impact. Currently an A2SV student at the University of Rwanda, and trained at kLab Rwanda in Figma, HTML, CSS and JavaScript.",
    "hero.ctaPrimary":"View Experience","hero.ctaSecondary":"See Projects",
    "hero.focusLabel":"Current Focus","hero.available":"Available for work",
    "hero.metric1Label":"Student","hero.metric1Value":"University of Rwanda",
    "hero.metric2Label":"Program","hero.metric2Value":"Bachelor in IT",
    "hero.metric3Label":"Training","hero.metric3Value":"kLab Rwanda",
    "hero.metric4Label":"Base","hero.metric4Value":"Kigali, Rwanda 🇷🇼",
    "about.eyebrow":"About","about.heading":"Professional, curious, and driven by useful work.",
    "about.p1":"I am a passionate and dedicated programmer who enjoys solving complex problems through code. My work spans both front-end and back-end development, creating applications and websites that are efficient, user-friendly, and reliable.",
    "about.p2":"I am continuing my academic journey as an IT student and A2SV student at the University of Rwanda. I also trained at kLab Rwanda, building hands-on skills in Figma, HTML, CSS, and JavaScript over an intensive one-month programme.",
    "experience.eyebrow":"Experience","experience.heading":"Timeline of growth, teaching, and product building.",
    "experience.klab.date":"2024","experience.klab.title":"Design & Web Development Trainee","experience.klab.place":"kLab Rwanda · Kigali",
    "experience.klab.text":"Completed an intensive one-month training at kLab Rwanda, one of Africa's leading tech innovation hubs. Built practical skills in Figma (UI/UX), HTML, CSS, and JavaScript on real collaborative projects.",
    "experience.ta.date":"2024 – Present","experience.ta.title":"Teaching Assistant (TA)","experience.ta.place":"G.S Byumba Inyange / Inspire, Educate and Empower Rwanda",
    "experience.ta.text":"Supporting students in mathematics and computer science. This role strengthened my leadership, communication, and ability to break down complex concepts clearly.",
    "experience.dev.date":"Ongoing","experience.dev.title":"Full Stack Developer","experience.dev.place":"Independent Projects",
    "experience.dev.text":"Building websites and software solutions using HTML, CSS, JavaScript, Django, and C#. Focused on practical products that improve workflows and user experience.",
    "experience.edu.date":"2024 – Present","experience.edu.title":"Bachelor in Information Technology","experience.edu.place":"University of Rwanda",
    "experience.edu.text":"Continuing formal training in IT while sharpening software engineering, collaboration, and problem-solving skills.",
    "experience.a2sv.date":"Current","experience.a2sv.title":"A2SV Student","experience.a2sv.place":"African to Silicon Valley",
    "experience.a2sv.text":"Strengthening advanced problem solving, software engineering, and interview readiness through the A2SV learning community.",
    "skills.eyebrow":"Skills","skills.heading":"Technical ability backed by communication and leadership.",
    "skills.core":"Core Stack","skills.webdev":"Web Dev","skills.software":"Software Solutions",
    "skills.strengths":"Strengths","skills.problem":"Problem Solving","skills.critical":"Critical Thinking",
    "skills.leadership":"Leadership","skills.speaking":"Public Speaking","skills.creativity":"Creativity","skills.ict":"ICT Skills",
    "skills.languages":"Languages","skills.english":"English","skills.kinyarwanda":"Kinyarwanda","skills.french":"French (Basic)",
    "contact.eyebrow":"Contact","contact.heading":"Open to meaningful collaboration.",
    "contact.text":"If you want to work together on websites, software, or educational technology, I would be glad to connect.",
    "contact.projects":"Portfolio Projects",
    "contact.formTitle":"Send a Message","contact.formName":"Your Name","contact.formEmail":"Email Address",
    "contact.formSubject":"Subject","contact.formMessage":"Message","contact.formSend":"Send Message →",
    "contact.formSuccess":"Message sent! I'll get back to you soon."
  },
  fr:{
    "nav.about":"À propos","nav.experience":"Expérience","nav.skills":"Compétences","nav.contact":"Contact","nav.cta":"Parlons",
    "hero.eyebrow":"Portfolio / Rwanda","hero.title":"Développeuse Full Stack & Étudiante IT",
    "hero.text":"Je crée des expériences numériques soignées axées sur la clarté et la résolution de problèmes. Étudiante A2SV à l'Université du Rwanda, j'ai aussi suivi une formation d'un mois à kLab Rwanda en Figma, HTML, CSS et JavaScript.",
    "hero.ctaPrimary":"Voir l'expérience","hero.ctaSecondary":"Voir les projets",
    "hero.focusLabel":"Priorités actuelles","hero.available":"Disponible pour travailler",
    "hero.metric1Label":"Étudiante","hero.metric1Value":"Université du Rwanda",
    "hero.metric2Label":"Programme","hero.metric2Value":"Licence en IT",
    "hero.metric3Label":"Formation","hero.metric3Value":"kLab Rwanda",
    "hero.metric4Label":"Base","hero.metric4Value":"Kigali, Rwanda 🇷🇼",
    "about.eyebrow":"À propos","about.heading":"Professionnelle, curieuse et orientée vers un travail utile.",
    "about.p1":"Je suis une programmeuse passionnée qui aime résoudre des problèmes complexes grâce au code. Mon travail couvre le front-end et le back-end.",
    "about.p2":"Je poursuis mon parcours académique en tant qu'étudiante IT et A2SV à l'Université du Rwanda, et j'ai été formée à kLab Rwanda en Figma, HTML, CSS et JavaScript.",
    "experience.eyebrow":"Expérience","experience.heading":"Parcours de progression, d'enseignement et de création.",
    "experience.klab.date":"2024","experience.klab.title":"Stagiaire Design & Développement Web","experience.klab.place":"kLab Rwanda · Kigali",
    "experience.klab.text":"Formation intensive d'un mois à kLab Rwanda. Compétences acquises en Figma, HTML, CSS et JavaScript sur des projets réels.",
    "experience.ta.date":"2024 – Aujourd'hui","experience.ta.title":"Assistante d'enseignement","experience.ta.place":"G.S Byumba Inyange / Inspire, Educate and Empower Rwanda",
    "experience.ta.text":"Accompagnement des élèves en mathématiques et informatique. Rôle qui a renforcé mon leadership et ma communication.",
    "experience.dev.date":"En cours","experience.dev.title":"Développeuse Full Stack","experience.dev.place":"Projets indépendants",
    "experience.dev.text":"Développement de sites web et logiciels avec HTML, CSS, JavaScript, Django et C#.",
    "experience.edu.date":"2024 – Aujourd'hui","experience.edu.title":"Licence en informatique","experience.edu.place":"Université du Rwanda",
    "experience.edu.text":"Formation formelle en IT tout en développant mes compétences en ingénierie logicielle.",
    "experience.a2sv.date":"Actuel","experience.a2sv.title":"Étudiante A2SV","experience.a2sv.place":"African to Silicon Valley",
    "experience.a2sv.text":"Renforcement des compétences en résolution de problèmes et préparation aux entretiens via la communauté A2SV.",
    "skills.eyebrow":"Compétences","skills.heading":"Compétences techniques soutenues par communication et leadership.",
    "skills.core":"Stack principal","skills.webdev":"Dév Web","skills.software":"Solutions logicielles",
    "skills.strengths":"Forces","skills.problem":"Résolution de problèmes","skills.critical":"Esprit critique",
    "skills.leadership":"Leadership","skills.speaking":"Prise de parole","skills.creativity":"Créativité","skills.ict":"Compétences TIC",
    "skills.languages":"Langues","skills.english":"Anglais","skills.kinyarwanda":"Kinyarwanda","skills.french":"Français (de base)",
    "contact.eyebrow":"Contact","contact.heading":"Ouverte à une collaboration utile.",
    "contact.text":"Si vous souhaitez collaborer sur des sites web, logiciels ou projets de technologie éducative, contactez-moi.",
    "contact.projects":"Projets portfolio",
    "contact.formTitle":"Envoyer un message","contact.formName":"Votre nom","contact.formEmail":"Adresse email",
    "contact.formSubject":"Sujet","contact.formMessage":"Message","contact.formSend":"Envoyer →",
    "contact.formSuccess":"Message envoyé ! Je vous répondrai bientôt."
  },
  rw:{
    "nav.about":"Ibyanjye","nav.experience":"Uburambe","nav.skills":"Ubumenyi","nav.contact":"Twandikire","nav.cta":"Vugana nanjye",
    "hero.eyebrow":"Porotifolio / Rwanda","hero.title":"Full Stack Developer n'Umunyeshuri wa IT",
    "hero.text":"Nubaka ibikorwa bya digital byatekerejwe neza. Ndi umunyeshuri wa A2SV muri Kaminuza y'u Rwanda, kandi nakoranye amezi amwe na kLab Rwanda kwiga Figma, HTML, CSS na JavaScript.",
    "hero.ctaPrimary":"Reba uburambe","hero.ctaSecondary":"Reba imishinga",
    "hero.focusLabel":"Ibyo ndi kwibandaho","hero.available":"Niteguye gukora",
    "hero.metric1Label":"Umunyeshuri","hero.metric1Value":"Kaminuza y'u Rwanda",
    "hero.metric2Label":"Porogaramu","hero.metric2Value":"Bachelor muri IT",
    "hero.metric3Label":"Amahugurwa","hero.metric3Value":"kLab Rwanda",
    "hero.metric4Label":"Aho ndi","hero.metric4Value":"Kigali, Rwanda 🇷🇼",
    "about.eyebrow":"Ibyanjye","about.heading":"Umwuga ushingiye ku matsiko no gukora ibifite umumaro.",
    "about.p1":"Ndi programmer ukunda gukemura ibibazo bikomeye ukoresheje code. Akazi kanjye karimo front-end na back-end.",
    "about.p2":"Ndi gukomeza urugendo rw'amasomo nk'umunyeshuri wa IT n'A2SV muri Kaminuza y'u Rwanda. Nakoranye na kLab Rwanda amezi amwe kwiga Figma, HTML, CSS na JavaScript.",
    "experience.eyebrow":"Uburambe","experience.heading":"Urugendo rwo gukura, kwigisha no kubaka.",
    "experience.klab.date":"2024","experience.klab.title":"Umunyeshuri wa Design & Web Dev","experience.klab.place":"kLab Rwanda · Kigali",
    "experience.klab.text":"Nakoranye amezi amwe muri kLab Rwanda nize Figma, HTML, CSS na JavaScript ku mishinga ya nyaw'imwe.",
    "experience.ta.date":"2024 – Ubu","experience.ta.title":"Umufasha mu kwigisha","experience.ta.place":"G.S Byumba Inyange / Inspire, Educate and Empower Rwanda",
    "experience.ta.text":"Mfasha abanyeshuri mu mibare na computer science. Uru ruhare rukomeje kuntera leadership na communication.",
    "experience.dev.date":"Birakomeje","experience.dev.title":"Full Stack Developer","experience.dev.place":"Imishinga yigenga",
    "experience.dev.text":"Nubaka websites na software nkoresheje HTML, CSS, JavaScript, Django na C#.",
    "experience.edu.date":"2024 – Ubu","experience.edu.title":"Bachelor in Information Technology","experience.edu.place":"Kaminuza y'u Rwanda",
    "experience.edu.text":"Ndi gukomeza amasomo ya IT no gukaza ubumenyi mu software engineering.",
    "experience.a2sv.date":"Ubu","experience.a2sv.title":"Umunyeshuri wa A2SV","experience.a2sv.place":"African to Silicon Valley",
    "experience.a2sv.text":"Kongera ubumenyi mu gukemura ibibazo na software engineering binyuze mu muryango wa A2SV.",
    "skills.eyebrow":"Ubumenyi","skills.heading":"Ubumenyi bwa tekiniki bushyigikiwe n'itumanaho.",
    "skills.core":"Core Stack","skills.webdev":"Gukora imbuga","skills.software":"Software Solutions",
    "skills.strengths":"Imbaraga","skills.problem":"Gukemura ibibazo","skills.critical":"Gutekereza",
    "skills.leadership":"Leadership","skills.speaking":"Kuvugira mu ruhame","skills.creativity":"Guhanga","skills.ict":"Ubumenyi bwa ICT",
    "skills.languages":"Indimi","skills.english":"Icyongereza","skills.kinyarwanda":"Ikinyarwanda","skills.french":"Igifaransa (shingiro)",
    "contact.eyebrow":"Twandikire","contact.heading":"Niteguye ubufatanye bufite umumaro.",
    "contact.text":"Niba ushaka ko dukorana ku mbuga, software cyangwa educational tech, nzishimira kuvugana nawe.",
    "contact.projects":"Imishinga ya portfolio",
    "contact.formTitle":"Tuma ubutumwa","contact.formName":"Izina ryawe","contact.formEmail":"Imeyili yawe",
    "contact.formSubject":"Insanganyamatsiko","contact.formMessage":"Ubutumwa","contact.formSend":"Tuma →",
    "contact.formSuccess":"Ubutumwa bwatumwe! Nzagusubiza vuba."
  }
};
function setLang(l){
  const lang=T[l]?"l":l;
  i18nEls.forEach(el=>{const v=T[l]?.[el.dataset.i18n];if(v)el.textContent=v;});
  document.documentElement.lang=l;
  langBtns.forEach(b=>b.classList.toggle("is-active",b.dataset.lang===l));
  localStorage.setItem("imc-lang",l);
}
setLang(localStorage.getItem("imc-lang")||"en");
langBtns.forEach(b=>b.addEventListener("click",()=>setLang(b.dataset.lang)));
