import { Component, OnInit } from '@angular/core';
import { Article } from '../../../../interfaces/article';
import { FAKE_ARTICLES } from '../../data/fake-articles';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../../../components/global/header/header.component';
import { FooterComponent } from '../../../../components/global/footer/footer.component';
import { ArticlesService } from '../../../../services/articles.service';
import { FormatterComponent } from '../formatter/formatter.component';

@Component({
  selector: 'app-article',
  imports: [HeaderComponent, FooterComponent, FormatterComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit {
  article: Article | undefined;
  nullArticle: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        // this.article = FAKE_ARTICLES.find((article) => article.slug === slug);
        this.articlesService.getArticleBySlug(slug).subscribe({
          next: (data) => (this.article = data),
          error: (error) => (this.nullArticle = true),
        });
      }
    });
  }
}
