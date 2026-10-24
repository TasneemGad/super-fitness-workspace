import { Component } from '@angular/core';
import { AccountBasicMetrics } from '../components/account-basic-metrics/account-basic-metrics.component';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [AccountBasicMetrics],
  templateUrl: './account-page.html',
})
export class AccountPage {}
