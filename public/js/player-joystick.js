/**
 * 讀取題目，更新 UI
 */
function updateUI() {
    firebase.firestore().collection("show-question-display").doc("4Y8hbxjcALNxgn7KE8qm")
          .onSnapshot((doc) => {
            // 要更新的元件
            const btnDesc = document.querySelector('.btn-desc')
            const btnOption1 = document.querySelector('.radio-option1')
            const btnOption2 = document.querySelector('.radio-option2')
            const btnOption3 = document.querySelector('.radio-option3')
            const btnOption4 = document.querySelector('.radio-option4')
            const btnCategory = document.querySelector('.btn-category')
            const btnQuestionid = document.querySelector('.btn-questionid')

            // 綁定
            console.log("Current data: ", doc.data());
            btnDesc.innerHTML = doc.data()['desc']
            btnOption1.innerHTML = doc.data()['option1']
            btnOption2.innerHTML = doc.data()['option2']
            btnOption3.innerHTML = doc.data()['option3']
            btnOption4.innerHTML = doc.data()['option4']
            btnCategory.innerHTML = doc.data()['category']
            btnQuestionid.innerHTML = doc.data()['questionid']
          });
}

/**
 * 鎖定答案
 */
function saveAnswer() {
  // 元件
  const btnOption1 = document.querySelector('.radio-option1')
  const btnOption2 = document.querySelector('.radio-option2')
  const btnOption3 = document.querySelector('.radio-option3')
  const btnOption4 = document.querySelector('.radio-option4')
  const btnSend = document.querySelector('.btn-send')

  // disabled
  btnOption1.classList.add('disabled')
  btnOption2.classList.add('disabled')
  btnOption3.classList.add('disabled')
  btnOption4.classList.add('disabled')
  btnSend.classList.add('disabled')

  // form
  const part1 = document.querySelector('.btn-category').innerHTML
  const part2 = document.querySelector('.btn-questionid').innerHTML
  const part3 = document.querySelector('input[name="options-outlined"]:checked').value
  const uid = document.querySelector('#uid').innerHTML

  // submit form
  firebase.firestore().collection("player-answer-display").add({
      reply: part1 + part2 + part3,
      user: uid,
  })
  .then((docRef) => { console.log("成功送出解答: ", docRef.id); })
  .catch((error) => { console.error("失敗送出解答: ", error); });

  firebase.firestore().collection("player-lock-down").add({
      user: uid,
  })
  .then((docRef) => { console.log("成功鎖定解答: ", docRef.id); })
  .catch((error) => { console.error("失敗鎖定解答: ", error); });

  // change text
  btnSend.innerHTML = '答案已鎖定'
}

/**
 * 判斷是否可以作答
 */
function updateLockdown() {
  // 元件
  const btnOption1 = document.querySelector('.radio-option1')
  const btnOption2 = document.querySelector('.radio-option2')
  const btnOption3 = document.querySelector('.radio-option3')
  const btnOption4 = document.querySelector('.radio-option4')
  const btnSend = document.querySelector('.btn-send')
  const uid = document.querySelector('#uid').innerHTML

  // 綁定
  firebase.firestore().collection("player-lock-down").where("user", "==", uid)
    .onSnapshot((querySnapshot) => {
        // console.log(querySnapshot.size)
        if (querySnapshot.size) {
          // disabled
          btnOption1.classList.add('disabled')
          btnOption2.classList.add('disabled')
          btnOption3.classList.add('disabled')
          btnOption4.classList.add('disabled')
          btnSend.classList.add('disabled')
          btnSend.innerHTML = '答案已鎖定'
        } else {
          // remove disabled
          btnOption1.classList.remove('disabled')
          btnOption2.classList.remove('disabled')
          btnOption3.classList.remove('disabled')
          btnOption4.classList.remove('disabled')
          btnSend.classList.remove('disabled')
          btnSend.innerHTML = '鎖定答案'
          // 清除已選選項
          const btns = document.querySelectorAll('input[name="options-outlined"]')
          for (const btn of btns) {
            btn.checked = false
          }
        }
    });
}