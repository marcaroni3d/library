// DATA STRUCTURES

class Book {
    constructor(
        title = 'Unknown',
        author = 'Unknown',
        totalPages = '0',
        isRead = false
    ) {
        this.title = title
        this.author = author
        this.totalPages = totalPages
        this.isRead = isRead
    }
}

class Library {
    constructor() {
        this.books = []
    }
    addBook(newBook) {
        if (!this.isInLibrary(newBook)) {
            this.books.push(newBook)
        }
    }
    isInLibrary(newBook) {
        return this.books.some((book) => book.title === newBook.title)
    }
    findBook(title) {
        return this.books.find((book) => book.title === title)
    }
    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title)
    }
}

const library = new Library()

// USER INTERFACE

const libraryContainer = document.getElementById("library-container")
const addBookModal = document.getElementById("add-book-modal")
const addBookForm = document.getElementById("add-book-form")
const addButton = document.getElementById("add-button") 
const closeButton = document.getElementById("close-button")
const submitButton = document.getElementById("submit-button")

addButton.addEventListener('click', openAddBookModal)
closeButton.addEventListener('click', closeAddBookModal)
addBookForm.addEventListener('submit', addBook)

function openAddBookModal() {
    addBookForm.reset()
    addBookModal.style.display = "block"   
}
function closeAddBookModal() {
    addBookModal.style.display = "none"
}
    window.onclick = (e) => {   // close modal if click outside container
        if (e.target == addBookModal) {
            closeAddBookModal()
        }
    }

function addBook(e) {
    e.preventDefault()
    const newBook = getBookFromInput()
    library.addBook(newBook)
    closeAddBookModal()
    updateLibrary()
}

function removeBook(e) {
    const title = e.target.parentNode.firstChild.innerHTML.replaceAll('"', "")
    library.removeBook(title)
    updateLibrary()
}

function toggleRead(e) {
    const title = e.target.parentNode.firstChild.innerHTML.replaceAll('"', "")
    const book = library.findBook(title)
    book.isRead = !book.isRead
    updateLibrary()
}

function getBookFromInput() {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const totalPages = document.getElementById('total-pages').value
    const isRead = document.getElementById('is-read').checked

    return new Book(title, author, totalPages, isRead)
}

function createBookCard(book) {
    const bookCard = document.createElement('div')
    const title = document.createElement('h3')
    const author = document.createElement('h3')
    const totalPages = document.createElement('p')
    const isReadButton = document.createElement('button')
    const removeButton = document.createElement('button')

    bookCard.classList.add('book-card')
    isReadButton.onclick = toggleRead
    removeButton.style.backgroundColor = "var(--apricot)"
    removeButton.onclick = removeBook

    title.textContent = `"${book.title}"`
    author.textContent = book.author
    totalPages.textContent = `${book.totalPages} pages`
    removeButton.textContent = "Remove"

    if (book.isRead) {
        isReadButton.textContent = "Read"
        isReadButton.style.backgroundColor = "var(--blueberry)"
    } else {
        isReadButton.textContent = "Not Read"
        isReadButton.style.backgroundColor = "var(--citrus)"
    }

    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(totalPages)
    bookCard.appendChild(isReadButton)
    bookCard.appendChild(removeButton)
    libraryContainer.appendChild(bookCard)
}

function updateLibrary() {
    resetLibrary()
    for (let book of library.books) {
        createBookCard(book)
    }
}

function resetLibrary() {
    libraryContainer.innerHTML = ''
    checkIfEmptyLibrary()
}

function checkIfEmptyLibrary() {
    if (library.books.length == 0) {
        libraryContainer.innerHTML = 'Add a book to your library with the "Add Button" below.'
    }
}

// INIT
window.onload = checkIfEmptyLibrary()

