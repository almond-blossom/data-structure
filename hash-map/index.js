class HashMap {

    constructor() {
        this.map = [];
        this.mapSize = 5;
        this.maxMapSize = 10;

        for (let i = 0; i < this.mapSize; i++) {
            this.map.push(null);
        }
    }

    /**
     * @param {*} key
     */
    insert(key) {
        let hashed = this.hash(key);
        let count = 0;
        // 해당 공간에 데이터가 있고 배열크기보다 적게 순회 했을 경우
        while (this.map[hashed] && count <= this.mapSize) {
            // 인덱스 증가
            hashed += 1;
            // 모든 배열 순회 여부를 위한 카운트 증가
            count += 1;
            // 마지막 인덱스라면 처음부터 찾아보도록 인덱스를 0으로 변경
            if (hashed == this.mapSize) hashed = 0;
        }
        // 배열에 공간이 없을 경우
        if (count > this.mapSize) {
            // 최대 늘릴 수 있는 공간까지 다 썼을경우
            if (this.mapSize * 2 > this.maxMapSize) {
                console.log(`There is no memory for ${key}`);
            } else {
                // 2배로 공간을 늘림
                for(let i = 0; i < this.mapSize; i++) {
                    this.map.push(null);
                }
                // 인덱스를 새로 추가된 인덱스 처음으로 만든다.
                hashed = this.mapSize;
                // 사이즈를 업데이트
                this.mapSize = this.map.length;
                this.map[hashed] = key;
            }
        } else {
            this.map[hashed] = key;
        }
    }

    /**
     * @param {*} key
     */
    delete(key) {}

    /**
     * @param {*} key
     * @return {boolean}
     */
    search(key) {
        return false;
    }

    /**
     * @param {*} key
     */
    hash(key) {
        return key % this.mapSize;
    }
}

const hashMap = new HashMap();

hashMap.insert(12405);
hashMap.insert(12305);
hashMap.insert(12105);
hashMap.insert(11105);
hashMap.insert(11205);
hashMap.insert(11305);
hashMap.insert(11405);
hashMap.insert(11505);
hashMap.insert(11605);
hashMap.insert(11705);
hashMap.insert(11805);
