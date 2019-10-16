const Node = require('./node');

class MaxHeap {

	constructor() {
		
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		
		let node = new Node(data, priority);

		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		
		if (this.parentNodes.length == 0) return;

		let detached = this.detachRoot();

		this.restoreRootFromLastInsertedNode(detached);

		this.shiftNodeDown(this.root);

		return ("data" in detached) ? detached.data : null;
	}

	detachRoot() {
		
		if (this.root == null) {

			return {};
		}
		else {

			if (this.parentNodes.indexOf(this.root) != -1) this.parentNodes.splice(this.parentNodes.indexOf(this.root), 1);
			
			let detached = this.root;
			this.root = null;
	
			return detached;
		}
	}

	restoreRootFromLastInsertedNode(detached) {

		if (!("data" in detached) || this.parentNodes.length == 0) return;
		
		let parentForChild = this.parentNodes[this.parentNodes.length - 1].parent;
		let child = this.parentNodes[this.parentNodes.length - 1].remove();

		if (child) {
			child.left = detached.left;
			child.right = detached.right;
			this.root = child;
	
			if (child.left) child.left.parent = child;
	
			if (child.right) child.right.parent = child;
	
			if (!child.left && !child.right) {
	
				return;
			}
			else if (child.left && !child.right) {
	
				this.parentNodes.splice(0, 1, child);
				this.parentNodes.splice(1, 1, child.left);
			}
			else {
	
				if (this.parentNodes.indexOf(parentForChild) == -1) this.parentNodes.unshift(parentForChild);
				this.parentNodes.pop();
			}
		}
	}

	size() {

		let length, sizeHeap;
		length = sizeHeap = this.parentNodes.length;
		
		while (length > 1) {

			length = Math.round(length / 2);
			sizeHeap = sizeHeap + length;
		}

		if (this.parentNodes.length == 2) {

			if (this.parentNodes.indexOf(this.root) != -1) sizeHeap = sizeHeap - 1;
		}

		return sizeHeap;
	}

	isEmpty() {
		
		return this.size() == 0 ? true : false;
	}

	clear() {
		
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		
		if (this.parentNodes.length == 0) {
		
			this.root = node;
			this.parentNodes.push(node);
			return;
		}
		else {
			
			this.parentNodes[0].appendChild(node);

			this.parentNodes.push(node);

			if (this.parentNodes[0].right == node) this.parentNodes.shift();
		}
	}

	shiftNodeUp(node) {

		if (node == this.root || node.priority <= node.parent.priority) return;

		if (node.parent == this.root) {

			if (!this.root.right) {

				this.parentNodes.splice(0, 1, node);
				this.parentNodes.splice(1, 1, this.root);
			}
			else {

				this.parentNodes.splice(this.parentNodes.indexOf(node), 1, this.root);
			}				
		}
		else {

			this.parentNodes.splice(this.parentNodes.indexOf(node), 1, node.parent);
			this.parentNodes.splice(this.parentNodes.indexOf(node.parent), 1, node);
		}

		node.swapWithParent();

		if (!node.parent) this.root = node;

		this.shiftNodeUp(node);
	}

	shiftNodeDown(node) {

		if (!node) return;

		if (node.parent && !node.parent.parent) {
			
			this.root = node.parent;
		}

		if (node.left && node.right) {

			if (node.priority > node.left.priority && node.priority > node.right.priority) return;

			if (node.left.priority > node.right.priority) {

				if (node.left.parent == this.root) {

					if (this.parentNodes.indexOf(node.left) != -1) this.parentNodes.splice(this.parentNodes.indexOf(node.left), 1, this.root);				
				}
				else {
	
					if (this.parentNodes.indexOf(node) == -1) {

						this.parentNodes.splice(this.parentNodes.indexOf(node.left), 1, node);
					}
					else {
						
						this.parentNodes.splice(this.parentNodes.indexOf(node.left), 1, node);
						this.parentNodes.splice(this.parentNodes.indexOf(node), 1, node.left);
					}
				}
	
				node.left.swapWithParent();
				this.shiftNodeDown(node);
			}
			else {

				if (node.right.parent == this.root) {

					if (this.parentNodes.indexOf(node.right) != -1) this.parentNodes.splice(this.parentNodes.indexOf(node.right), 1, this.root);				
				}
				else {
	
					if (this.parentNodes.indexOf(node) == -1) {

						this.parentNodes.splice(this.parentNodes.indexOf(node.right), 1, node);
					}
					else {

						this.parentNodes.splice(this.parentNodes.indexOf(node.right), 1, node);
						this.parentNodes.splice(this.parentNodes.indexOf(node), 1, node.right);
					}
				}

				node.right.swapWithParent();
				this.shiftNodeDown(node);
			}
		}
		else if (node.left && !node.right) {

			if (node.priority > node.left.priority) return;

			if (node.left.parent == this.root) {

					this.parentNodes.splice(0, 1, node.left);
					this.parentNodes.splice(1, 1, this.root);			
			}
			else {

				if (this.parentNodes.indexOf(node) == -1) {

					this.parentNodes.splice(this.parentNodes.indexOf(node.left), 1, node);
				}
				else {
					
					this.parentNodes.splice(this.parentNodes.indexOf(node.left), 1, node);
					this.parentNodes.splice(this.parentNodes.indexOf(node), 1, node.left);
				}
			}

			node.left.swapWithParent();
			this.shiftNodeDown(node);
		}
		else if (!node.left && node.right) {

			if (node.priority > node.right.priority) return;

			if (node.right.parent == this.root) {

				this.parentNodes.splice(0, 1, node.right);
				this.parentNodes.splice(1, 1, this.root);
			}
			else {

				if (this.parentNodes.indexOf(node) == -1) {

					this.parentNodes.splice(this.parentNodes.indexOf(node.right), 1, node);
				}
				else {

					this.parentNodes.splice(this.parentNodes.indexOf(node.right), 1, node);
					this.parentNodes.splice(this.parentNodes.indexOf(node), 1, node.right);
				}
			}

			node.right.swapWithParent();
			this.shiftNodeDown(node);
		}
		else {

			return;
		}
	}
}

module.exports = MaxHeap;
