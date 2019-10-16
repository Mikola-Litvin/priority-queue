class Node {
	
	constructor(data, priority) {

		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {

		if (this.left && this.right) {

			return;
		}
		else if (this.left && !this.right) {

			node.parent = this;
			this.right = node;
		}
		else {

			node.parent = this;
			this.left = node;
		}
	}

	removeChild(node) {

		if (this.left == node) {

			node.parent = null;
			this.left = null;
			return node;
		}
		else if (this.right == node) {

			node.parent = null;
			this.right = null;
			return node;
		}
		else if (this.left != node && this.right != node) {

			throw new Error("Error");
		}
 	}

	remove() {

		if (!this.parent) {

			return;
		}
		else {

			return this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		
		if (!this.parent) {

			return;
		}
		else {

			let prnt = this.parent;
			let chld = this;
			let valParent = prnt.parent;
			let prntL = prnt.left;
			let prntR = prnt.right;
			let chldL = chld.left;
			let chldR = chld.right;
			let rmv, val;

			if (prnt.parent) {

				if (chld.parent == prnt.parent.left) {

					prnt.parent.left = chld;
				}
				else if (chld.parent == prnt.parent.right) {

					prnt.parent.right = chld;
				}
			}

			chld.left = null;
			chld.right = null;
			this.appendChild(prnt);
			rmv = this.remove();
			this.parent = valParent;
			prnt.left = chldL;
			prnt.right = chldR;

			if (prnt.left) prnt.left.parent = prnt;
			if (prnt.right) prnt.right.parent = prnt;

			if (rmv == prntL) {

				chld.right = prntR;
				if (chld.right) chld.right.parent = chld;
				chld.left = prnt;
				
			}
			else if (rmv == prntR) {

				chld.left = prntL;
				if (chld.left) chld.left.parent = chld;
				chld.right = prnt;
			}
		}
	}
}

module.exports = Node;
