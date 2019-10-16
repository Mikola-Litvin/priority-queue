const MaxHeap = require('./max-heap.js');

class PriorityQueue {

	constructor(maxSize) {

		this.maxSize = (maxSize) ? maxSize : 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {

		if (this.size() == this.maxSize) throw new Error("The queue has max size");
		this.heap.push(data, priority);
	}

	shift() {

		if (this.isEmpty()) throw new Error("The queue is empty");
		return this.heap.pop();
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
