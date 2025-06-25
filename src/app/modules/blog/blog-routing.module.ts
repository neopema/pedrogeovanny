import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';
import { ArticleComponent } from './components/article/article.component';
import { FormatterComponent } from './components/formatter/formatter.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'crear', component: FormComponent },
  { path: 'editar/:id', component: FormComponent },
  { path: ':slug', component: ArticleComponent },
  { path: 'format', component: FormatterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
