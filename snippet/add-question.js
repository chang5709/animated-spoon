// Add a new document with a generated id.
firebase.firestore().collection("question").add({
    answer: "B",
    author: "曾士權",
    category: "化學",
    desc: "已知化學鍵分為共價键、離子键和金屬键三種。請問CH₃ONa（（甲醇鈉（Sodium Methoxide））中總共含有多少個化學键？",
    explain: "1個離子鍵和4個共價鍵 ",
    option1: "共有4個化學键",
    option2: "共有5個化學键",
    option3: "共有6個化學键",
    option4: "共有7個化學键",
})
.then((docRef) => {
    console.log("新增題目成功: ", docRef.id);
})
.catch((error) => {
    console.error("新增題目失敗: ", error);
});