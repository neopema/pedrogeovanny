import { Article } from '../../../interfaces/article';

export const FAKE_ARTICLES: Article[] = [
  {
    _id: 1,
    title: 'Primer artículo de ejemplo',
    slug: 'primer-articulo-de-ejemplo',
    summary: 'Este es el resumen del primer artículo.',
    content:
      '<p>Este es el <strong>contenido completo</strong> del primer artículo.</p>',
    image: 'https://placehold.co/600x400',
    createdAt: new Date('2025-05-01T10:00:00'),
    updatedAt: new Date('2025-05-01T12:00:00'),
  },
  {
    _id: 2,
    title: 'Segundo artículo de ejemplo',
    slug: 'segundo-articulo-de-ejemplo',
    summary: 'Resumen del segundo artículo.',
    content: '<p>Contenido completo del segundo artículo.</p>',
    image: 'https://placehold.co/600x400',
    createdAt: new Date('2025-05-10T09:30:00'),
    updatedAt: new Date('2025-05-10T09:30:00'),
  },
];
