import { Component, OnInit } from '@angular/core';
import { Article } from '../../../../interfaces/article';
import { FAKE_ARTICLES } from '../../data/fake-articles';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../../components/global/header/header.component';
import { FooterComponent } from '../../../../components/global/footer/footer.component';

@Component({
  selector: 'app-list',
  imports: [NgFor, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  articles: Article[] = [];

  ngOnInit(): void {
    this.articles = FAKE_ARTICLES;
  }
}
