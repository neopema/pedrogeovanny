import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../../../interfaces/article';
import { FAKE_ARTICLES } from '../../data/fake-articles';
import { JsonPipe, NgIf } from '@angular/common';
import { ArticlesService } from '../../../../services/articles.service';

@Component({
  selector: 'app-form',
  imports: [NgIf, ReactiveFormsModule, JsonPipe, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  articleForm: FormGroup;
  isEditMode: boolean = false;
  articleId: number | null = null;
  article: Article | null = null;
  master_password: string = 'xot1g93+yIn_br+bu5';
  current_password: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private articlesService: ArticlesService
  ) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      slug: ['', [Validators.required, Validators.minLength(3)]],
      summary: ['', [Validators.required, Validators.minLength(10)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
      image: [''],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id']; // Si la ruta es 'editar/:id'
      if (id) {
        console.log('Editando artículo con ID:', id);
        this.isEditMode = true;
        this.articleId = id;
        // Simula obtener el artículo a editar
        this.article =
          FAKE_ARTICLES.find((a) => a._id === this.articleId) || null;

        console.log('Artículo encontrado:', this.article);
        if (this.article) {
          this.articleForm.patchValue({
            title: this.article.title,
            slug: this.article.slug,
            summary: this.article.summary,
            content: this.article.content,
            image: this.article.image,
          });

          console.log(
            'Formulario actualizado con los datos del artículo:',
            this.articleForm
          );
        }
      }
    });
  }

  onSubmit() {
    if (this.articleForm.invalid) {
      return;
    }
    if (this.isEditMode && this.articleId) {
      return;
    }

    const articleData: Article = this.articleForm.value;
    console.log('Datos del artículo a crear:', articleData);

    this.articlesService.createArticle(articleData).subscribe({
      next: (res) => {
        this.router.navigate(['/blog']); // ejemplo: ir a la lista de artículos
      },
      error: (err) => {
        console.error('Error al crear artículo:', err);
      },
    });
  }
}
