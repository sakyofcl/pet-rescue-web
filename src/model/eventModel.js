export class EventModel{
    constructor() {
        this.eventId = null;
        this.eventName = "";
        this.eventDate = getCurrentDate();
        this.isApproved = false;
    }
}

export function getCurrentDate(date) {
    const today = new Date(date ? date : undefined);
    const year = today.getFullYear();
    let month = today.getMonth() + 1; // Month is 0-based, so add 1
    let day = today.getDate();
  
    // Ensure month and day are formatted with leading zeros if needed
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
  
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}