import { Component, OnInit } from '@angular/core';
import { Article } from '../../../../interfaces/article';
import { FAKE_ARTICLES } from '../../data/fake-articles';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../../../components/global/header/header.component';
import { FooterComponent } from '../../../../components/global/footer/footer.component';
import { ArticlesService } from '../../../../services/articles.service';
import { FormatterComponent } from '../formatter/formatter.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  imports: [HeaderComponent, FooterComponent, FormatterComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit {
  article: Article | undefined;
  nullArticle: boolean = false;
  postDate: string = '';

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        // this.article = FAKE_ARTICLES.find((article) => article.slug === slug);
        this.articlesService.getArticleBySlug(slug).subscribe({
          next: (data) => {
            this.article = data;
            this.postDate = this.formatDate(this.article.createdAt.toString());
            this.titleService.setTitle(`pedro geovanny | ${data.title}`);
          },
          error: (error) => (this.nullArticle = true),
        });
      }
    });
  }

  formatDate(fechaISO: string): string {
    const meses = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ];

    const fecha = new Date(fechaISO);
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();

    return `${dia} de ${mes} del ${anio}`;
  }
}
