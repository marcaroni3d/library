// OBJECTS

function Library() {
    this.books = []
}
Library.prototype = {
    addToLibrary : function() {
        for (let item of arguments) {
            this.books.push(item)
        }
    },
    removeFromLibrary: function(title) {
        this.books = this.books.filter(book => book.title !== title)
    },
    editInLibrary: function(newBook) {
        let oldBook = this.books.find(book => book.title === oldBookTitle)
        Object.assign(oldBook, newBook)
    },
    findInLibrary : function(title) {
        return this.books.find(book => book.title === title)
    }
}

function Book(title, author, completedPages, totalPages, isRead) {
    this.title = title
    this.author = author
    this.completedPages = completedPages
    this.totalPages = totalPages
    this.isRead = isRead
}

// MAIN 
const myLibrary = new Library()

const libraryContainer = document.getElementById('library-container')
const addBookButton = document.getElementById('add-book-button')
const addBookModal = document.getElementById('add-book-modal')
const addBookForm = document.getElementById('add-book-form')
const addBookCancelButton = document.getElementById('cancel-button')
const editBookModal = document.getElementById('edit-book-modal')
const editBookForm = document.getElementById('edit-book-form')
const editBookDeleteButton = document.getElementById('delete-button')
const closeButtons = document.querySelectorAll('.close-button')

addBookButton.onclick = openAddBookModal
addBookForm.addEventListener('submit', addBook)
addBookCancelButton.onclick = closeModals
editBookForm.addEventListener('submit', editBook)
editBookDeleteButton.onclick = deleteBook
closeButtons.forEach(button => { button.addEventListener('click', closeModals)})

function openAddBookModal() {
    addBookModal.style.visibility = 'visible'
}

function openEditBookModal(e) {
    editBookForm.reset()

    oldBookTitle = e.target.parentNode.firstChild.innerHTML
    const book = myLibrary.findInLibrary(oldBookTitle)

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

    editBookModal.style.visibility = 'visible'
}

function closeModals() {
    addBookModal.style.visibility = 'hidden'
    editBookModal.style.visibility = 'hidden'

    // to do: close modal if click outside form container
}

function resetLibrary() {
    libraryContainer.innerHTML = ''
}

function updateLibrary() {
    resetLibrary()
    for (let book of myLibrary.books) {
        createBookCard(book)
    }
}

function addBook(e) {
    e.preventDefault()
    const title = document.getElementById('add-title').value
    const author = document.getElementById('add-author').value
    const completedPages = document.getElementById('add-completed-pages').value
    const totalPages = document.getElementById('add-total-pages').value
    const isRead = document.getElementById('add-is-read').checked
    const newBook = new Book(title, author, completedPages, totalPages, isRead)

    myLibrary.addToLibrary(newBook)
    closeModals()
    updateLibrary()
}

function editBook(e) {
    e.preventDefault()
    const title = document.getElementById('edit-title').value
    const author = document.getElementById('edit-author').value
    const completedPages = document.getElementById('edit-completed-pages').value
    const totalPages = document.getElementById('edit-total-pages').value
    const isRead = document.getElementById('edit-is-read').checked

    const newBook = new Book(title, author, completedPages, totalPages, isRead)
    myLibrary.editInLibrary(newBook)
    closeModals()
    updateLibrary()
}

function deleteBook() {
    console.log(oldBookTitle)
    myLibrary.removeFromLibrary(oldBookTitle)
    closeModals()
    updateLibrary()
}

function createBookCard(book) {
    const bookCard = document.createElement('div')
        const title = document.createElement('h3')
        const author = document.createElement('h4')
        const pagesLabel = document.createElement('h5')
        const pagesContainer = document.createElement('div')
            const completedPages = document.createElement('p')
            const pagesBreak = document.createElement('p')
            const totalPages = document.createElement('p')
        const isReadButton = document.createElement('button')
        const editButton = document.createElement('button')

    isReadButton.onclick = toggleRead
    editButton.onclick = openEditBookModal
        
    bookCard.className = 'book-card'
    pagesContainer.className = 'pages-container'
    /* to do: give each a unique id */

    title.textContent = `${book.title}`
    author.textContent = `${book.author}`
    pagesLabel.textContent = 'Pages Read: '
    completedPages.textContent = `${book.completedPages}`
    pagesBreak.textContent = ` / `
    totalPages.textContent = `${book.totalPages}`
    editButton.textContent = 'Edit'

    if (book.isRead) {
        isReadButton.textContent = 'Read'
        isReadButton.style.backgroundColor = 'var(--blueberry)'
        bookCard.style.backgroundColor = 'var(--blueberry-light)'
        bookCard.style.transition = '0.3s'
    } else {
        isReadButton.textContent = 'Not Read'
        isReadButton.style.backgroundColor = 'var(--citrus)'
        bookCard.style.backgroundColor = 'var(--primary-light)'
        bookCard.style.transition = '0.3s'
    }

    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pagesLabel)
    bookCard.appendChild(pagesContainer)
    pagesContainer.appendChild(completedPages)
    pagesContainer.appendChild(pagesBreak)
    pagesContainer.appendChild(totalPages)
    bookCard.appendChild(isReadButton)
    bookCard.appendChild(editButton)
    libraryContainer.appendChild(bookCard)
}

function toggleRead(e) {
    const title = e.target.parentNode.firstChild.innerHTML
    const book = myLibrary.findInLibrary(title)
    console.log(book)
    book.isRead = !book.isRead
    updateLibrary()
}

// SAMPLE LIBRARY
const jurrasicPark = new Book('Jurrasic Park', 'Michael Crichton', '400', '400', true);
const sherlockHolmes = new Book('Sherlock Holmes', 'Arthur Conan Doyle', '200', '500', false);
const catsCradle = new Book("Cat's Cradle", 'Kurt Vonnegut', '260', '260', true)
const theLostWorld = new Book('The Lost World', 'Michael Crichton', '400', '500', false);
const theStranger = new Book('The Stranger', 'Albert Camus', '150', '150', true);
const godBlessRosewater = new Book("God Bless You, Mr.Rosewater", 'Kurt Vonnegut', '300', '300', false)  
const theGreatGatsby = new Book('The Great Gatsby', 'F. Scott Fitzgerald', '350', '350', true);
const theLionWitchWardobe = new Book('The Lion, The Witch & The Wardrobe', 'C.S. Lewis', '300', '400', false);
const nineStories = new Book("Nine Stories", 'J.D. Salinger', '300', '300', true)  

myLibrary.addToLibrary(jurrasicPark, sherlockHolmes, catsCradle, theLostWorld, theStranger, godBlessRosewater, theGreatGatsby, theLionWitchWardobe, nineStories)

updateLibrary()