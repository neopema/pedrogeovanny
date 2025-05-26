import { Component, OnInit } from '@angular/core';
import { Article } from '../../../../interfaces/article';
import { FAKE_ARTICLES } from '../../data/fake-articles';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [NgFor, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  articles: Article[] = [];

  ngOnInit(): void {
    this.articles = FAKE_ARTICLES;
  }
}
