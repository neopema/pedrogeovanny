import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';
import { ArticleComponent } from './components/article/article.component';
import { FormatterComponent } from './components/formatter/formatter.component';

import { ResolveFn } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { inject } from '@angular/core';

export const articleResolver: ResolveFn<any> = (route, state) => {
  const slug = route.paramMap.get('slug');
  if (slug) {
    return inject(ArticlesService).getArticleBySlug(slug);
  }
  return null;
};

const routes: Routes = [
  { path: '', component: ListComponent, title: 'pedro geovanny | blog' },
  { path: 'crear', component: FormComponent },
  { path: 'editar/:id', component: FormComponent },
  {
    path: ':slug',
    component: ArticleComponent,
    resolve: { article: articleResolver },
  },
  { path: 'format', component: FormatterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
