Data Structure - Red-Black Tree

실행방법: `node index.js`

각 기능을 호출해보고 결과를 출력한다.

```shell
$ node red-black-tree/index.js
최초 트리 상태
                      7👿
          2👹                     11👹
    1👿          5👿          8👿         14👿
             4👹


Insert: 13
                      7👿
          2👹                     11👹
    1👿          5👿          8👿         14👿
             4👹                     13👹


Delete: 8 (case: 3, 4)
                      7👿
          2👹                     13👹
    1👿          5👿         11👿         14👿
             4👹


Delete: 5
          7👿
    2👹         13👹
 1👿    4👿   11👿   14👿


Delete: 1 (case: 2)
          7👿
    2👿         13👹
       4👹   11👿   14👿


Case 1 확인용 트리
                                              7👿
                      4👿                                             13👿
          2👿                      6👹                     11👿                     14👿
                            5👿          6.5👿         10👹         12👹         13.5👹         15👹
                               5.5👹


Delete: 2 (case: 1, 4)
                      7👿
          6👿                     13👿
    5👹          6.5👿         11👿         14👿
 4👿    5.5👿               10👹   12👹   13.5👹   15👹
```