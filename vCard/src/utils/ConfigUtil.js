
export default class ConfigUtil {

    static getApiUrl() {
        return `${import.meta.env.VITE_BACKEND_ADDRESS}:${import.meta.env.VITE_BACKEND_PORT}${import.meta.env.VITE_BACKEND_ENDPOINT}`;
    }

    static getNotificationUrl(token) {
        return `ws://${token}@${import.meta.env.VITE_NOTIFICATION_ADDRESS}:${import.meta.env.VITE_NOTIFICATION_PORT}${import.meta.env.VITE_NOTIFICATION_ENDPOINT}`;
    }
}