# Saló Arcade

## Descripció de l'aplicació

Aplicació standalone que gestiona un catàleg de jocs arcade estil retro.

## Mapa de rutes

| Path | Component | Accés | Descripció |
|---|---|---|---|
| `/` | Redirecció | Públic | Redirigeix automàticament a `/home`. |
| `/home` | `HomeComponent` | Públic | Pàgina principal. Mostra el catàleg d'elements. |
| `/search` | `SearchComponent` | Públic | Vista de cerca d'elements. Equival a la ruta `/cerca` de l'enunciat. |
| `/detail/:id` | `DetailComponent` | Públic | Detall d'un element. Rep l'identificador amb el paràmetre `id` de la URL. |
| `/favorites` | `FavoritesComponent` | Privat | Secció de preferits. |
| `/login` | `LoginComponent` | Públic | Formulari d'autenticació simulada. |
| `**` | Redirecció | Públic | Les URL errònies redirigeixen a `/home`. |

## Instruccions d'execució en local

```bash
git clone https://github.com/joeljorda/salo-arcade.git
cd salo-arcade
git checkout ra4-navegacio
npm install
ng serve
```
Obrir al navegador:
```
http://localhost:4200
```

## Build de producció

Generar el build:
```
ng build --configuration production
```

Els fitxers generats es creen a la carpeta `dist/`

### Mides del bundle

| Tipus | Fitxer | Names | Raw size | Estimated transfer size |
|---|---|---|---:|---:|
| Initial chunk files | `main-CXA4F42U.js` | `main` | 170.32 kB | 39.63 kB |
| Initial chunk files | `chunk-XJYRVA4E.js` | `-` | 143.81 kB | 41.65 kB |
| Initial chunk files | `polyfills-FFHMD2TL.js` | `polyfills` | 34.52 kB | 11.28 kB |
| Initial chunk files | `styles-3YQOGY5O.css` | `styles` | 693 bytes | 693 bytes |
| Initial total | — | — | 349.34 kB | 93.25 kB |
| Lazy chunk files | `chunk-HYGRXEVO.js` | `favorites-component` | 765 bytes | 765 bytes |


## Credencials de prova

Podeu utilitzar el següent usuari de prova:
- Email: admin@test.com
- Password: 1234