import { Component } from '@angular/core';
import { SuggestionsService } from '../suggestions.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';


interface UserBalance {
  updated_at?: string;
  balance?: number;
  currency?: string;
}

export interface Plan {
  name: string;
  active: boolean;
  color: string;
}

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [
    MatChipsModule,
    MatCardModule,
  ],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css'
})
export class BalanceComponent {
  public downloading: boolean = false;
  public user_balance: UserBalance = {}

  plans: Plan[] = [
    { name: 'Freemium', active: true, color: "accent" },
    { name: 'Premium', active: false, color: "primary" },
  ];

  constructor(private suggestionsService: SuggestionsService) { }

  ngOnInit() {
    this.loadUserBalance();
  }

  loadUserBalance() {
    this.downloading = true;
    this.suggestionsService.getUserBalance().subscribe((response) => {
      this.downloading = false;
      if (response.body) {
        let data = response.body;
        console.log(data);
        this.user_balance = { ...data.user_balance, updated_at: data.updated_at };
      } else {
        console.error(response);
      }
    });
  }

  onPlanClick(planName: string) {

    this.plans = [
      { name: 'Freemium', active: true, color: "accent" },
      { name: 'Premium', active: false, color: "primary" },
    ];
  }
}
