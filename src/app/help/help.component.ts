import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { helpSections } from './data';
import { HelpSection } from './model';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-help',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
  ],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css'
})
export class HelpComponent {
  sections: HelpSection[] = helpSections;

  @ViewChild(MatAccordion) accordion!: MatAccordion;
}
