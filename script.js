const libraryContainer = document.getElementById('library-container')

function Library() {
    this.books = []
}
Library.prototype = {
    addToLibrary : function(book) {
        this.books.push(book)
    },
    removeFromLibrary: function(book) {
        this.books.pop(book)
    },
    findBook : function(title) {
        return this.books.find((book) => book.title === title)
    }
}

const myLibrary = new Library()

function Book(title, author, completedPages, totalPages, isRead) {
    this.title = title
    this.author = author
    this.completedPages = completedPages
    this.totalPages = totalPages
    this.isRead = isRead
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
        
    bookCard.className = 'book-card'
    pagesContainer.className = 'pages-container'

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





const jurrasicPark = new Book('Jurrasic Park', 'Michael Crichton', '400', '400', true);
const sherlockHolmes = new Book('Sherlock Holmes', 'Arthur Conan Doyle', '200', '500', false);
const catsCradle = new Book("Cat's Cradle", 'Kurt Vonnegut', '300', '300', true) 

myLibrary.addToLibrary(jurrasicPark)
myLibrary.addToLibrary(sherlockHolmes)
myLibrary.addToLibrary(catsCradle)

updateLibrary()