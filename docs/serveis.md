# Configuració de serveis

## API Mock (desenvolupament)

Simula una API REST durant el desenvolupament del projecte **Saló Arcade**

### Arrencar el servidor

```bash
npx json-server --watch tools/api/cataleg.json --port 4301 --delay 600
```

### Endpoints

- `GET /elements`: Retorna tots els elements
- `GET /elements?popular=true`: Retorna els elements populars
- `GET /elements?nom_like=Pac`: Cerca elements per `nom`
- `GET /elements/:id`: Retorna un element concret pel seu identificador

### Configuració 

- **Port:** 4301
- **Latència simulada:** 600ms
- **Fitxer de dades:** tools/api/cataleg.json

## Servei HTTP

### Signals

- `elements`: Conté la llista d'elements carregats
- `carregant`: Indica si hi ha una petició en curs
- `error`: Conté un missatge d'error si la petició falla


### Mètodes

- `obtenirPopulars()`: Consulta `GET /elements?popular=true`
- `cercar(terme: string)` Consulta `GET /elements?nom_like=...`

## Canviar a una API real

Per utilitzar una API real cal modificar la URL base al fitxer d'entorn:
`src/environments/environment.development.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://api.exemple.com'
};
```