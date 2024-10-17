# admin commands

### 一般操作
1. 開放作答 (清空鎖定狀態)
```
firebase firestore:delete /player-lock-down --recursive
```

### 危險區域
1. 清空玩家作答 (活動開始前)
```
firebase firestore:delete /player-answer-display --recursive
```
