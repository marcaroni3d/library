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
    removeFromLibrary: function(book) {
        this.books.pop(book)
    },
    findBook : function(title) {
        return this.books.find((book) => book.title === title)
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
const modalSubmitButtons = document.querySelectorAll('.submit-button')
const closeButtons = document.querySelectorAll('.close-button')

addBookButton.onclick = openAddBookModal

modalSubmitButtons.forEach(button => button.addEventListener('click', (e) => {
    console.log(e)
}))

closeButtons.forEach(button => button.addEventListener('click', (e) => {
    closeModal(e)
}))

function closeModal(e) {
    e.target.parentElement.parentElement.style.visibility = 'hidden'
}

function openAddBookModal() {
    addBookModal.style.visibility = 'visible'
}

function openEditBookModal() {
    editBookModal.style.visibility = 'visible'
}

function updateLibrary() {
    resetLibrary()
    for (let book of myLibrary.books) {
        createBookCard(book)
    }
}

function resetLibrary() {
    libraryContainer.innerHTML = ''
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
    const book = myLibrary.findBook(title)
    console.log(book)
    book.isRead = !book.isRead
    updateLibrary()
}

function addBook(e) {
    const title = e.target.parentNode.firstChild.innerHTML

}



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