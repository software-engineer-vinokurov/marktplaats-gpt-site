import { Component } from '@angular/core';
import { SuggestionsService } from '../suggestions.service';

interface UserBalance {
  updated_at?: string;
  balance?: number;
  currency?: string;
}

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css'
})
export class BalanceComponent {
  public downloading: boolean = false;
  public user_balance: UserBalance = {}

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
}
