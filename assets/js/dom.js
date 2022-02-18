// input form
const inputFormBook = document.getElementById('form-input-book')

// book rack
const unreadRack = document.getElementById('unread-rack')
const alreadyReadRack = document.getElementById('already-read-rack')

// book list
let bookList = []
const bookLocalStorage = 'BOOK_LOCAL_STORAGE'
const getBookData = JSON.parse(localStorage.getItem(bookLocalStorage))

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        console.log('Your browser doesn\'t support local storage')
        return false
    } else {
        return true
    }
}

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(bookList)
        localStorage.setItem(bookLocalStorage, parsed)
    }
}

function generateId() {
    return +new Date
}

function generateBookObject(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted
    }
}

// make a button
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
    } else if ('red') {
        button.classList.add('delete-book')
        button.innerText = 'Hapus buku'
        return button
    }
}

function newBook(textTitle, textAuthor, textYear, isCompleted) {
    const bookContainer = document.createElement('div')
    bookContainer.classList.add('book-item')

    const bookTitle = document.createElement('h3')
    bookTitle.innerText = textTitle

    const bookAuthor = document.createElement('p')
    bookAuthor.innerText = `Penulis: ${textAuthor}`

    const bookYear = document.createElement('p')
    bookYear.innerText = `Tahun rilis: ${textYear}`

    bookContainer.append(bookTitle, bookAuthor, bookYear)

    function objPush() {
        let objPush = bookList.push(generateBookObject(
            generateId(),
            textTitle,
            textAuthor,
            textYear,
            isCompleted
        ))
        console.log(bookList)
        return objPush
    }

    if (isCompleted === false) {
        bookContainer.append(bookButton('green'), bookButton('red'))
        objPush()
        saveData()
        return unreadRack.append(bookContainer)
    } else {
        bookContainer.append(bookButton('yellow'), bookButton('red'))
        objPush()
        saveData()
        return alreadyReadRack.append(bookContainer)
    }
}