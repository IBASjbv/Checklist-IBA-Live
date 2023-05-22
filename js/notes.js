const btnSaveNotes = document.getElementById('btn-save-notes')
const notes = document.getElementById('notes')

notes.value = localStorage.getItem('notes')

btnSaveNotes.addEventListener('click', () => {
    const text = notes.value
    localStorage.setItem('notes', text)
})
