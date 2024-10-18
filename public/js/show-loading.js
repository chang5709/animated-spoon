/**
 * 更新題目快取
 */
function updateCache() {
  // 動畫提示正在運行
  showSpinner()

  // 讀取分類 + 題號
  firebase.firestore().collection('show-category-display').doc('A89mIhkZn1Re2aIhRRDe')
  .get()
  .then((doc) => {
      let current_category = doc.data()['current_category']
      let current_number = doc.data()['current_number']
      console.log(current_category)
      console.log(current_number)
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
              window.location = '/show-barchart.html'
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
 * 動畫提示正在運行
 */
function showSpinner() {
  // 動畫提示正在運行
  const spinner = document.querySelector('#spinner')
  spinner.classList.remove('hidden');
}

/**
 * 解除鎖定作答
 */
function truncatePlayerLockDown() {
    const endpoint = 'https://us-central1-animated-spoon.cloudfunctions.net/truncatePlayerLockDown';
    axios.get(endpoint)
}