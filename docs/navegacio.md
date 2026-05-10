# Navegació de l'aplicació

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


## Configuració del sistema de rutes

Les rutes s'han definit al fitxer `src/app/app.routes.ts`, exportant una constant `routes` de tipus `Routes`.
