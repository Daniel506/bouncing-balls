export class SequenceIdGenerator {

    private static instance : SequenceIdGenerator;
    private sequence : number;

    private constructor() { }

    static getInstance() {
        if (this.instance == null) {
            this.instance = new SequenceIdGenerator();
            this.instance.setSequence(0);
        }

        return this.instance;
    }

    getNextSequenceId() {
        this.sequence++;
        return this.sequence;
    }

    setSequence(sequence : number) {
        this.sequence = sequence;
    }

    getSequence() {
        return this.sequence;
    }
}