import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { helpSections } from './data';
import { HelpSection } from './model';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { slugOf } from '../../utils';


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

  private route: ActivatedRoute = inject(ActivatedRoute);

  referencedSection?: string;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.referencedSection = fragment
      }
    })
  }

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  isReferenced(section: HelpSection): boolean {
    return this.referencedSection === slugOf(section.title)
  }

  onOpened(section: HelpSection): void {
    this.updateFragment(slugOf(section.title))
  }

  updateFragment(value: string) {
    if (value !== this.referencedSection) {
      this.router.navigate([], { fragment: value })
    }
  }
}
