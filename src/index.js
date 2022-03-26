var ComparatorFn = (a, b) => {};

var PriorityQueueParams = (comparatorFn, initalValues) => { return {comparatorFn: comparatorFn ? comparatorFn : () => {}, initalValues: initalValues ? initalValues : []}};

class PriorityQueue {

    constructor(params) {
        this.values = [];
        this.length = 0;
        this.comparatorFn = params.comparatorFn;
        params.initalValues.forEach(value => this.insert(value));
    }

    insert(value) {
        // If we don't have enough space, expand the size of the array
        if (this.values.length <= this.length) {
            this.values.length = Math.max(1, this.values.length * 2);
        }
        // Insert the value
        this.values[this.length++] = value;

        this._bubbleUp();
    }

    remove() {
        // If the tree is empty return null
        if (this.length === 0) return null;

        const node = this.values[0];

        // Check if we have 1 element in the tree
        if (this.length === 1) {
            this.length = 0;
            this.values[0] = null;
            return node;
        }

        this.values[0] = this.values[this.length - 1];
        this.values[this.length - 1] = null;
        this.length--;

        this._bubbleDown();

        return node;
    }

    _parent(nodeIndex) {
        if (nodeIndex === 0) return null;
        return (nodeIndex - 1) >>> 1; // Divide by 2 and round it to the inferior value
    }

    _leftChild(nodeIndex) {
        const child = (nodeIndex * 2) + 1;
        return (child >= this.length) ? null : child;
    }

    _rightChild(nodeIndex) {
        const child = (nodeIndex * 2) + 2;
        return (child >= this.length) ? null : child;
    }

    heapsort() {
        return Array.from({length: this.length}, () => this.remove());
    }

    _bubbleUp() {
        // Select the deepest node of tree
        let index = this.length - 1;

        while (true) {
             const parentIndex = this._parent(index);

             if (parentIndex !== null && this.comparatorFn(this.values[index], this.values[parentIndex]) < 0) {
                 const tmp = this.values[index];
                 this.values[index] = this.values[parentIndex];
                 this.values[parentIndex] = tmp;
                 index = parentIndex;
                 continue;
             }

             return;
        }
    }

    _bubbleDown() {
        let index = 0;
        while (true) {
            const left = this._leftChild(index);
            const right = this._rightChild(index);

            let swapCandidate = index;

            if (left !== null && this.comparatorFn(this.values[swapCandidate], this.values[left]) > 0) {
                swapCandidate = left;
            }
            if (right !== null && this.comparatorFn(this.values[swapCandidate], this.values[right]) > 0) {
                swapCandidate = right;
            }

            if (swapCandidate !== index) {
                const tmp = this.values[index];
                this.values[index] = this.values[swapCandidate];
                this.values[swapCandidate] = tmp;
                index = swapCandidate;
                continue;
            }

            return;
        } 
    }

}
var fn = (a,b) => a - b;
var values = [32, 5, 10, 44, 1]
var Q = new PriorityQueue(PriorityQueueParams(fn, values));
console.log(Q.values);
console.log(Q.heapsort());