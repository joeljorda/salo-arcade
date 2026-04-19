# Models i adaptadors

## Interfícies principals

### ElementApiResponse (API)

Format de les dades que retorna l'API

```typescript
interface ElementApiResponse {
  id: string;
  nom: string;
  descripcio: string;
  categoria: string;
  preu: number;
  imatge: string;
  popular: boolean;
  stock: number;
}
```

### ElementCataleg (model intern)

Model utilitzat dins l'aplicació.

```typescript
interface ElementCataleg {
  id: string;
  titol: string;
  descripcio: string;
  categoria: string;
  preu: number;
  imatgeUrl: string;
  esPopular: boolean;
  unitats: number;
  notes?: string[];
}
```

## Adaptadors

### adaptarElementApi()
Transforma un element rebut de l'API al model intern.

### adaptarElementsApi()
Aplica la transformació a un array d'elements.

## Mapeig de camps

| Camp API      | Camp intern  | Tipus      | Transformació                  |
|---------------|--------------|------------|--------------------------------|
| `id`          | `id`         | `string`   | Cap                            |
| `nom`         | `titol`      | `string`   | Renombrat                      |
| `descripcio`  | `descripcio` | `string`   | Cap                            |
| `categoria`   | `categoria`  | `string`   | Cap                            |
| `preu`        | `preu`       | `number`   | Cap                            |
| `imatge`      | `imatgeUrl`  | `string`   | Renombrat                      |
| `popular`     | `esPopular`  | `boolean`  | Renombrat                      |
| `stock`       | `unitats`    | `number`   | Renombrat                      |
| —             | `notes`      | `string[]` | Afegit amb valor inicial buit  |