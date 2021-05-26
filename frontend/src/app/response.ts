import { Computer } from "./computer"
export class Response {
    public constructor(
        public count: Number,
        public totalCount: Number,
        public result: Computer[]
    ) { }
}
