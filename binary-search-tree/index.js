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
        const array = [];``
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
        function search(node, id) {
            if (node.data.id > id) {
                return search(node.left, id);
            } else if (node.data.id < id) {
                return search(node.right, id);
            } else {
                return node;
            }
        }
        let found = search(this.root, id);
        return found;
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

    /**
     * @param {Node} node
     */
    delete(node) {
        if (!node.left && !node.right) {
            // 자식이 없을경우 제거만
            if (node === this.root) this.root = null;
            else if (node.parent.left === node) node.parent.left = null;
            else node.parent.right = null;
        } else if (node.left && node.right) {
            // 자식이 두개일경우 successor를 찾아서 자기에다가 대입
            const successor = this.successor(node);
            if (this.root === node) {
                node.data = successor.data;
                successor.parent.left = successor.right;
            } else {
                if (node.parent.left === node) {
                    node.parent.left = successor;
                } else {
                    node.parent.right = successor;
                }
                successor.left = node.left;
            }
        } else {
            // 자식이 한개일경우 부모와 연결만 한다.
            const child = node.left || node.right;
            if (node.parent.left === node) node.parent.left = child;
            else node.parent.right = child;
        }
    }

    /**
     * 자기보다 한단계 큰 것
     * @param {Node?} node
     */
    successor(node) {
        if (node.right) {
            return this.minimum(node.right);
        }
        let parent = node.parent;
        while (parent && node === parent.right) {
            node = parent;
            parent = parent.parent;
        }
        return parent;
    }

    /**
     * 트리의 최소값 반환
     * @param {Node} node
     */
    minimum(node) {
        while (node.left) {
            node = node.left;
        }
        return node;
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
console.log(tree.search(14).data);
console.log('\n검색: 18');
console.log(tree.search(18).data);

console.log('\n최소값: 15');
console.log(tree.minimum(tree.search(15)).data);

console.log('\nsuccessor: 15');
console.log(tree.successor(tree.search(15)).data);
console.log('\nsuccessor: 14');
console.log(tree.successor(tree.search(14)).data);

console.log('\n삭제: 4 (자식 0)');
tree.display();
tree.delete(tree.search(4));
tree.display();

console.log('\n삭제: 3 (자식 1)');
tree.delete(tree.search(3));
tree.display();

console.log('\n삭제: 6 (자식 2)');
tree.delete(tree.search(6));
tree.display();

console.log('\n삭제: 15 (자식 2)');
tree.delete(tree.search(15));
tree.display();