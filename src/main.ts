import 'zone.js'; 
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { ExpenseFormComponent } from './app/components/expense-form.component';
import { DashboardComponent } from './app/components/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'expense-form', component: ExpenseFormComponent },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});
