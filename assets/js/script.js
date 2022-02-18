inputFormBook.addEventListener('submit', function () {
    event.preventDefault()
    newBook(
        document.getElementById('book-title').value,
        document.getElementById('book-author').value,
        document.getElementById('book-year-released').value,
        document.getElementById('is-completed').checked
    )
})

document.addEventListener('DOMContentLoaded', function () {
    isStorageExist()
    if (getBookData === null) {
        console.log('Data buku kamu masih kosong nih')
    } else {
        for (let i = 0; i <= getBookData.length - 1; i++) {
            newBook(
                getBookData[i].title,
                getBookData[i].author,
                getBookData[i].year,
                getBookData[i].isCompleted
            )
        }
    }
})