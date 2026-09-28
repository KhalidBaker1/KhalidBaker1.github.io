# Khalid Baker – Portfolio

Persoonlijke portfolio-website van Khalid Baker, software development student aan het ROC Mondriaan en stagiair bij Competa IT.

Live: **https://khalidbaker1.github.io/**

## Wat zit erin?

| Bestand | Wat |
| --- | --- |
| `index.html` | De portfolio (Nederlands, met NL/EN-knop) |
| `cv.html` | Je CV als webpagina (A4, printbaar) |
| `docs/Khalid-Baker-CV.pdf` | Je CV als PDF (gemaakt van `cv.html`) |
| `css/style.css` | Styling van de portfolio |
| `css/cv.css` | Styling van het CV |
| `js/main.js` | Animaties, taalwissel, projectfilter, enz. |
| `projects/` | Je browsergames (Connect Four, Tic Tac Toe, …) |

## Lokaal bekijken

Je hebt niets te installeren; het is gewone HTML/CSS/JS.

**Optie 1: VS Code (makkelijkst)**
1. Open de map in VS Code.
2. Installeer de extensie **Live Server**.
3. Klik rechtsonder op **Go Live**. De site opent op `http://127.0.0.1:5500`.

**Optie 2: via de terminal**
```bash
# met Node.js
npx serve .
# of met Python
python -m http.server 8000
```
Open daarna `http://localhost:3000` (serve) of `http://localhost:8000` (Python).

> Tip: dubbelklikken op `index.html` werkt ook, maar de games in `projects/` gebruiken paden als `/css/...`. Die werken alleen via een server (optie 1 of 2) of op GitHub Pages.

## Online zetten (GitHub Pages)

GitHub Pages publiceert de `main`-branch. Zodra deze wijzigingen in `main` staan (via een pull request of merge), staat de nieuwe site binnen een paar minuten live op https://khalidbaker1.github.io/.

## Iets aanpassen?

- **Teksten (NL):** direct in `index.html`.
- **Teksten (EN):** in `js/main.js`, in het blok `const EN = { ... }`.
- **De rollen die getypt worden in de hero:** `const ROLES` in `js/main.js`.
- **CV:** pas `cv.html` aan en maak daarna een nieuwe PDF: open `cv.html` in Chrome → **Printen** → *Opslaan als PDF* (papier A4, marges *Geen*, *Achtergrondafbeeldingen* aan) → sla op als `docs/Khalid-Baker-CV.pdf`.
- **Nieuw project toevoegen:** kopieer een `<article class="project-card">` in `index.html` en zet `data-category` op `web` of `game`.
