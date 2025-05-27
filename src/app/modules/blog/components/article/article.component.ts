import { Component, OnInit } from '@angular/core';
import { Article } from '../../../../interfaces/article';
import { FAKE_ARTICLES } from '../../data/fake-articles';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../../../components/global/header/header.component';
import { FooterComponent } from '../../../../components/global/footer/footer.component';

@Component({
  selector: 'app-article',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit {
  article: Article | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.article = FAKE_ARTICLES.find((article) => article.slug === slug);
      }
    });
  }
}
