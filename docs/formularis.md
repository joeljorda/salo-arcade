# Formularis

## FormulariCercaComponent

### Funcionalitat

Formulari reactiu que permet cercar elements del catàleg mentre l'usuari escriu. Valida el camp de cerca, mostra errors i cerca de forma automàtica.

Conté un únic camp:
`terme`: Text a cercar introduït per l'usuari.

## Validacions

### Síncrones

El camp `terme` té dues validacions:

| Camp  | Validació       | Missatge d'error    |
|-------|-----------------|---------------------|
| terme | `minlength(2)`  | "Mínim 2 caràcters" |
| terme | `maxlength(50)` | "Màxim 50 caràcters" |


### Asíncrona

S'utilitza el validador asíncron `codiDisponibleValidator` que consulta l'API per comprovar si hi ha resultats per al text introduït.

### Comportament

- Després de 400ms sense escriure, cerca automàticament
- Si el terme es vàlid, fa una comprovació contra l'API, amb un retard de 500ms, per evitar consultes excessives.
- si hi ha resultats, la validació retorna `null`.
- si no hi ha resultats, retorna `{senseResultats: true}`.

### Presentació d'errors

Els avisos només es mostren quan l'usuari ja ha interactuat amb el camp i n'ha sortit (`touched`). Això evita mostrar validacions abans que es completi el formulari.


### Exemple d'integració

```typescript
import { FormulariCercaComponent } from './components/formulari-cerca/formulari-cerca.component';

@Component({
  imports: [FormulariCercaComponent],
  template: `<app-formulari-cerca />`
})
export class CatalegPageComponent {}
```

## PreferitsPanelComponent

### Funcionalitat

Component que permet gestionar les notes associades als elements marcats com a preferits.

Utilitza un formulari reactiu amb `FormArray` per crear i modificar un nombre variable de notes per a cada preferit. Les dades es guarden amb persistència a `localStorage` a través de `PreferitsService`.

### FormArray dinàmic

El formulari es construeix amb un `FormArray` anomenat `notes`, que conté un conjunt dinàmic de controls de text.

```typescript
formulariNotes = this.fb.group({
  notes: this.fb.array([])
});