class Node {
    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
        this.parent = null;
    }
}

class Tree {
    constructor(root) {
        this.root = root;
    }

    /**
     * 전위 순회
     * @return {Array.<number>} 전위 순회로 정렬된 키 목록
     */
    preorder() {
        const array = [];
        function traverse(node) {
            if (node) {
                array.push(node.data);
                traverse(node.left);
                traverse(node.right);
            }
        }
        traverse(this.root);
        return array.map(x => x.id);
    }

    /**
     * 중위 순회
     * @return {Array.<number>} 중위 순회로 정렬된 키 목록
     */
    inorder() {
        const array = [];
        function traverse(node) {
            if (node) {
                traverse(node.left);
                array.push(node.data);
                traverse(node.right);
            }
        }
        traverse(this.root);
        return array.map(x => x.id);
    }

    /**
     * 후위 순회
     * @return {Array.<number>} 후위 순회로 정렬된 키 목록
     */
    postorder() {
        const array = [];
        function traverse(node) {
            if (node) {
                traverse(node.left);
                traverse(node.right);
                array.push(node.data);
            }
        }
        traverse(this.root);
        return array.map(x => x.id);
    }

    levelorder() {
        const array = [];
        function traverse(node) {
            const q = [];
            q.push(node);
            while (q.length) {
                const item = q.shift();
                array.push(item.data);
                item.left && q.push(item.left);
                item.right && q.push(item.right);
            }
        }
        traverse(this.root);
        console.log('levelorder', array);
    }

    /**
     * 트리 출력
     */
    display() {
        let out = [];
        let arr = [this.root];
        while (arr.find(item => item)) {
            out.push(arr);
            let temp = [];
            arr.forEach((item) => {
                if (item) {
                    temp.push(item.left);
                    temp.push(item.right);
                } else {
                    temp.push(undefined, undefined);
                }
            });
            arr = temp;
        }
        const h = out.length;

        const lines = out.map((item, i) => {
            const indents = Math.pow(2, h - 1 - i) - 1;
            const spaces = Math.pow(2, h - i) - 1;
            const indent = new Array(indents).fill(0).map(_ => '  ').join('')
            const space = new Array(spaces).fill(0).map(_ => '  ').join('');
            const line = item.map(x => x ? (x.data.id < 10 ? ' ' + x.data.id : x.data.id) : '  ').join(space);
            return indent + line;
        });

        console.log(lines.join('\n'));
        console.log('\n');
    }

    /**
     * @param {number} id key of node
     * @return {Node}
     */
    search(id) {
        let count = 0;
        function search(node, id) {
            count += 1;
            if (node.data.id > id) {
                return search(node.left, id);
            } else if (node.data.id < id) {
                return search(node.right, id);
            } else {
                return node.data;
            }
        }
        let found = search(this.root, id);
        console.log(found);
        console.log('count', count);
    }

    /**
     * @param {Node} node
     */
    insert(node) {
        let parent = null;
        let currentNode = this.root;
        while (currentNode) {
            parent = currentNode;
            currentNode = currentNode.data.id < node.data.id ? currentNode.right : currentNode.left;
        }
        node.parent = parent;
        if (!parent) {
            this.root = node;
        } else {
            if (parent.data.id > node.data.id) {
                parent.left = node;
            } else {
                parent.right = node;
            }
        }
    }
}

const tree = new Tree();
tree.insert(new Node({id: 15}));
tree.insert(new Node({id: 6}));
tree.insert(new Node({id: 18}));
tree.insert(new Node({id: 3}));
tree.insert(new Node({id: 7}));
tree.insert(new Node({id: 17}));
tree.insert(new Node({id: 20}));
tree.insert(new Node({id: 2}));
tree.insert(new Node({id: 4}));
tree.insert(new Node({id: 13}));
tree.insert(new Node({id: 9}));
console.log('최초 트리 상태');
tree.display();

console.log('전위순회');
console.log(tree.preorder());
console.log('중위순회');
console.log(tree.inorder());
console.log('후위순회');
console.log(tree.postorder());

console.log('\n14 추가');
tree.insert(new Node({id: 14}));
tree.display();

console.log('\n검색: 14');
tree.search(14);
console.log('\n검색: 18');
tree.search(18);