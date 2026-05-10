# Optimització de l'aplicació

## Objectiu

Aplicar dues tècniques d'optimització:

1. `ChangeDetectionStrategy.OnPush` en components.
2. Virtualització del llistat principal amb Angular CDK.

Aquestes optimitzacions ajuden a reduir comprovacions de canvi innecessàries i a evitar renderitzar al DOM tots els elements d'una llista gran alhora.

## Components amb OnPush

S'ha aplicat `ChangeDetectionStrategy.OnPush` als components següents:

| Component | Tipus | Motiu |
|---|---|---|
| `ElementCardComponent` | Presentacional | Rep les dades d'un element mitjançant `@Input()`. Només cal que s’actualitzi quan li arriba un element diferent. |
| `DetailComponent` | Vista de detall | Mostra informació basada en el paràmetre de ruta `id`. Només es mostra quan l'usuari demana explícitament el detall d'un element concret, no cal revisar-lo cada vegada. |


## Angular CDK

Per la virtualització s'ha utilitzat el mòdul `ScrollingModule` d'Angular CDK a `HomeComponent`. Això permet no haver de carregar tots els elements d'una llista, sinó només els que es veuen dins del contenidor.

