export default class FormatUtil {

    static formatBalance(balance) {
        return `€${balance.toFixed(2)}`
    }

    static formatFirstLastName(fullName) {
        const nameArray = fullName.split(' ');
        const firstName = nameArray[0];
        if(nameArray.length >= 2){
            const lastName = nameArray[nameArray.length - 1];
            return `${firstName} ${lastName}`;
        }
        return `${firstName}`
    }

    static formatFirstName(fullName) {
        const nameArray = fullName.split(' ');
        const firstName = nameArray[0];
        return firstName;
    }

    static formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth()+1;
        const year = date.getFullYear();
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        const d = new Date(date);
        let wk = weekday[d.getDay()];
        return `${wk}, ${day}/${month}/${year}`;
    }
}
