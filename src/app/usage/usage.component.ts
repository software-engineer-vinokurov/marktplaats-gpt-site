import { Component, ViewChild } from '@angular/core';
import { SuggestionsService } from '../suggestions.service';
import { CommonModule } from '@angular/common';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { formatTimestamp } from '../../utils';


interface UsageHistoryEntry {
  id: string;
  updated_at: string;
  service: string
  usage_cost: number;
  balance_before: number;
}

interface UsageHistory {
  updated_at?: string;
  entries: UsageHistoryEntry[];
}

@Component({
  selector: 'app-usage',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatTableModule,
    MatSortModule,
  ],
  templateUrl: './usage.component.html',
  styleUrl: './usage.component.css'
})
export class UsageComponent {
  public downloading: boolean = false;
  public usageHistory?: UsageHistory
  columnsToDisplay: string[] = ['updated_at', 'usage_cost', 'balance_before'];
  dataSource: MatTableDataSource<UsageHistoryEntry> = new MatTableDataSource(this.usageHistory ? (this.usageHistory.entries) : []);

  constructor(private suggestionsService: SuggestionsService, private _liveAnnouncer: LiveAnnouncer) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  ngOnInit() {
    this.loadUserBalance();
  }

  private reconnectDataSource() {
    this.dataSource.data = this.usageHistory ? (this.usageHistory.entries) : [];
    this.dataSource.sort = this.sort;
    this.table.renderRows();
  }

  loadUserBalance() {
    this.downloading = true;
    this.suggestionsService.getUserUsageHistory().subscribe((response) => {
      this.downloading = false;
      if (response.body) {
        let data = response.body;
        console.log(data);
        this.usageHistory = { ...data.user_usage_history, updated_at: data.updated_at };
        this.reconnectDataSource();
      } else {
        console.error(response);
      }
    });
  }

  formatTimestamp = formatTimestamp;

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
