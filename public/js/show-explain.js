/**
 * 讀取題目，更新 UI
 */
function updateUI() {
    firebase.firestore().collection("show-question-display").doc("4Y8hbxjcALNxgn7KE8qm")
          .onSnapshot((doc) => {
            // 要更新的元件
            const btnDesc = document.querySelector('.btn-desc')
            const btnExplain = document.querySelector('.btn-explain')
            const btnOption1 = document.querySelector('.radio-option1')
            const btnOption2 = document.querySelector('.radio-option2')
            const btnOption3 = document.querySelector('.radio-option3')
            const btnOption4 = document.querySelector('.radio-option4')
            const btnCategory = document.querySelector('.btn-category')
            const btnQuestionid = document.querySelector('.btn-questionid')
            const btnAnswer = document.querySelector('.btn-answer')

            // 綁定
            console.log("Current data: ", doc.data());
            btnDesc.innerHTML = doc.data()['desc']
            btnExplain.innerHTML = doc.data()['explain']
            btnOption1.innerHTML = doc.data()['option1']
            btnOption2.innerHTML = doc.data()['option2']
            btnOption3.innerHTML = doc.data()['option3']
            btnOption4.innerHTML = doc.data()['option4']
            btnCategory.innerHTML = doc.data()['category']
            btnQuestionid.innerHTML = doc.data()['questionid']
            btnAnswer.innerHTML = doc.data()['answer']

            // 統計元件
            const chartOption1 = document.querySelector('.chart-option1')
            const chartOption2 = document.querySelector('.chart-option2')
            const chartOption3 = document.querySelector('.chart-option3')
            const chartOption4 = document.querySelector('.chart-option4')

            // 統計綁定
            let reply1 = doc.data()['category'] + doc.data()['questionid'] + 'A'
            let reply2 = doc.data()['category'] + doc.data()['questionid'] + 'B'
            let reply3 = doc.data()['category'] + doc.data()['questionid'] + 'C'
            let reply4 = doc.data()['category'] + doc.data()['questionid'] + 'D'
            firebase.firestore().collection("player-answer-display").where("reply", "==", reply1)
            .onSnapshot((querySnapshot) => { chartOption1.innerHTML = querySnapshot.size });

            firebase.firestore().collection("player-answer-display").where("reply", "==", reply2)
            .onSnapshot((querySnapshot) => { chartOption2.innerHTML = querySnapshot.size });

            firebase.firestore().collection("player-answer-display").where("reply", "==", reply3)
            .onSnapshot((querySnapshot) => { chartOption3.innerHTML = querySnapshot.size });

            firebase.firestore().collection("player-answer-display").where("reply", "==", reply4)
            .onSnapshot((querySnapshot) => { chartOption4.innerHTML = querySnapshot.size });

            // 反白答案
            if (doc.data()['answer'] == 'A') {
              btnOption1.classList.remove('btn-outline-dark')
              btnOption1.classList.add('btn-success')

            } else if (doc.data()['answer'] == 'B') {
              btnOption2.classList.remove('btn-outline-dark')
              btnOption2.classList.add('btn-warning')

            } else if (doc.data()['answer'] == 'C') {
              btnOption3.classList.remove('btn-outline-dark')
              btnOption3.classList.add('btn-primary')

            } else if (doc.data()['answer'] == 'D') {
              btnOption4.classList.remove('btn-outline-dark')
              btnOption4.classList.add('btn-danger')
            } else {
              console.error('反白答案時錯誤')
            }
          });
}

/**
 * 更新題目快取
 */
function updateCache() {
  // 讀取分類 + 題號
  firebase.firestore().collection('show-category-display').doc('A89mIhkZn1Re2aIhRRDe')
  .get()
  .then((doc) => {
      let current_category = doc.data()['current_category']
      let current_number = doc.data()['current_number']
      // 資料庫篩選
      firebase.firestore().collection("question").where("category", "==", current_category)
      .get()
      .then((querySnapshot) => {
          // 讀取題目
          const questions = querySnapshot.docs.map(doc => doc.data());
          const q = questions[current_number-1]
          // 設定到快取區供所有玩家讀取
          // console.log(q)
          firebase.firestore().collection("show-question-display").doc("4Y8hbxjcALNxgn7KE8qm")
          .update({'answer': q['answer'],
              'author': q['author'],
              'category': q['category'],
              'desc': q['desc'],
              'explain': q['explain'],
              'option1': q['option1'],
              'option2': q['option2'],
              'option3': q['option3'],
              'option4': q['option4'],
              'questionid': current_number,
          })
          .then(() => {
              console.log('設定快取成功')
              // redirect
              window.location = '/show-question.html'
          })
          .catch((error) => {
              console.error('設定快取失敗', error)
          })
      })
      .catch((error) => {
          console.error('讀取問題錯誤', error)
      })
  })
  .catch((error) => {
      console.error('讀取分類錯誤', error)
  })
}

/**
 * 同一個分類，下一題
 */
function nextQuestion() {
  const btnQuestionid = document.querySelector('.btn-questionid')
  const questionid = parseInt(btnQuestionid.innerHTML)

  if (questionid == 5) {
    window.location = '/show-category.html'
  } else {
    // 設定分類
    const ref = firebase.firestore().collection('show-category-display').doc('A89mIhkZn1Re2aIhRRDe')
    ref.update({'current_number': questionid+1})
    .then(() => {
        console.log("Document successfully updated!");
        window.location = '/show-loading.html'
    })
    .catch((error) => { console.error("Error updating document: ", error); })
  }
}

/**
 * 更新答對題數
 */
function updateCorrectCount() {
  const part1 = document.querySelector('.btn-category').innerHTML
  const part2 = document.querySelector('.btn-questionid').innerHTML
  const part3 = document.querySelector('.btn-answer').innerHTML
  const correctCode = part1 + part2 + part3
  console.log(correctCode)
}