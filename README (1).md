# Portfolio — Yan AKOUEDENOUDJE

Site portfolio personnel présentant mon parcours, mes projets, mes compétences et mes certifications en mécatronique, robotique et intelligence artificielle appliquée à l'agriculture.

🔗 **Site en ligne :** https://yanakouedenoudje.github.io

---

## 📁 Structure du dépôt

```
.
├── index.html              # Page d'accueil (hero, à propos, parcours, aperçus)
├── projets.html             # Liste complète des projets techniques
├── certifications.html      # Certifications, attestations, conférences
├── competences.html         # Détail des compétences techniques et transversales
│
└── assets/
    ├── css/
    │   └── style.css        # Feuille de style UNIQUE, partagée par les 4 pages
    ├── js/
    │   └── main.js          # Script UNIQUE, partagé par les 4 pages
    ├── images/               # Toutes les images (photos, logos, captures...)
    │   ├── profile.jpg
    │   ├── certif/           # Visuels des certifications
    │   ├── attes/             # Visuels des attestations
    │   ├── conf_forum/        # Photos de conférences/forums
    │   └── projects/          # Visuels des projets
    └── files/                # Fichiers téléchargeables (CV, PDF de certifications...)
```

> **Pourquoi un seul CSS et un seul JS ?**
> Avant, chaque page avait son propre style et son propre script, copiés-collés. Un changement de couleur ou de comportement devait donc être répété 4 fois. Désormais, `style.css` et `main.js` sont chargés par les 4 pages : une seule modification suffit pour que le changement s'applique partout.

---

## 🛠️ Stack technique

- **HTML5 / CSS3 / JavaScript vanilla** — aucun framework, aucune dépendance à installer
- **Google Fonts** : Space Grotesk (titres), Inter (texte courant), JetBrains Mono (détails techniques)
- Hébergé gratuitement via **GitHub Pages**

---

## 🚀 Lancer le site en local

Aucune installation n'est nécessaire. Deux options :

1. **Ouverture directe** : double-clique sur `index.html`, il s'ouvre dans ton navigateur.
2. **Avec un petit serveur local** (recommandé, évite certains soucis de chemins relatifs) :
   ```bash
   python3 -m http.server 8000
   ```
   puis ouvre `http://localhost:8000` dans ton navigateur.

---

## ✏️ Comment modifier le contenu

Chaque fichier HTML est commenté en français pour te guider. Voici les emplacements clés :

### Ajouter un projet
Dans `projets.html` (et éventuellement dans la section "Projets phares" de `index.html`), duplique un bloc `<div class="cert-card" data-category="...">...</div>` entier et modifie :
- l'image (`<img src="assets/images/...">`)
- le titre, la description
- les outils utilisés (`<span class="tool-tag">`)
- le lien "Code source"

### Ajouter une certification / attestation / conférence
Même logique dans `certifications.html`. Renseigne bien l'attribut `data-category="certification"`, `"attestation"` ou `"conference"` pour que les boutons de filtre en haut de page fonctionnent correctement.

### Ajouter une compétence
Dans `competences.html`, ajoute une ligne `<span class="skill-pill">Ta compétence</span>` dans la catégorie concernée (ou crée une nouvelle catégorie en dupliquant un bloc `.skill-group`).

### Modifier le parcours (formation / expérience)
Dans `index.html`, section `#experiences`, duplique un bloc `.timeline-item` dans la bonne colonne (Formation académique ou Parcours professionnel).

### Changer les couleurs, polices, tailles d'image, etc.
Tout se passe dans `assets/css/style.css`, section **1. VARIABLES**, en haut du fichier :
```css
:root{
  --blue: #4f7cff;
  --violet: #9b6bff;
  --cyan: #35d0e0;
  --thumb-ratio: 4 / 3;   /* forme des vignettes projets/certifications */
  ...
}
```
Modifier une variable ici change automatiquement tout le site (les 4 pages).

### Ajouter des images
Dépose tes fichiers dans le sous-dossier `assets/images/` approprié, puis référence-les avec un chemin **relatif** (`assets/images/mon-dossier/mon-image.jpg`) dans le HTML. Toutes les vignettes de projets/certifications adoptent automatiquement la même taille grâce au CSS (`object-fit: cover` + ratio fixe), donc pas besoin de redimensionner tes photos avant de les importer.

---

## 📱 Responsive

Le site est entièrement adaptatif (mobile, tablette, desktop) :
- En dessous de 900px, le menu de navigation se transforme en menu **hamburger** (bouton ☰ en haut à droite)
- Les grilles de projets/certifications passent de 3 → 2 → 1 colonne(s) selon la largeur d'écran
- Le thème sombre/clair choisi par le visiteur est mémorisé (`localStorage`) et conservé d'une page à l'autre

---

## 🌐 Déploiement (GitHub Pages)

Le site est déployé automatiquement par GitHub Pages depuis la branche par défaut du dépôt :

1. `Settings` → `Pages`
2. Source : `Deploy from a branch`
3. Branche : `main`, dossier : `/ (root)`

Toute modification poussée (`git push`) sur cette branche est publiée en ligne après quelques minutes.

---

## 📬 Contact

- **Email :** yanakouedenoudje@gmail.com
- **LinkedIn :** [yan-akouedenoudje](https://www.linkedin.com/in/yan-akouedenoudje-58b02929a/)
- **GitHub :** [@yanakouedenoudje](https://github.com/yanakouedenoudje)

---

© Bylvanus Yan Mahugnon AKOUEDENOUDJE. Tous droits réservés.
