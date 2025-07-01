import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-formatter',
  imports: [],
  templateUrl: './formatter.component.html',
  styleUrl: './formatter.component.scss',
})
export class FormatterComponent {
  @Input() content: string = '';

  formattedContent: string[][][] = [];

  l_text: boolean = false;
  l_url: boolean = false;

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
    let current_link: string[] = [];
    let bold = false;
    let link = false;

    console.log('Text words:', text_words);

    let current_paragraph: string[][] = [];
    let current_text: string = '';
    for (const word of text_words) {
      i++;
      if (word === '--new-paragraph') {
        current_paragraph.push(['text', current_text.trim()]);
        this.formattedContent.push(current_paragraph);
        current_paragraph = [];
        current_text = '';
        continue;
      }

      if (word === '--line-jump') {
        if (current_text != '') {
          current_paragraph.push(['text', current_text.trim()]);
          current_text = '';
        }
        current_paragraph.push(['br']);
        continue;
      }

      if (word == '--link') {
        console.log('Link detected');
        link = true;
        if (current_text != '') {
          current_paragraph.push(['text', current_text.trim()]);
          current_text = '';
        }
        continue;
      }

      if (link) {
        if (word == '--end-link') {
          link = false;
          current_paragraph.push(current_link);
          current_link = [];
          continue;
        }
        current_link = this.manageLink(word, current_link);
        continue;
      }

      if (word == '--bold') {
        bold = true;
        if (current_text != '') {
          current_paragraph.push(['text', current_text.trim()]);
          current_text = '';
        }
        continue;
      }

      if (bold) {
        if (word == '--end-bold') {
          bold = false;
          current_text = current_text.replace(/\s+$/, ''); // Remove trailing spaces
          current_paragraph.push(['bold', current_text.trim()]);
          current_text = '';
          continue;
        }
        current_text += word + ' ';
        continue;
      }

      current_text += word + ' ';

      if (i === len) {
        if (current_text != '') {
          current_paragraph.push(['text', current_text.trim()]);
          this.formattedContent.push(current_paragraph);
        }
      }
    }
  }

  manageLink(word: string, current: string[]): string[] {
    let link_text = '';

    if (word == '-end-link-href') {
      this.l_url = false;
    }
    if (word == '-end-link-text') {
      this.l_text = false;
      link_text = current[1];
      link_text = link_text.replace(/\s+$/, ''); // Remove trailing spaces
      current[1] = link_text.trim();
    }

    if (word == '-link-text') {
      this.l_text = true;
      current = ['link', '', ''];
      return current;
    }
    if (word == '-link-href') {
      this.l_url = true;
      return current;
    }

    if (this.l_url) {
      current[2] += word;
    }
    if (this.l_text) {
      current[1] += word + ' ';
    }

    return current;
  }
}
