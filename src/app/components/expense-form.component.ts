import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../models/expense.model';
import { ExpenseType } from '../enum/expense-enum';

@Component({
  selector: 'app-expense-form',
  standalone: true, // ✅ กำหนดเป็น Standalone Component
  imports: [CommonModule, FormsModule], // ✅ นำเข้า FormsModule และ CommonModule
  styleUrls: ['./expense-form.component.css'],
  templateUrl: './expense-form.component.html',
})
export class ExpenseFormComponent {
  title = '';
  amount = 0;
  type: ExpenseType  = ExpenseType.Expense;
  expenses: Expense[] = []; // Store expenses

  constructor(private expenseService: ExpenseService) {
    this.loadExpenses();
  }

  addExpense() {
    const newExpense: Expense = {
      id: Date.now().toString(),
      title: this.title,
      amount: this.amount,
      type: this.type,
      date: new Date().toISOString(),
    };
    this.expenseService.addExpense(newExpense); // Assuming this method adds to the service
    // this.expenses.push(newExpense); // Add to local list
    this.clearForm(); // Clear form after submitting
  }

  // Method to load expenses (can be used to fetch data from the service or API)
  loadExpenses() {
    this.expenses = this.expenseService.getExpenses(); // Assuming this method returns a list of expenses
  }

  // Method to clear the form
  clearForm() {
    this.title = '';
    this.amount = 0;
    this.type = ExpenseType.Expense;
  }
}
