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

    static formatDate(date) {
        // get the month name
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];

        // get the week day name
        const weekDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const weekDay = weekDayNames[date.getDay()];

        // get the day and year
        const day = date.getDate();
        const year = date.getFullYear();

        return `${weekDay}, ${day} ${month} ${year}`;
    }
}