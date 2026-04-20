# Configuració de serveis

## API Mock (desenvolupament)

Simula una API REST durant el desenvolupament del projecte **Saló Arcade**

### Arrencar el servidor

```bash
npx json-server --watch tools/api/cataleg.json --port 4301 --delay 600
```

### Endpoints disponibles

- `GET /elements`: Retorna tots els elements
- `GET /elements?popular=true`: Retorna els elements populars
- `GET /elements?nom_like=Pac`: Cerca elements per `nom`
- `GET /elements/:id`: Retorna un element concret pel seu identificador

### Configuració 

- **Port:** 4301
- **Latència simulada:** 600ms
- **Fitxer de dades:** tools/api/cataleg.json

## Servei HTTP

### Signals (només lectura)

- `elements`: Conté la llista d'elements carregats
- `estat`: Indica si hi ha una petició en curs
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
## ElementService

### Responsabilitats

- Comunicació HTTP amb l'API de catàleg
- Gestió d'estats (inicial, carregant, èxit, error)
- Transformació de respostes amb adaptadors
- Gestió centralitzada d'errors

### Mètodes públics

#### obtenirPopulars(): void

Carrega elements populars del catàleg.

**Flux:**
1. Canvia estat a `'carregant'`
2. Fa petició GET a `/elements?popular=true`
3. Adapta resposta amb `adaptarElementsApi`
4. Actualitza signals amb dades i estat `'exit'`
5. En cas d'error, actualitza error i estat `'error'`

#### cercar(terme: string): void

Cerca elements per terme de cerca.

**Paràmetres:**
- `terme`: Text a cercar

**Comportament:**
- Si el terme és buit: carrega els elements populars
- Si el terme és vàlid: cerca amb `/elements?nom_like={terme}`

#### codiDisponible(codi: string): Promise<boolean>

Comprova si un codi d'element està disponible (no existeix).

**Ús:** Validador asíncron per formularis

**Retorna:** `true` si el codi està disponible, `false` si ja existeix

#### reiniciar(): void

Neteja estat i elements del servei.

### Signals exposades (només lectura)

- `elements()`: Array d'elements actuals
- `estat()`: Estat actual del servei
- `error()`: Missatge d'error (si n'hi ha)

### Gestió d'errors

Errors HTTP es transformen en missatges:

| Codi   | Missatge                             |
|--------|--------------------------------------|
| 0      | "No es pot connectar al servidor..." |
| 404    | "Endpoint no trobat..."              |
| 500    | "Error intern del servidor"          |
| Altres | "Error desconegut (XXX)..."          |

### Exemple d'ús

```typescript
constructor(private elementService: ElementService) {}

ngOnInit() {
  // Carregar populars
  this.elementService.obtenirPopulars();

  // Observar estat
  effect(() => {
    console.log('Estat:', this.elementService.estat());
    console.log('Elements:', this.elementService.elements());
  });
}
```
