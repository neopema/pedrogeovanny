import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  @Input() current: string = '';

  routes: string[][] = [
    ['bio', '/bio'],
    ['music (demus)', '/music'],
    ['games (arinu)', '/games'],
    ['archive', '/archive'],
    ['blog', '/blog'],
  ];
  links: string[][][] = [
    [[], []],
    [[], []],
  ];
  dark: boolean = false;
  icon_color: string = '#ffffff';

  background: boolean = false;

  ngOnInit(): void {
    console.log(this.current);
    if (this.current === 'article') {
      this.dark = true;
      this.current = 'blog';
      this.icon_color = '#000000';
    }
    this.routes = this.routes.filter((route) => route[0] !== this.current);

    this.links[0][0] = this.routes[0];
    this.links[0][1] = this.routes[1];
    this.links[1][0] = this.routes[2];
    this.links[1][1] = this.routes[3];

    if (this.current === 'games (arinu)') {
      this.background = true;
    }

    console.log(this.background);
  }
}
