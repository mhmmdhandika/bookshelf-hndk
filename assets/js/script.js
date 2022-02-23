const books = []
const RENDER_EVENT = 'render-book'
const SAVED_EVENT = 'saved-book'
const STORAGE_KEY = 'BOOKS_DATA'

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage')
        return false
    }
    return true
}

function saveBookData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books)
        localStorage.setItem(STORAGE_KEY, parsed)
        document.dispatchEvent(new Event(SAVED_EVENT))
    }
}

function loadBookDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY)

    if (serializedData == '[]') {
        console.log('Data buku kamu masih kosong nih!')
    } else {
        let data = JSON.parse(serializedData)

        if (data !== null) {
            for (book of data) {
                books.push(book)
            }
        }

        document.dispatchEvent(new Event(RENDER_EVENT))
    }
}

function generateId() {
    return +new Date
}

function generateTodoObject(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted
    }
}

function addNewBook() {
    const title = document.getElementById('book-title').value
    const author = document.getElementById('book-author').value
    const year = document.getElementById('book-year-released').value
    const isCompleted = document.getElementById('is-completed').checked

    const bookObject = generateTodoObject(generateId(), title, author, year, isCompleted)
    books.push(bookObject)

    document.dispatchEvent(new Event(RENDER_EVENT))
    saveBookData()
}

function findBook(bookId) {
    for (bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem
        }
    }
    return null
}

function findBookIndex(bookId) {
    for (index in books) {
        if (books[index].id === bookId) {
            return index
        }
    }
    return -1
}

function moveToAlreadyRack(bookId) {
    const bookTarget = findBook(bookId)
    if (bookTarget == null) return

    bookTarget.isCompleted = true
    document.dispatchEvent(new Event(RENDER_EVENT))
    saveBookData()
}

function moveToUnreadRack(bookId) {
    const bookTarget = findBook(bookId)
    if (bookTarget == null) return

    bookTarget.isCompleted = false
    document.dispatchEvent(new Event(RENDER_EVENT))
    saveBookData()
}

function deleteBook(bookId, bookTitle, bookAuthor) {
    const bookTarget = findBookIndex(bookId)
    if (bookTarget == -1) return
    books.splice(bookTarget, 1)

    alert(`Kamu menghapus buku ${bookTitle}\nYang ditulis oleh: ${bookAuthor}`)

    document.dispatchEvent(new Event(RENDER_EVENT))
    saveBookData()
}

function makeBook(bookObject) {
    const container = document.createElement('div')
    container.classList.add('book-item')

    const textTitle = document.createElement('h3')
    textTitle.innerText = bookObject.title

    const textAuthor = document.createElement('p')
    textAuthor.innerText = bookObject.author

    const textYear = document.createElement('p')
    textYear.innerText = bookObject.year

    container.append(textTitle, textAuthor, textYear)

    if (bookObject.isCompleted == true) {
        const yellowButton = document.createElement('button')
        yellowButton.classList.add('move-to-unread')
        yellowButton.innerText = 'Belum dibaca'
        yellowButton.addEventListener('click', function () {
            moveToUnreadRack(bookObject.id)
        })

        const redButton = document.createElement('button')
        redButton.classList.add('delete-book')
        redButton.innerText = 'Hapus buku'
        redButton.addEventListener('click', function () {
            deleteBook(bookObject.id, bookObject.title, bookObject.author)
        })

        container.append(yellowButton, redButton)
    } else {
        const greenButton = document.createElement('button')
        greenButton.classList.add('move-to-already')
        greenButton.innerText = 'Sudah dibaca'
        greenButton.addEventListener('click', function () {
            moveToAlreadyRack(bookObject.id)
        })

        const redButton = document.createElement('button')
        redButton.classList.add('delete-book')
        redButton.innerText = 'Hapus buku'
        redButton.addEventListener('click', function () {
            deleteBook(bookObject.id, bookObject.title, bookObject.author)
        })

        container.append(greenButton, redButton)
    }
    return container
}

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('form-input-book')

    submitForm.addEventListener('submit', function (event) {
        event.preventDefault()
        addNewBook()
    })

    if (isStorageExist()) {
        loadBookDataFromStorage()
    }
})

document.addEventListener(RENDER_EVENT, function () {
    const unreadRack = document.getElementById('unread-rack')
    unreadRack.innerHTML = ''

    const alreadyReadRack = document.getElementById('already-read-rack')
    alreadyReadRack.innerHTML = ''

    for (bookItem of books) {
        const bookElement = makeBook(bookItem)
        if (bookItem.isCompleted == false) {
            unreadRack.append(bookElement)
        } else {
            alreadyReadRack.append(bookElement)
        }
    }
})

document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY))
})