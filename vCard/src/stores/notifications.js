import { defineStore } from 'pinia';
import ConfigUtil from '../utils/ConfigUtil';
import { useToast } from 'vue-toastification'
import { useUserStore } from '../stores/user'
import { useTransactionsStore } from './transactions';
import io from "socket.io-client";

export const useNotificationsStore = defineStore('notifications', {
    state: () => ({
        ws: null,
        toast: useToast(),
        userStore: useUserStore(),
        transactionStore: useTransactionsStore() 
    }),
    actions: {
        async init() {
            await this.userStore.fetch();
            // initialize the websocket
            try {
                this.ws = io(ConfigUtil.getNotificationUrl(), {
                    query: "client_id="+this.userStore.phone
                });
            } catch(e) {
                this.ws = null;
                throw new Error("Error starting notifications");
            }

            this.ws.on("connect_error", (error) => {
                this.toast.error("Error connecting to the notification service: " + error.message);
            });

            this.ws.on("connect", () => {
                console.log("Notifications enabled");
                this.ws.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    console.log(data);
                    this.toast.info(data._message);
                    this.userStore.fetch();
                    this.transactionStore = null;
                    this.transactionStore.getAll();
                }
            });

            this.ws.on("disconnect", () => {
                console.log("Notifications disabled");
                this.ws = null;
            });
            
            this.ws.on("transaction", (transaction) => {
                // received when a transaction is received
                /*
                structure:

                {
                    amount: parseFloat(amount),
                    phone_number: phone_number,
                    confirmation_code: confirmation_code,
                    description: description,
                    payment_type: payment_type
                }*/

                // add the transaction to the list
                this.transactionStore.myTransactions.unshift(transaction);
            });

            this.ws.on("notification", () => {
                // received on notification
                /*
                structure:

                {
                    "destination": phone_number,
                    "message": message
                }
                */

                // show the alert
                this.toast.info(data.message);
            });
        },
        destroy() {
            if(this.ws != null) {
                this.ws.close();
            }
        },
        sendNotification(phone_number, message) {

            // lazy initialization
            if(this.ws == null) {
                this.init();
            }

            // send a notification
            this.ws.emit("notification", JSON.stringify({
                destination: phone_number,
                message: message
            }));
        },
        sendMoneyTo(amount, phone_number, payment_type) {

            // lazy initialization
            if(this.ws == null) {
                this.init();
            }

            // send a notification
            this.ws.emit("transaction", JSON.stringify({
                amount: parseFloat(amount),
                phone_number: phone_number,
                date: new Date(),
                payment_type: payment_type
            }));
        }
    }
});
