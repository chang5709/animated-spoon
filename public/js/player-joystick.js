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

  // change text
  btnSend.innerHTML = '答案已鎖定'
}
