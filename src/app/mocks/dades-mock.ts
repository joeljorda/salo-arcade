import { Element } from '../models/element.model';

export const ELEMENTS: Element[] = [
  {
    id: 1,
    name: 'Pac-Man',
    score: 100,
    difficulty: 'Fàcil',
    description: 'Laberint on has de menjar punts i evitar fantasmes.',
    imageUrl: 'images/pacman.jpeg',
  },
  {
    id: 2,
    name: '3 en Ratlla',
    score: 200,
    difficulty: 'Fàcil',
    description: 'Col·loca tres fitxes en línia abans que el teu oponent.',
    imageUrl: 'images/3enratlla.jpeg',
  },
  {
    id: 3,
    name: 'Memory',
    score: 80,
    difficulty: 'Difícil',
    description: 'Joc on has de trobar parelles de fitxes coincidents.',
    imageUrl: 'images/memory.png',
  },
  {
    id: 4,
    name: 'Snake',
    score: 240,
    difficulty: 'Fàcil',
    description: 'Controla una serp que que va creixent a mesura que menja.',
  },
  {
    id: 5,
    name: 'Tetris',
    score: 100,
    difficulty: 'Difícil',
    description: 'Trencaclosques on has de completar línies horitzontals',
  },
  {
    id: 6,
    name: 'Arkanoid',
    score: 400,
    difficulty: 'Difícil',
    description: 'Joc on has de destruir blocs amb una pilota i una paleta.',
  },
  {
    id: 7,
    name: 'Street Fighter II',
    score: 80,
    difficulty: 'Fàcil',
    description:
      'Lluita contra un oponent utilitzant una varietat de moviments i combos.',
    imageUrl: 'images/StreetFighterII.jpeg',
  },
  {
    id: 8,
    name: 'Asteroids',
    score: 120,
    difficulty: 'Mitja',
    description: 'Controla una nau espacial mentre destrueixes asteroides.',
  },
  {
    id: 9,
    name: 'Space Invaders',
    score: 520,
    difficulty: 'Mitja',
    description:
      "Defensa la Terra d'una invasió alienígena disparant als invasors.",
    imageUrl: 'images/spaceinvaders.jpeg',
  },
  {
    id: 10,
    name: 'Frogger',
    score: 660,
    difficulty: 'Difícil',
    description:
      "Guia una granota a través d'una carretera i un riu, evitant obstacles.",
    imageUrl: 'images/frogger.jpeg',
  },
];
