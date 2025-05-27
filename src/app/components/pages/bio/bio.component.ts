import { Component } from '@angular/core';
import { HeaderComponent } from '../../global/header/header.component';
import { FooterComponent } from '../../global/footer/footer.component';

@Component({
  selector: 'app-bio',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './bio.component.html',
  styleUrl: './bio.component.scss',
})
export class BioComponent {}
