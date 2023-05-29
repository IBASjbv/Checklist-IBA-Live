const btnSaveNotes = document.getElementById('btn-save-notes')
const notes = document.getElementById('notes')
let isTyping = null

notes.value = localStorage.getItem('notes')

notes.addEventListener('keyup', () => {
    clearTimeout(isTyping);
    isTyping = setTimeout(localStorage.setItem('notes', notes.value), 400)
})
