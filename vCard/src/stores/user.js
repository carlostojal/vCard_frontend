import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        name: 'John Doe',
        balance: 0,
        phone: 9999999999
    }),
    actions: {
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
