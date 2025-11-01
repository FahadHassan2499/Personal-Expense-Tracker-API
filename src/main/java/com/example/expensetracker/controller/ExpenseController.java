package com.example.expensetracker.controller;

import com.example.expensetracker.model.Expense;
import com.example.expensetracker.model.User;
import com.example.expensetracker.repository.ExpenseRepository;
import com.example.expensetracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

    // 🔹 Get logged-in username
    private String getLoggedInUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getName();
    }

    // 🔹 Get all expenses of logged-in user
    @GetMapping
    public List<Expense> getAllExpenses() {
        String username = getLoggedInUsername();
        User user = userRepository.findByUsername(username).orElseThrow();
        return expenseRepository.findByUser(user);
    }

    // 🔹 Create a new expense for logged-in user
    @PostMapping
    public Expense createExpense(@RequestBody Expense expense) {
        String username = getLoggedInUsername();
        User user = userRepository.findByUsername(username).orElseThrow();
        expense.setUser(user);
        return expenseRepository.save(expense);
    }

    // 🔹 Update expense only if it belongs to logged-in user
    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody Expense updatedExpense) {
        String username = getLoggedInUsername();
        User user = userRepository.findByUsername(username).orElseThrow();

        Expense existingExpense = expenseRepository.findById(id)
                .filter(expense -> expense.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("Expense not found or unauthorized"));

        existingExpense.setTitle(updatedExpense.getTitle());
        existingExpense.setDescription(updatedExpense.getDescription());
        existingExpense.setCategory(updatedExpense.getCategory());
        existingExpense.setAmount(updatedExpense.getAmount());
        existingExpense.setDate(updatedExpense.getDate());

        return expenseRepository.save(existingExpense);
    }

    // 🔹 Delete expense only if it belongs to logged-in user
    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable Long id) {
        String username = getLoggedInUsername();
        User user = userRepository.findByUsername(username).orElseThrow();

        Expense expense = expenseRepository.findById(id)
                .filter(e -> e.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("Expense not found or unauthorized"));

        expenseRepository.delete(expense);
        return "Expense deleted successfully!";
    }
}
