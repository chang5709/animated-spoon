function showTeam () {
    firebase.firestore().collection('scoreboard').orderBy('score', 'desc')
    .onSnapshot((querySnapshot) => {
        // alert(querySnapshot.size)

        const scoreSelect = document.querySelector('#scoreCount')
        scoreSelect.innerHTML = ''
        let item = ''
        querySnapshot.forEach((doc) => {
            const name = doc.data()['name']
            const score = doc.data()['score']
            item = `<option value='${name}'>${name}</option>`
            scoreSelect.innerHTML += item
        })
    })
}
