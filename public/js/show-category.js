/**
 * 主持人選分類
 */
function setCategory(category) {
    const ref = firebase.firestore().collection('show-category-display').doc('A89mIhkZn1Re2aIhRRDe')
    ref.update({'current_category': category, 'current_number': 1})
    .then(() => {
        console.log("Document successfully updated!");
        // redirect
        window.location = '/show-question.html'
    })
    .catch((error) => { console.error("Error updating document: ", error); })

    return null;
}