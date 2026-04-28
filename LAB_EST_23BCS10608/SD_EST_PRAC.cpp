#include <bits/stdc++.h>
using namespace std;
class Account {
private:
    string accountNumber;
    double balance;

public:
    Account(string accNum, double initialBalance = 0.0)
        : accountNumber(accNum), balance(initialBalance) {}

     string getAccountNumber() const {
        return accountNumber;
    }

    double getBalance() const {
        return balance;
    }

    void setBalance(double newBalance) {
        balance = newBalance;
    }
};
class Transaction {
public:
    static bool deposit(Account& account, double amount) {
        if (amount > 0) {
            account.setBalance(account.getBalance() + amount);
            return true;
        }
        return false;
    }

    static bool withdraw(Account& account, double amount) {
        if (amount > 0 && account.getBalance() >= amount) {
            account.setBalance(account.getBalance() - amount);
            return true;
        }
        return false;
    }

    static bool transfer(Account& from, Account& to, double amount) {
        if (withdraw(from, amount)) {
            deposit(to, amount);
            return true;
        }
        return false;
    }
};
class Bank {
private:
    std::vector<Account> accounts;

public:
    void addAccount(const Account& account) {
        accounts.push_back(account);
    }

    Account* findAccount(const std::string& accountNumber) {
        for (auto& acc : accounts) {
            if (acc.getAccountNumber() == accountNumber) {
                return &acc;
            }
        }
        return nullptr;
    }

    void displayAllAccounts() const {
        for (const auto& acc : accounts) {
            std::cout << "Account: " << acc.getAccountNumber()
                      << ", Balance: $" << acc.getBalance() << std::endl;
        }
    }
};

int main() {
    Bank bank;
    Account acc1("123456", 1000.0);
    Account acc2("789012", 500.0);
    bank.addAccount(acc1);
    bank.addAccount(acc2);
    Account* acc1Ptr = bank.findAccount("123456");
    Account* acc2Ptr = bank.findAccount("789012");

    if (acc1Ptr && acc2Ptr) {
        Transaction::deposit(*acc1Ptr, 200.0);
        Transaction::withdraw(*acc2Ptr, 100.0);
        Transaction::transfer(*acc1Ptr, *acc2Ptr, 150.0);
    }
    bank.displayAllAccounts();

    return 0;
}