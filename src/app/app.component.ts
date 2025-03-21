import { Component } from '@angular/core';
import { ExpenseFormComponent } from './components/expense-form.component';
import { DashboardComponent } from './components/dashboard.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ExpenseFormComponent, DashboardComponent],
  template: `
    <nav>
      <a routerLink="/dashboard">Dashboard</a> |
      <a routerLink="/expense-form">Add Expense</a>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
