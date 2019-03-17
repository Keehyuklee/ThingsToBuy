export class Item {
    constructor(
        public id: number,
        public title: string,
        public addedDate: Date,
        public dueDate: Date,
        public quantity: number
    ) {}
}