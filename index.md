<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Titulaire d'une licence professionnelle en Agroéquipements, je suis passionné par l'intégration des robots dans le monde agricole">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root{
    --bg: #0a0c12;
    --panel: #12151d;
    --panel-2: #171b26;
    --line: #242938;
    --text: #eef0f5;
    --muted: #8b93a7;
    --blue: #4f7cff;
    --violet: #9b6bff;
    --cyan: #35d0e0;
    --grad: linear-gradient(135deg, var(--blue), var(--violet));
    --radius: 14px;
  }

  *{ margin:0; padding:0; box-sizing:border-box; }

  html{ scroll-behavior:smooth; }

  body{
    background:var(--bg);
    color:var(--text);
    font-family:'Inter', sans-serif;
    line-height:1.6;
    overflow-x:hidden;
  }

  h1,h2,h3{ font-family:'Space Grotesk', sans-serif; letter-spacing:-0.02em; }

  .mono{ font-family:'JetBrains Mono', monospace; }

  a{ color:inherit; text-decoration:none; }

  .wrap{ max-width:1100px; margin:0 auto; padding:0 24px; }

  /* ---------- NAV ---------- */
  header{
    position:sticky; top:0; z-index:50;
    background:rgba(10,12,18,0.75);
    backdrop-filter:blur(12px);
    border-bottom:1px solid var(--line);
  }
  nav{
    display:flex; align-items:center; justify-content:space-between;
    padding:16px 24px; max-width:1100px; margin:0 auto;
  }
  .logo{ font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:1.05rem; }
  .logo span{ background:var(--grad); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .nav-links{ display:flex; gap:8px; list-style:none; }
  .nav-links a{
    padding:8px 14px; border-radius:999px; font-size:0.9rem; color:var(--muted);
    transition:all .2s;
  }
  .nav-links a:hover{ color:var(--text); background:var(--panel); }
  .nav-cta{
    background:var(--grad); padding:9px 18px; border-radius:999px;
    font-size:0.9rem; font-weight:600; color:#fff;
  }
  .nav-toggle{ display:none; background:none; border:none; color:var(--text); font-size:1.4rem; cursor:pointer; }

  /* ---------- HERO ---------- */
  .hero{
    position:relative; padding:100px 0 70px; text-align:center; overflow:hidden;
  }
  .hero::before{
    content:''; position:absolute; inset:-20% -10%; z-index:-1;
    background:
      radial-gradient(circle at 20% 20%, rgba(79,124,255,0.18), transparent 40%),
      radial-gradient(circle at 80% 10%, rgba(155,107,255,0.18), transparent 45%),
      radial-gradient(circle at 50% 90%, rgba(53,208,224,0.10), transparent 40%);
  }
  .badge{
    display:inline-flex; align-items:center; gap:6px;
    border:1px solid var(--line); background:var(--panel);
    padding:6px 16px; border-radius:999px; font-size:0.78rem;
    color:var(--muted); letter-spacing:0.06em; text-transform:uppercase;
    margin-bottom:20px;
  }
  .tags{ display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-bottom:28px; }
  .tag{
    padding:7px 16px; border-radius:999px; font-size:0.78rem; font-weight:600;
    letter-spacing:0.04em; text-transform:uppercase; border:1px solid var(--line);
  }
  .tag.t1{ color:var(--blue); border-color:rgba(79,124,255,0.35); background:rgba(79,124,255,0.08); }
  .tag.t2{ color:var(--cyan); border-color:rgba(53,208,224,0.35); background:rgba(53,208,224,0.08); }
  .tag.t3{ color:var(--violet); border-color:rgba(155,107,255,0.35); background:rgba(155,107,255,0.08); }

  .hero h1{
    font-size:clamp(2.6rem, 7vw, 5rem); font-weight:700; line-height:1.05; margin-bottom:22px;
  }
  .hero p.lead{
    max-width:640px; margin:0 auto 36px; color:var(--muted); font-size:1.15rem;
  }
  .hero p.lead b{ color:var(--text); }
  .hero p.lead .accent{ color:var(--cyan); font-weight:600; }

  .cta-row{ display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-bottom:40px; }
  .btn{
    padding:14px 28px; border-radius:999px; font-weight:600; font-size:0.95rem;
    display:inline-flex; align-items:center; gap:8px; transition:transform .2s, box-shadow .2s;
  }
  .btn-primary{ background:var(--grad); color:#fff; box-shadow:0 8px 24px rgba(79,124,255,0.25); }
  .btn-primary:hover{ transform:translateY(-2px); }
  .btn-ghost{ background:var(--panel); border:1px solid var(--line); color:var(--text); }
  .btn-ghost:hover{ background:var(--panel-2); }

  .socials{ display:flex; gap:12px; justify-content:center; }
  .social-btn{
    width:42px; height:42px; border-radius:12px; display:flex; align-items:center; justify-content:center;
    background:var(--panel); border:1px solid var(--line); color:var(--muted);
    transition:all .2s;
  }
  .social-btn:hover{ color:var(--text); border-color:var(--blue); transform:translateY(-2px); }

  /* ---------- STATS ---------- */
  .stats{
    border-top:1px solid var(--line); border-bottom:1px solid var(--line);
    background:var(--panel);
  }
  .stats-grid{
    display:grid; grid-template-columns:repeat(4,1fr);
    max-width:1100px; margin:0 auto; padding:44px 24px; text-align:center;
  }
  .stats-grid div h3{
    font-size:2.4rem; background:var(--grad); -webkit-background-clip:text; background-clip:text; color:transparent;
  }
  .stats-grid div p{ color:var(--muted); font-size:0.82rem; letter-spacing:0.05em; text-transform:uppercase; margin-top:4px; }

  /* ---------- SECTIONS ---------- */
  section{ padding:90px 0; }
  .section-head{ margin-bottom:48px; text-align:center; }
  .eyebrow{ color:var(--cyan); font-size:0.85rem; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:10px; }
  .section-head h2{ font-size:clamp(1.8rem,4vw,2.6rem); }

  /* about */
  .about-grid{ display:grid; grid-template-columns:1fr 1.4fr; gap:48px; align-items:start; }
  .about-grid p{ color:var(--muted); margin-bottom:16px; }
  .skills-list{ display:flex; flex-wrap:wrap; gap:10px; margin-top:20px; }
  .skill-chip{
    padding:8px 16px; border-radius:10px; background:var(--panel); border:1px solid var(--line);
    font-size:0.85rem; font-family:'JetBrains Mono',monospace;
  }

  /* projects */
  .projects-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
  .project-card{
    background:var(--panel); border:1px solid var(--line); border-radius:var(--radius);
    padding:28px; transition:transform .25s, border-color .25s;
  }
  .project-card:hover{ transform:translateY(-4px); border-color:var(--blue); }
  .project-num{ color:var(--cyan); font-family:'JetBrains Mono',monospace; font-size:0.8rem; margin-bottom:14px; display:block; }
  .project-card h3{ font-size:1.2rem; margin-bottom:10px; }
  .project-card p{ color:var(--muted); font-size:0.92rem; margin-bottom:18px; }
  .project-link{ color:var(--blue); font-size:0.88rem; font-weight:600; }

  /* contact */
  .contact-box{
    background:var(--panel); border:1px solid var(--line); border-radius:20px;
    padding:56px 40px; text-align:center;
  }
  .contact-box h2{ font-size:clamp(1.8rem,4vw,2.4rem); margin-bottom:14px; }
  .contact-box p{ color:var(--muted); margin-bottom:30px; }

  footer{ border-top:1px solid var(--line); padding:28px 0; text-align:center; color:var(--muted); font-size:0.85rem; }

  @media (max-width: 820px){
    .nav-links, .nav-cta{ display:none; }
    .stats-grid{ grid-template-columns:repeat(2,1fr); gap:24px; }
    .about-grid, .projects-grid{ grid-template-columns:1fr; }
  }
</style>
</head>
<body>

<header>
  <nav>
    <div class="logo">Yan <span>AKOUEDENOUDJE</span></div>
    <ul class="nav-links">
      <li><a href="#accueil">Accueil</a></li>
      <li><a href="#apropos">À propos</a></li>
      <li><a href="#expériences">Contact</a></li>
      <li><a href="#projets">Projets</a></li>
    </ul>
    <a href="#contact" class="nav-cta">Contact</a>
  </nav>
</header>

<section class="hero" id="accueil">
  <div class="wrap">
    <div class="badge">📍 Abomey-calavi, Bénin</div>
    <div class="tags">
      <span class="tag t1">Technicien en Agroéquipements</span>
      <span class="tag t2">[RÔLE 2]</span>
      <span class="tag t3">[RÔLE 3]</span>
    </div>
    <h1>Yan AKOUEDENOUDJE</h1>
    <p class="lead">"je projette de devenir <b>ingénieur robotique</b> afin de contribuer par la recherche et l’innovation au développement de <span class="accent">solutions technologiques</span> à l’endroit des exploitations agricoles africaines.</p>
    <div class="cta-row">
      <a href="#projets" class="btn btn-primary">Voir mes projets →</a>
      <a href="assets/files/CV_Yan_AKOUEDENOUDJE.pdf" class="btn btn-ghost">Télécharger le CV ↓</a>
    </div>
    <div class="socials">
      <a href="linkedin.com/in/yan-akouedenoudje-58b02929a" class="social-btn" title="LinkedIn">in</a>
      <a href="https://github.com/yanakouedenoudje" class="social-btn" title="GitHub">gh</a>
      <a href="mailto:yanakouedenoudje@gmail.com" class="social-btn" title="Email">✉</a>
    </div>
  </div>
</section>

<div class="stats">
  <div class="stats-grid">
    <div><h3>+10</h3><p>Projets</p></div>
    <div><h3>+5</h3><p>Certifications</p></div>
    <div><h3>+5</h3><p>Conférences</p></div>
    <div><h3>+1</h3><p>Forum</p></div>
  </div>
</div>

<section id="apropos">
  <div class="wrap">
    <div class="section-head">
      <div class="eyebrow">À propos</div>
      <h2>Qui je suis</h2>
    </div>
    <div class="about-grid">
      <div>
        <p>[Court paragraphe sur ton parcours : formation, expériences marquantes, ce qui te motive.]</p>
      </div>
      <div>
        <p>[Deuxième paragraphe : ce que tu recherches actuellement — poste, projets, collaborations.]</p>
        <div class="skills-list">
          <span class="skill-chip">[Compétence 1]</span>
          <span class="skill-chip">[Compétence 2]</span>
          <span class="skill-chip">[Compétence 3]</span>
          <span class="skill-chip">[Compétence 4]</span>
          <span class="skill-chip">[Compétence 5]</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="projets" style="background:var(--panel-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line);">
  <div class="wrap">
    <div class="section-head">
      <div class="eyebrow">Projets</div>
      <h2>Ce que j'ai construit</h2>
    </div>
    <div class="projects-grid">
      <div class="project-card">
        <span class="project-num mono">01</span>
        <h3>[Titre du projet 1]</h3>
        <p>[Description courte : le problème résolu, les outils utilisés, le résultat.]</p>
        <a href="[LIEN_PROJET_1]" class="project-link">Voir le projet →</a>
      </div>
      <div class="project-card">
        <span class="project-num mono">02</span>
        <h3>[Titre du projet 2]</h3>
        <p>[Description courte : le problème résolu, les outils utilisés, le résultat.]</p>
        <a href="[LIEN_PROJET_2]" class="project-link">Voir le projet →</a>
      </div>
      <div class="project-card">
        <span class="project-num mono">03</span>
        <h3>[Titre du projet 3]</h3>
        <p>[Description courte : le problème résolu, les outils utilisés, le résultat.]</p>
        <a href="[LIEN_PROJET_3]" class="project-link">Voir le projet →</a>
      </div>
    </div>
  </div>
</section>

<section id="contact">
  <div class="wrap">
    <div class="contact-box">
      <h2>Discutons</h2>
      <p>[Une phrase d'invitation — ex : "Ouvert(e) aux opportunités, collaborations ou simplement échanger."]</p>
      <div class="cta-row">
        <a href="mailto:[TON_EMAIL]" class="btn btn-primary">M'écrire un email →</a>
        <a href="[LIEN_LINKEDIN]" class="btn btn-ghost">LinkedIn</a>
      </div>
    </div>
  </div>
</section>

<footer>
  © <span id="year"></span> [Ton Nom]. Fait avec HTML &amp; CSS.
</footer>

<script>
  document.getElementById('year').textContent = new Date().getFullYear();
</script>

</body>
</html>
