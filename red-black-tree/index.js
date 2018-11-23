class TreeNode {
    constructor(data, left, right, parent, isRed = true) {
        /**
         * @typedef NodeData
         * @property {number} id
         */
        /**
         * @type {NodeData}
         */
        this.data = data;
        /**
         * @type {?TreeNode}
         */
        this.left = left;
        /**
         * @type {?TreeNode}
         */
        this.right = right;
        /**
         * @type {?TreeNode}
         */
        this.parent = parent;
        /**
         * @type {boolean}
         */
        this.isRed = isRed;
    }
}

class RedBlackTree {
    constructor(root) {
        /**
         * @type {?TreeNode}
         */
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
            const indent = new Array(indents).fill(0).map(_ => '   ').join('')
            const space = new Array(spaces).fill(0).map(_ => '   ').join('');
            function toString(treeNode) {
                const addSpace = treeNode.data.id < 10 ? ' ' + treeNode.data.id : treeNode.data.id;
                return treeNode.isRed ? `${addSpace}👹` : `${addSpace}👿`;
            }
            const line = item.map(x => x ? toString(x) : '   ').join(space);
            return indent + line;
        });

        console.log(lines.join('\n'));
        console.log('\n');
    }

    /**
     * @param {number} id key of node
     * @return {TreeNode}
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
     * @param {TreeNode} node
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

        this._fixup(node);
    }

    /**
     * @param {TreeNode} node
     */
    _fixup(node) {
        while (node.parent && node.parent.isRed) {
            // case 1, 2, 3
            if (node.parent.parent.left === node.parent) {
                let uncle = node.parent.parent.right;
                // case 1
                if (uncle.isRed) {
                    node.parent.parent.isRed = true;
                    node.parent.isRed = false;
                    uncle.isRed = false;
                    node = node.parent.parent;
                }
                // case 2
                else if (node.parent.right === node) {
                    node = node.parent;
                    this.leftRotate(node);
                }
                // case 3
                else {
                    node.parent.parent.isRed = true;
                    node.parent.isRed = false;
                    this.rightRotate(node.parent.parent);
                }
            }
            // case 4, 5, 6
            else {
                let uncle = node.parent.parent.left;
                // case 1
                if (uncle.isRed) {
                    node.parent.parent.isRed = true;
                    node.parent.isRed = false;
                    uncle.isRed = false;
                    node = node.parent.parent;
                }
                // case 2
                else if (node.parent.right === node) {
                    node = node.parent;
                    this.leftRotate(node);
                }
                // case 3
                else {
                    node.parent.parent.isRed = true;
                    node.parent.isRed = false;
                    this.rightRotate(node.parent.parent);
                }
            }
        }
        this.root.isRed = false;
    }

    /**
     * @param {TreeNode} node
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
     * @param {TreeNode} target
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
        target.parent = rightChild;
    }

    /**
     * @param {TreeNode} target
     */
    rightRotate(target) {
        const leftChild = target.left;
        leftChild.parent = target.parent;
        if (!target.parent) this.root = leftChild;
        else if (target.parent.left === target) target.parent.left = leftChild;
        else target.parent.right = leftChild;
        target.left = leftChild.right;
        leftChild.right = target;
        target.parent = leftChild;
    }
}

const tree = new RedBlackTree();
tree.insert(new TreeNode({id: 11}));
tree.insert(new TreeNode({id: 2}));
tree.insert(new TreeNode({id: 14}));
tree.insert(new TreeNode({id: 1}));
tree.insert(new TreeNode({id: 7}));
tree.insert(new TreeNode({id: 15}));
tree.insert(new TreeNode({id: 5}));
tree.insert(new TreeNode({id: 8}));

console.log('최초 트리 상태');
tree.display();

console.log('Insert: 4');
tree.insert(new TreeNode({id: 4}));
tree.display();