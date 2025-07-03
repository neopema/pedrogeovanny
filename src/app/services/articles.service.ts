import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private http = inject(HttpClient);
  // private apiUrl = 'http://localhost:3000/articles';
  // private apiUrl_2 = 'http://localhost:3000/article';
  private apiUrl = 'https://pg-backend-sowj.onrender.com/articles';
  private apiUrl_2 = 'https://pg-backend-sowj.onrender.com/article';

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  getArticleBySlug(slug: string): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${slug}`);
  }

  createArticle(article: Article): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, article);
  }

  updateArticle(id: string, article: Article): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, article);
  }

  getArticleById(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl_2}/${id}`);
  }
}
