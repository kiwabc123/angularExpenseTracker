import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private expenses: Expense[] = [];

  constructor() {
    this.loadExpenses(); // Load stored expenses when service initializes
  }

  private saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  private loadExpenses() {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      this.expenses = JSON.parse(storedExpenses);
    }
  }

  addExpense(expense: Expense) {
    this.expenses.push(expense);
    this.saveExpenses(); // Save to localStorage after adding
  }

  getExpenses(): Expense[] {
    return this.expenses;
  }

  clearExpenses() {
    this.expenses = [];
    localStorage.removeItem('expenses'); // Clear from localStorage
  }
}
