// DATA STRUCTURES
class Book {
    constructor(
        title = 'Unknown',
        author = 'Unknown',
        completedPages = '0',
        totalPages = '1',
        isRead = false,
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

    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title)
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
const deleteButton = document.getElementById("delete-button")

addButton.addEventListener('click', openAddBookModal)
addBookForm.addEventListener('submit', addBook)
editBookForm.addEventListener('submit', editBook)
closeButtons.forEach(button => { button.addEventListener('click', closeBookModals)})
deleteButton.addEventListener('click', removeBook)

// ADD BOOK MODAL
function openAddBookModal() {
    addBookForm.reset()
    addBookModal.style.display = "block"
    addBookForm.classList.add('active-form')   
} 

function addBook(e) {
    e.preventDefault()
    const newBook = getBookFromInput()
    if (validateForm(newBook)) {
        library.addBook(newBook)
        closeBookModals()
        saveLocal()
        updateLibrary()
    }
}

function getBookFromInput() {
    const title = document.getElementById('add-title').value
    const author = document.getElementById('add-author').value
    let completedPages = document.getElementById('add-completed-pages').value
    let totalPages = document.getElementById('add-total-pages').value
    const isRead = document.getElementById('add-is-read').checked

    if (completedPages.length == 0) {
        completedPages = 0
    }
    if (totalPages.length == 0) {
        totalPages = 1
    }

    return new Book(title, author, completedPages, totalPages, isRead)
}

// EDIT BOOK MODAL
function openEditBookModal(e) {
    editBookForm.reset()

    oldBookTitle = e.target.parentNode.firstChild.innerHTML  // global declaration, for reference in Library.editBook
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
    editIsRead.checked = book.isRead

    editBookForm.classList.add('active-form')
    editBookModal.style.display = "block"
}

function editBook(e) {
    e.preventDefault()
    const newBook = editBookFromInput() 
    if (validateForm(newBook)) {
        library.editBook(newBook)
        closeBookModals()
        saveLocal()
        updateLibrary()
    }
}

function editBookFromInput() {
    const title = document.getElementById('edit-title').value
    const author = document.getElementById('edit-author').value
    let completedPages = document.getElementById('edit-completed-pages').value
    let totalPages = document.getElementById('edit-total-pages').value
    const isRead = document.getElementById('edit-is-read').checked

    if (completedPages.length == 0) {
        completedPages = 0
    }
    if (totalPages.length == 0) {
        totalPages = 1
    }

    return new Book(title, author, completedPages, totalPages, isRead)
}

// MODAL FORM VALIDATION
function validateForm(newBook) {
    const title = newBook.title
    const author = newBook.author
    const completedPages = newBook.completedPages
    const totalPages = newBook.totalPages

    if (completedPages === totalPages) {
        newBook.isRead = true
    }

    if ((library.isInLibrary(newBook)) && (addBookModal.offsetParent != null)) {    // does not apply to Edit Book Modal
        displayError("That title is already in your library")
        return false
    } else if (title.length <= 0) {
        displayError("Please enter a title")
        return false
    } else if (author.length <= 0) {
        displayError("Please enter an author")
        return false
    } else if (title.length > 50) {
        displayError("Title may not be more than 50 characters")
        return false
    } else if (author.length > 50) {
        displayError("Author may not be more than 50 characters")
        return false
    } else if (completedPages < 0 || completedPages > 1000000) {
        displayError("Completed Pages must be between 0 and 1,000,000")
        return false
    } else if (completedPages > totalPages) {
        displayError("Completed Pages cannot exceed Total Pages")
        return false
    } else if (totalPages < 1 || totalPages > 1000000) {
        displayError("Total Pages must be between 1 and 1,000,000")
        return false
    } else {
        return true
    }
}

function displayError(msg) {
    const bookCard = document.querySelector(".active-form")
    const errorBox = document.createElement('div')
    errorBox.className = "error"
    errorBox.innerHTML = msg

    if (document.body.contains(errorBox)) {
        window.clearTimeout(errorTimeout)
    } else {
        bookCard.appendChild(errorBox)
    }
    
    let errorTimeout = window.setTimeout(function() {
        errorBox.parentNode.removeChild(errorBox);
        errorTimeout = -1;
    }, 2000)
    
}

// UI & MODAL SUPPORT
function closeBookModals() {
    addBookModal.style.display = "none"
    addBookForm.classList.remove('active-form')
    editBookModal.style.display = "none"
    editBookForm.classList.remove('active-form')
}
    window.onclick = (e) => {   // close modal if click outside container
        if (e.target == addBookModal || e.target == editBookModal) {
            closeBookModals()
        }
    }

function removeBook() {
    confirm("Are you sure you want to remove this book from your library?")
    library.removeBook(oldBookTitle)
    closeBookModals()
    saveLocal()
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
        const title = document.createElement('h3')
        const author = document.createElement('h4')
        const pageText = document.createElement('h5')
        const pagesContainer = document.createElement('div')
            const completedPages = document.createElement('p')
            const pagesBreak = document.createElement('p')
            const totalPages = document.createElement('p')
        const isReadButton = document.createElement('button')
        const editButton = document.createElement('button')
        
    isReadButton.onclick = toggleRead
    editButton.onclick = openEditBookModal

    bookCard.classList.add('book-card')
    pagesContainer.classList.add('book-pages-container')
    
    title.textContent = `${book.title}`
    author.textContent = book.author
    pageText.textContent = "Pages Read:"
    completedPages.textContent = `${book.completedPages}`
    pagesBreak.textContent = " / "
    totalPages.textContent = `${book.totalPages}`
    editButton.textContent = "Edit"

    if (book.isRead) {
        isReadButton.textContent = "Read"
        isReadButton.style.backgroundColor = "var(--blueberry)"
        bookCard.style.backgroundColor = "var(--blueberry-light)"
        bookCard.style.transition = "0.3s"
    } else {
        isReadButton.textContent = "Not Read"
        isReadButton.style.backgroundColor = "var(--citrus)"
        bookCard.style.backgroundColor = "#ffffff"
        bookCard.style.transition = "0.3s"
    }

    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pageText)
    bookCard.appendChild(pagesContainer)
    pagesContainer.appendChild(completedPages)
    pagesContainer.appendChild(pagesBreak)
    pagesContainer.appendChild(totalPages)
    bookCard.appendChild(editButton)
    bookCard.appendChild(isReadButton)
    libraryContainer.appendChild(bookCard)
}

function toggleRead(e) {
    const title = e.target.parentNode.firstChild.innerHTML
    const book = library.findBook(title)
    book.isRead = !book.isRead
    saveLocal()
    updateLibrary()
}

// LOCAL STORAGE
function saveLocal() {
    localStorage.setItem('library', JSON.stringify(library))
}

function restoreLocal() {
    const localLibrary = JSON.parse(localStorage.getItem('library'))
    if (localLibrary) {
        library.books = localLibrary.books.map((book) => JSONToBook(book))
    } else {
        library.books = []
    } 
    updateLibrary()
}

function JSONToBook(book) {
    return new Book(book.title, book.author, book.completedPages, book.totalPages, book.isRead)
}

// INIT
window.onload = restoreLocal(), checkIfEmptyLibrary()