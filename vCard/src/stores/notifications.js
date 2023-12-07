import { defineStore } from 'pinia';
import ConfigUtil from '../utils/ConfigUtil';
import { useToast } from 'vue-toastification'
import { useUserStore } from '../stores/user'
import { useTransactionsStore } from './transactions';

export const useNotificationsStore = defineStore('notifications', {
    state: () => ({
        ws: null,
        toast: useToast(),
        userStore: useUserStore(),
        transactionStore: useTransactionsStore() 
    }),
    actions: {
        init() {
            // initialize the websocket
            try {
                this.ws = new WebSocket(ConfigUtil.getNotificationUrl());
            } catch(e) {
                this.ws = null;
                throw new Error("Error starting notifications");
            }

            this.ws.onopen = () => {
                console.log("Notifications enabled");
                this.ws.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    console.log(data);
                    this.toast.info(data._message);
                    this.userStore.fetch();
                    this.transactionStore = null;
                    this.transactionStore.getAll();
                }
            };

            this.ws.onclose = () => {
                console.log("Notifications disabled");
                this.ws = null;
            };
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
            this.ws.send(JSON.stringify({
                _destination: phone_number,
                _type: "credit_in",
                _message: message
            }));
        }
    }
});
