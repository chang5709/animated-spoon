// count reply
// 因為 firestore 非 SQL，要綜合查詢有難度與費用問題，使用組合鍵以解決問題
// 例如：化學 + 2 + B
firebase.firestore().collection("player-answer-display").where("reply", "==", "化學2B")
    .onSnapshot((querySnapshot) => {
        console.log(querySnapshot.size)
    });