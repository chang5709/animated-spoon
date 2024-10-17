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