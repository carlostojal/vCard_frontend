import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        name: 'John Doe',
        balance: 0,
        phone: 9999999999,
        token: null
    }),
    actions: {
        init(name, balance, phone, token) {
            this.name = name;
            this.balance = balance;
            this.phone = phone;
            this.token = token;
        },
        addBalance(amount) {
            if(amount > 0)
                this.balance += amount;
        },
        removeBalance(amount) {
            if(amount > 0)
                this.balance -= amount;
        },
        updateName(name) {
            this.name = name;
        }
    }
});
