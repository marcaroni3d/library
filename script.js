// DATA STRUCTURES
class Book {
    constructor(
        title = 'Unknown',
        author = 'Unknown',
        completedPages = '0',
        totalPages = '0',
        isRead = false
    ) {
        this.title = title
        this.author = author
        this.completedPages = completedPages
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

    editBook(newBook) {        
        let oldBook = this.books.find(book => book.title === oldBookTitle)
        Object.assign(oldBook, newBook)
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
const addButton = document.getElementById("add-button") 
const addBookModal = document.getElementById("add-book-modal")
const addBookForm = document.getElementById("add-book-form")
const editBookModal = document.getElementById("edit-book-modal")
const editBookForm = document.getElementById("edit-book-form")
const closeButtons = document.querySelectorAll(".close-button")

addButton.addEventListener('click', openAddBookModal)
closeButtons.forEach(button => { button.addEventListener('click', closeBookModals)})
addBookForm.addEventListener('submit', addBook)
editBookForm.addEventListener('submit', editBook)

// ADD BOOK MODAL
function openAddBookModal() {
    addBookForm.reset()
    addBookModal.style.display = "block"   
}

function addBook(e) {
    e.preventDefault()
    const newBook = getBookFromInput()
    library.addBook(newBook)
    closeBookModals()
    updateLibrary()
}

function getBookFromInput() {
    const title = document.getElementById('add-title').value
    const author = document.getElementById('add-author').value
    const completedPages = document.getElementById('add-completed-pages').value
    const totalPages = document.getElementById('add-total-pages').value
    const isRead = document.getElementById('add-is-read').checked

    return new Book(title, author, completedPages, totalPages, isRead)
}

// EDIT BOOK MODAL
function openEditBookModal(e) {
    editBookForm.reset()
    
    oldBookTitle = e.target.parentNode.childNodes[1].innerHTML  // global declaration, for use in Library.editBook
    const book = library.findBook(oldBookTitle)

    const editTitle = document.getElementById('edit-title')
    const editAuthor = document.getElementById('edit-author')
    const editCompletedPages = document.getElementById('edit-completed-pages')
    const editTotalPages = document.getElementById('edit-total-pages')
    const editIsRead = document.getElementById('edit-is-read')

    editTitle.value = book.title
    editAuthor.value = book.author
    editCompletedPages.value = book.completedPages
    editTotalPages.value = book.totalPages
    editIsRead.value = book.isRead
    console.log(editIsRead.value)

    editBookModal.style.display = "block"
}

function editBook(e) {
    e.preventDefault()
    const newBook = editBookFromInput()
    library.editBook(newBook)
    closeBookModals()
    updateLibrary()
}

function editBookFromInput() {
    const title = document.getElementById('edit-title').value
    const author = document.getElementById('edit-author').value
    const completedPages = document.getElementById('edit-completed-pages').value
    const totalPages = document.getElementById('edit-total-pages').value
    const isRead = document.getElementById('edit-is-read').checked

    return new Book(title, author, completedPages, totalPages, isRead)
}

// UI & MODAL SUPPORT
function closeBookModals() {
    addBookModal.style.display = "none"
    editBookModal.style.display = "none"
}
    window.onclick = (e) => {   // close modal if click outside container
        if (e.target == addBookModal || e.target == editBookModal) {
            closeBookModals()
        }
    }

function removeBook(e) {
    const title = e.target.parentNode.parendNode.firstChild.innerHTML
    library.removeBook(title)
    updateLibrary()
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

function createBookCard(book) {
    const bookCard = document.createElement('div')
        const editButton = document.createElement('button')
        const title = document.createElement('h3')
        const author = document.createElement('h4')
        const pageText = document.createElement('h5')
        const pagesContainer = document.createElement('div')
            const completedPages = document.createElement('p')
            const pagesBreak = document.createElement('p')
            const totalPages = document.createElement('p')
        const buttonContainer = document.createElement('div')
            const pageDownButton = document.createElement('button')
            const isReadButton = document.createElement('button')
            const pageUpButton = document.createElement('button')

    editButton.classList.add('edit-button')
    bookCard.classList.add('book-card')
    pagesContainer.classList.add('book-pages-container')
    buttonContainer.classList.add('book-button-container')
    pageDownButton.classList.add('increment-button')
    pageUpButton.classList.add('increment-button')

    pageDownButton.onclick = decrementPageCount
    pageUpButton.onclick = incrementPageCount
    isReadButton.onclick = toggleRead
    editButton.onclick = openEditBookModal

    editButton.textContent = "edit"
    title.textContent = `${book.title}`
    author.textContent = book.author
    pageText.textContent = "Pages Read:"
    completedPages.textContent = `${book.completedPages}`
    pagesBreak.textContent = " / "
    totalPages.textContent = `${book.totalPages}`
    pageDownButton.textContent = "-"
    pageUpButton.textContent = "+"

    if (book.isRead) {
        isReadButton.textContent = "✓"
        isReadButton.style.backgroundColor = "var(--blueberry)"
        bookCard.style.backgroundColor = "var(--blueberry-light)"
        bookCard.style.transition = "0.3s"
    } else {
        isReadButton.textContent = "X"
        isReadButton.style.backgroundColor = "var(--citrus)"
        bookCard.style.backgroundColor = "#ffffff"
        bookCard.style.transition = "0.3s"
    }

    bookCard.appendChild(editButton)
    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pageText)
    bookCard.appendChild(pagesContainer)
    pagesContainer.appendChild(completedPages)
    pagesContainer.appendChild(pagesBreak)
    pagesContainer.appendChild(totalPages)
    bookCard.appendChild(buttonContainer)
    buttonContainer.appendChild(pageDownButton)
    buttonContainer.appendChild(isReadButton)
    buttonContainer.appendChild(pageUpButton)
    libraryContainer.appendChild(bookCard)
}

function toggleRead(e) {
    const title = e.target.parentNode.parentNode.childNodes[1].innerHTML
    const book = library.findBook(title)
    book.isRead = !book.isRead
    console.log(book.isRead.value)
    updateLibrary()
}

function decrementPageCount(e) {
    const title = e.target.parentNode.parentNode.childNodes[1].innerHTML
    const book = library.findBook(title)
    let pageCount = parseInt(e.target.parentNode.parentNode.childNodes[4].firstChild.innerHTML)
    if (pageCount > 0) {
        pageCount--
        book.completedPages = pageCount
        updateLibrary()
    } 
}

function incrementPageCount(e) {
    const title = e.target.parentNode.parentNode.childNodes[1].innerHTML
    const book = library.findBook(title)
    let pageCount = parseInt(e.target.parentNode.parentNode.childNodes[4].firstChild.innerHTML)
    let totalPages = parseInt(e.target.parentNode.parentNode.childNodes[4].childNodes[2].innerHTML)
    if (pageCount < totalPages) {
        pageCount++
        book.completedPages = pageCount
        updateLibrary()
    }
}

// INIT
window.onload = checkIfEmptyLibrary()