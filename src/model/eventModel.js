export class EventModel{
    constructor() {
        this.eventId = null;
        this.eventName = "";
        this.eventDate = Date.now();
        this.isApproved = false;
    }
}