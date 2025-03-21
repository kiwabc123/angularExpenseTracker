import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../models/expense.model';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { Chart, ArcElement, Tooltip, Legend, DoughnutController, Title } from 'chart.js';

// Register the necessary components for Doughnut chart
Chart.register(ArcElement, Tooltip, Legend, DoughnutController, Title);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective], // Import necessary modules
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  expenses: Expense[] = [];
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;

  chartData: ChartData<'doughnut'> = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [0, 0], // Default values, will be updated after calculating totals
        backgroundColor: ['#4CAF50', '#FF5733'], // Green for income, red for expenses
        hoverOffset: 10,
      },
    ],
  };

  chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => ` $${tooltipItem.raw}`,
        },
      },
    },
  };

  constructor(private expenseService: ExpenseService) {
    this.loadExpenses();
  }

  /** Load expenses and calculate totals */
  private loadExpenses() {
    this.expenses = this.expenseService.getExpenses();
    this.calculateTotals();
  }

  /** Calculate total income, total expenses, and balance */
  private calculateTotals() {
    this.totalIncome = this.expenses
      .filter((expense) => expense.type === 'income')
      .reduce((sum, expense) => sum + expense.amount, 0);

    this.totalExpense = this.expenses
      .filter((expense) => expense.type === 'expense')
      .reduce((sum, expense) => sum + expense.amount, 0);

    this.balance = this.totalIncome - this.totalExpense;

    // Update the chart data after calculating totals
    this.chartData.datasets[0].data = [this.totalIncome, this.totalExpense];
  }
}
