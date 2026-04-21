<p align="center">
  <img src="public/images/saloarcade_image.png" width="175">
</p>

<h1 align="center">Saló Arcade by Joel</h1>

## Descripció

Saló Arcade és una aplicació web de videojocs inspirada en l'estètica dels salons recreatius clàssics. El projecte permet consultar un catàleg de jocs, cercar elements de manera reactiva, gestionar preferits i afegir notes personals amb persistència local.


## Stack

- TypeScript
- Angular 18 (Standalone)
- SCSS
- RxJS
- json-server
- localStorage

## Funcionalitats implementades

- Catàleg d'elements carregat des d'una API mock amb `json-server`
- Adaptació de dades entre resposta API i model intern
- Gestió d'estats del servei: inicial, carregant, èxit i error
- Cerca reactiva amb formulari i validacions
- Validador asíncron per comprovar si hi ha resultats
- Sistema de preferits amb persistència a `localStorage`
- Panell de preferits amb notes dinàmiques mitjançant `FormArray`


## Estat actual

Actualment el projecte inclou:

- consum de dades remotes amb `HttpClient`
- arquitectura separada per models, adaptadors, serveis, components i validadors
- cerca automàtica amb debounce
- gestió de preferits i notes persistents
- documentació tècnica a la carpeta `docs/`
