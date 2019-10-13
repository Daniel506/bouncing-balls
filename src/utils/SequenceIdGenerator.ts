/**
 * Sequence generator used to identify the balls on the canvas. It starts from 0 on application a 
 * startup and sequentially increments the id whenever new ball is instantiated.
 */
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