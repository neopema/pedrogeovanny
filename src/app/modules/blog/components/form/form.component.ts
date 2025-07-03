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
  articleId: string | null = null;
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

        this.articlesService.getArticleById(id).subscribe({
          next: (data) => {
            this.article = data;
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
          },
          error: (error) => {
            console.error('Error al obtener el artículo:', error);
            this.article = null;
          },
        });
      }
    });
  }

  onSubmit() {
    if (this.articleForm.invalid) {
      return;
    }
    const articleData: Article = this.articleForm.value;
    console.log('Datos del artículo a crear:', articleData);
    if (this.isEditMode && this.articleId) {
      this.articlesService
        .updateArticle(this.articleId, articleData)
        .subscribe({
          next: (res) => {
            this.router.navigate(['/blog', articleData.slug]);
          },
          error: (err) => {
            console.error('Error al actualizar artículo:', err);
            return;
          },
        });

      return;
    }

    this.articlesService.createArticle(articleData).subscribe({
      next: (res) => {
        // this.router.navigate(['/blog']); // ejemplo: ir a la lista de artículos
        console.log('Artículo creado:', res);
      },
      error: (err) => {
        console.error('Error al crear artículo:', err);
      },
    });
  }

  addLink() {
    const textoParaAgregar =
      '--link -link-text Text -end-link-text -link-href /href -end-link-href --end-link';
    const contenidoActual = this.articleForm.get('content')?.value || '';
    const nuevoContenido = contenidoActual + textoParaAgregar;

    this.articleForm.patchValue({
      content: nuevoContenido,
    });
  }

  addBold() {
    const textoParaAgregar = '--bold Text --end-bold';
    const contenidoActual = this.articleForm.get('content')?.value || '';
    const nuevoContenido = contenidoActual + textoParaAgregar;

    this.articleForm.patchValue({
      content: nuevoContenido,
    });
  }

  addJump() {
    const textoParaAgregar = '--line-jump';
    const contenidoActual = this.articleForm.get('content')?.value || '';
    const nuevoContenido = contenidoActual + textoParaAgregar;

    this.articleForm.patchValue({
      content: nuevoContenido,
    });
  }

  addParagraph() {
    const textoParaAgregar = '--new-paragraph';
    const contenidoActual = this.articleForm.get('content')?.value || '';
    const nuevoContenido = contenidoActual + textoParaAgregar;

    this.articleForm.patchValue({
      content: nuevoContenido,
    });
  }

  addTitle() {
    const textoParaAgregar = '--title Title --end-title';
    const contenidoActual = this.articleForm.get('content')?.value || '';
    const nuevoContenido = contenidoActual + textoParaAgregar;

    this.articleForm.patchValue({
      content: nuevoContenido,
    });
  }

  addSubtitle() {
    const textoParaAgregar = '--subtitle Subtitle --end-subtitle';
    const contenidoActual = this.articleForm.get('content')?.value || '';
    const nuevoContenido = contenidoActual + textoParaAgregar;

    this.articleForm.patchValue({
      content: nuevoContenido,
    });
  }

  addImage() {
    const textoParaAgregar =
      '--img -src /path/to/image.jpg -end-src -img-sub Subtitle -end-img-sub -img-alt Alt text -end-img-alt --end-img';
    const contenidoActual = this.articleForm.get('content')?.value || '';
    const nuevoContenido = contenidoActual + textoParaAgregar;

    this.articleForm.patchValue({
      content: nuevoContenido,
    });
  }
}
