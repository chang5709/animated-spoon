/**
 * 更新排行榜
 */
function updateScoreboard () {
    firebase.firestore().collection('scoreboard').orderBy('score', 'desc')
    .onSnapshot((querySnapshot) => {
        // alert(querySnapshot.size)

        const scoreboard = document.querySelector('#scoreboard')
        scoreboard.innerHTML = ''
        querySnapshot.forEach((doc) => {
            console.log(doc.id)
            const name = doc.data()['name']
            const score = doc.data()['score']
            const per = Math.floor(100 * (score / 70000.0))
            let item = ''
            if (per >= 70) {
                item = `<br><div class="row">
                <div class="col-3 team-name">${name}</div>
                <div class="col-2 team-name">${score}</div>
                <div class="col-7">
                    <div class="progress" style="height: 3em;">
                    <div class="progress-bar bg-danger progress-bar-striped progress-bar-animated" role="progressbar" style="width: ${per}%">${name} ${score}</div>
                </div>
                </div>`
            } else if (per >= 30) {
                item = `<br><div class="row">
                <div class="col-3 team-name">${name}</div>
                <div class="col-2 team-name">${score}</div>
                <div class="col-7">
                    <div class="progress" style="height: 3em;">
                    <div class="progress-bar bg-warning progress-bar-striped progress-bar-animated" role="progressbar" style="width: ${per}%">${name} ${score}</div>
                </div>
                </div>`
            } else if (per >= 0) {
                item = `<br><div class="row">
                <div class="col-3 team-name">${name}</div>
                <div class="col-2 team-name">${score}</div>
                <div class="col-7">
                    <div class="progress" style="height: 3em;">
                    <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style="width: ${per}%">${name} ${score}</div>
                </div>
                </div>`
            } else {
                item = `<br><div class="row">
                <div class="col-3 team-name">${name}</div>
                <div class="col-2 team-name">${score}</div>
                <div class="col-7">
                    <div class="progress" style="height: 3em;">
                    <div class="progress-bar bg-secondary progress-bar-striped progress-bar-animated" role="progressbar" style="width: ${per}%">${name} ${score}</div>
                </div>
                </div>`
            }
            
            scoreboard.innerHTML += item
        })
    })
}
