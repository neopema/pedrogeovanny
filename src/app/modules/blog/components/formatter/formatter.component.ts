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

  img_src: boolean = false;
  img_alt: boolean = false;
  img_sub: boolean = false;

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
    let current_img: string[] = [];
    let bold = false;
    let link = false;
    let title = false;
    let subtitle = false;
    let img = false;

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
          if (i === len) {
            this.formattedContent.push(current_paragraph);
          }
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
          if (i === len) {
            this.formattedContent.push(current_paragraph);
          }
          continue;
        }
        current_text += word + ' ';
        continue;
      }

      if (word == '--title') {
        title = true;
        if (current_text != '') {
          current_paragraph.push(['text', current_text.trim()]);
          current_text = '';
        }
        continue;
      }

      if (title) {
        if (word == '--end-title') {
          title = false;
          current_text = current_text.replace(/\s+$/, ''); // Remove trailing spaces
          current_paragraph.push(['title', current_text.trim()]);
          current_text = '';
          if (i === len) {
            this.formattedContent.push(current_paragraph);
          }
          continue;
        }
        current_text += word + ' ';
        continue;
      }

      if (word == '--subtitle') {
        subtitle = true;
        if (current_text != '') {
          current_paragraph.push(['text', current_text.trim()]);
          current_text = '';
        }
        continue;
      }

      if (subtitle) {
        if (word == '--end-subtitle') {
          subtitle = false;
          current_text = current_text.replace(/\s+$/, ''); // Remove trailing spaces
          current_paragraph.push(['subtitle', current_text.trim()]);
          current_text = '';
          if (i === len) {
            this.formattedContent.push(current_paragraph);
          }
          continue;
        }
        current_text += word + ' ';
        continue;
      }

      if (word == '--img') {
        img = true;
        if (current_text != '') {
          current_paragraph.push(['text', current_text.trim()]);
          current_text = '';
        }
        continue;
      }

      if (img) {
        if (word == '--end-img') {
          img = false;
          current_paragraph.push(current_img);
          current_img = [];
          if (i === len) {
            this.formattedContent.push(current_paragraph);
          }
          continue;
        }
        current_img = this.manageImg(word, current_img);
        continue;
      }

      current_text += word + ' ';

      if (i === len) {
        if (current_text != '') {
          current_paragraph.push(['text', current_text.trim()]);
          this.formattedContent.push(current_paragraph);
        } else {
          this.formattedContent.push(current_paragraph);
        }
      }
    }
  }

  manageImg(word: string, current: string[]): string[] {
    if (word == '-end-src') {
      this.img_src = false;
    }

    if (word == '-end-img-sub') {
      this.img_sub = false;
      current[2] = current[2].replace(/\s+$/, '');
      current[2] = current[2].trim();
    }

    if (word == '-end-img-alt') {
      this.img_alt = false;
      current[3] = current[3].replace(/\s+$/, '');
      current[3] = current[3].trim();
    }

    if (word == '-src') {
      this.img_src = true;
      current = ['img', '', '', ''];
      return current;
    }

    if (word == '-img-sub') {
      this.img_sub = true;
      return current;
    }

    if (word == '-img-alt') {
      this.img_alt = true;
      return current;
    }

    if (this.img_sub) {
      current[2] += word + ' ';
    }

    if (this.img_src) {
      current[1] += word;
    }

    if (this.img_alt) {
      current[3] += word + ' ';
    }

    return current;
  }

  manageLink(word: string, current: string[]): string[] {
    let link_text = '';

    if (word == '-end-link-href') {
      this.l_url = false;
    }
    if (word == '-end-link-text') {
      this.l_text = false;
      link_text = current[1];
      link_text = link_text.replace(/\s+$/, '');
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
