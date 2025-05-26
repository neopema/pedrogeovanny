import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { MusicComponent } from './components/pages/music/music.component';
import { BioComponent } from './components/pages/bio/bio.component';
import { GamesComponent } from './components/pages/games/games.component';
import { GalleryComponent } from './components/pages/gallery/gallery.component';
import { HomeComponent } from './components/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'pedro geovanny | digital artist',
  },
  {
    path: 'alt',
    component: WelcomeComponent,
    title: 'pedro geovanny | digital artist',
  },
  {
    path: 'music',
    component: MusicComponent,
    title: 'pedro geovanny | music',
  },
  {
    path: 'bio',
    component: BioComponent,
    title: 'pedro geovanny | bio',
  },
  {
    path: 'games',
    component: GamesComponent,
    title: 'pedro geovanny | games',
  },
  {
    path: 'archive',
    component: GalleryComponent,
    title: 'pedro geovanny | archive',
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./modules/blog/blog.module').then((m) => m.BlogModule),
  },
];
