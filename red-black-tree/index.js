class Node {
    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
        this.parent = null;
    }
}

class RedBlackTree {
    constructor(root) {
        this.root = root;
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
     * 오른쪽 node가 있다고 가정
     * RootNode의 부모가 NIL이라고 가정
     * @param {Node} target
     */
    leftRotate(target) {
        // Target의 오른쪽 자식을 저장
        const rightChild = target.right;
        // Target의 오른쪽 자식에 rightChild의 왼쪽 자식을 저장
        target.right = rightChild.left;
        // rightChild의 부모를 target부모로 설정
        rightChild.parent = target.parent;
        // 만약 target이 루트노드 일경우 rigthChild를 루트노드로 변경
        if (!target.parent) this.root = rightChild;
        // Target이 부모의 왼쪽 자식일 경우 Target부모의 왼쪽자식을 rightChild로 변경
        else if (target.parent.left === target) target.parent.left = rightChild;
        // Target이 부모의 오른쪽 자식일 경우 Target부모의 오른쪽자식을 rightChild로 변경
        else target.parent.right = rightChild;
        // Target자리에 온 rightChild의 왼쪽 자식에 target을 넣는다.
        rightChild.left = target;
    }

    /**
     * @param {Node} target
     */
    rightRotate(target) {
        const leftChild = target.left;
        leftChild.parent = target.parent;
        if (!target.parent) this.root = leftChild;
        else if (target.parent.left === target) target.parent.left = leftChild;
        else target.parent.right = leftChild;
        target.left = leftChild.right;
        leftChild.right = target;
    }
}

const tree = new RedBlackTree();
tree.insert(new Node({id: 7}));
tree.insert(new Node({id: 4}));
tree.insert(new Node({id: 11}));
tree.insert(new Node({id: 3}));
tree.insert(new Node({id: 6}));
tree.insert(new Node({id: 9}));
tree.insert(new Node({id: 18}));
tree.insert(new Node({id: 2}));
tree.insert(new Node({id: 14}));
tree.insert(new Node({id: 19}));
tree.insert(new Node({id: 12}));
tree.insert(new Node({id: 17}));
tree.insert(new Node({id: 22}));
tree.insert(new Node({id: 20}));

console.log('최초 트리 상태');
tree.display();

console.log('Left Rotate: 11');
tree.leftRotate(tree.search(11));
tree.display();

console.log('Right Rotate: 18');
tree.rightRotate(tree.search(18));
tree.display();

console.log('Left Rotate: root 7');
tree.leftRotate(tree.search(7));
tree.display();