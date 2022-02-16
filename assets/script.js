// deklarasi
const inputFormBook = document.getElementById('form-input-book')
const unreadRack = document.getElementById('unread-rack')
const alreadyReadRack = document.getElementById('already-read-rack')

function newBook() {
    const container = document.createElement('div')
    const bookTitle = document.createElement('h3')
    const bookAuthor = document.createElement('p')
    const bookYear = document.createElement('p')
    container.classList.add('book-item')
    bookTitle.innerText = document.getElementById('book-title').value
    bookAuthor.innerText = document.getElementById('book-author').value
    bookYear.innerText = document.getElementById('book-year-released').value
    container.append(bookTitle, bookAuthor, bookYear)
    const isCompleted = document.getElementById('is-completed').checked
    if (isCompleted === false) {
        container.append(bookButton('green'), bookButton('red'))
        unreadRack.append(container)
    } else {
        container.append(bookButton('yellow'), bookButton('red'))
        alreadyReadRack.append(container)
    }
}

function bookButton(colorButton) {
    const button = document.createElement('button')
    if (colorButton === 'green') {
        button.classList.add('move-to-already')
        button.innerText = 'Sudah dibaca'
        return button
    } else if (colorButton === 'yellow') {
        button.classList.add('move-to-unread')
        button.innerText = 'Belum dibaca'
        return button
    } else {
        button.classList.add('delete-book')
        button.innerText = 'Hapus buku'
        return button
    }
}

inputFormBook.addEventListener('submit', function () {
    event.preventDefault()
    newBook()
})