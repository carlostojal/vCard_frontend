export default class FormatUtil {

    static formatBalance(balance) {
        return `€${balance.toFixed(2)}`
    }

    static formatFirstLastName(fullName) {
        const nameArray = fullName.split(' ');
        const firstName = nameArray[0];
        const lastName = nameArray[nameArray.length - 1];
        return `${firstName} ${lastName}`;
    }

    static formatFirstName(fullName) {
        const nameArray = fullName.split(' ');
        const firstName = nameArray[0];
        return firstName;
    }
}