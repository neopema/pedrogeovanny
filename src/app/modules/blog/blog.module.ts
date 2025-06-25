import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  providers: [provideHttpClient()],
  declarations: [],
  imports: [CommonModule, BlogRoutingModule, RouterModule],
})
export class BlogModule {}
