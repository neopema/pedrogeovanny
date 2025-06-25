import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-formatter',
  imports: [],
  templateUrl: './formatter.component.html',
  styleUrl: './formatter.component.scss',
})
export class FormatterComponent {
  @Input() content: string = '';

  formattedContent: string[][] = [];

  ngOnInit(): void {
    console.log('Content to format:', this.content);
    this.formatContent();
    console.log('Formatted content:', this.formattedContent);
  }

  formatContent(): void {
    this.content = this.content.replace(/\n/g, ' ');
    let text_words = this.content.split(' ');
    const len = text_words.length;
    let i = 0;
    console.log('Text words:', text_words);

    let current_paragraph: string[] = [];
    let current_text: string = '';
    for (const word of text_words) {
      i++;
      if (word === '--new-paragraph') {
        current_paragraph.push(current_text.trim());
        this.formattedContent.push(current_paragraph);
        current_paragraph = [];
        current_text = '';
        continue;
      }

      if (word === '--line-jump') {
        if (current_text != '') {
          current_paragraph.push(current_text.trim());
          current_text = '';
        }
        current_paragraph.push('br');
        continue;
      }

      current_text += word + ' ';

      if (i === len) {
        if (current_text != '') {
          current_paragraph.push(current_text.trim());
          this.formattedContent.push(current_paragraph);
        }
      }
    }
  }
}
