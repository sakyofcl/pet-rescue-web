export class PetModel{
    constructor() {
        this.petId = null;
        this.petName= "";
        this.petType= null;
        this.description= "";
        this.petImage="";
        this.create_at = Date.now();
    }
}