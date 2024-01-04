class Library {
  books = [];

  addToLibrary() {
    for (let item of arguments) {
      this.books.push(item);
    }
  }
  removeFromLibrary(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }
  editInLibrary(newBook) {
    let oldBook = this.books.find((book) => book.title === oldBookTitle);
    Object.assign(oldBook, newBook);
  }
  isInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }
  findInLibrary(title) {
    return this.books.find((book) => book.title === title);
  }
}

class Book {
  constructor(title, author, completedPages, totalPages, isRead) {
    this.title = title;
    this.author = author;
    this.completedPages = completedPages;
    this.totalPages = totalPages;
    this.isRead = isRead;
  }
}

const myLibrary = new Library();
let oldBookTitle

// USER INTERFACE
const libraryContainer = document.getElementById("library-container");
const addBookButton = document.getElementById("add-book-button");
const addBookModal = document.getElementById("add-book-modal");
const addBookForm = document.getElementById("add-book-form");
const addBookCancelButton = document.getElementById("cancel-button");
const editBookModal = document.getElementById("edit-book-modal");
const editBookForm = document.getElementById("edit-book-form");
const editBookDeleteButton = document.getElementById("delete-button");
const closeButtons = document.querySelectorAll(".close-button");

addBookButton.onclick = openAddBookModal;
addBookForm.addEventListener("submit", addBook);
addBookCancelButton.onclick = closeModals;
editBookForm.addEventListener("submit", editBook);
editBookDeleteButton.onclick = deleteBook;
closeButtons.forEach((button) => {
  button.addEventListener("click", closeModals);
});

// MAIN
function resetLibrary() {
  libraryContainer.innerHTML = "";
}

function updateLibrary() {
  resetLibrary();
  for (let book of myLibrary.books) {
    createBookCard(book);
  }
}

function deleteBook() {
  myLibrary.removeFromLibrary(oldBookTitle);
  closeModals();
  updateLibrary();
}

function clearErrors() {
  titleErrorMsg.innerHTML = "";
  authorErrorMsg.innerHTML = "";
  completedPagesErrorMsg.innerHTML = "";
  totalPagesErrorMsg.innerHTML = "";
}

function closeModals() {
  addBookModal.style.visibility = "hidden";
  editBookModal.style.visibility = "hidden";
}
window.addEventListener("click", (e) => {
  if (e.target.id === "add-book-modal" || e.target.id === "edit-book-modal") {
    closeModals();
  }
});

// ADD BOOK MODAL
function openAddBookModal() {
  addBookForm.reset();
  clearErrors();
  addBookModal.style.visibility = "visible";
}

function addBook(e) {
  e.preventDefault();
  const newBook = addBookFromInput();
  if (validateForm(newBook)) {
    myLibrary.addToLibrary(newBook);
    closeModals();
    updateLibrary();
  }
}

function addBookFromInput() {
  const title = document.getElementById("add-title").value;
  const author = document.getElementById("add-author").value;
  let completedPages = parseInt(
    document.getElementById("add-completed-pages").value,
  );
  let totalPages = parseInt(document.getElementById("add-total-pages").value);
  const isRead = document.getElementById("add-is-read").checked;

  if (isNaN(completedPages)) {
    completedPages = 0;
  }
  if (isNaN(totalPages)) {
    totalPages = 1;
  }

  return new Book(title, author, completedPages, totalPages, isRead);
}

// EDIT BOOK MODAL
function openEditBookModal(e) {
  editBookForm.reset();
  clearErrors();

  oldBookTitle = e.target.parentNode.firstChild.innerHTML;
  const book = myLibrary.findInLibrary(oldBookTitle);

  const editTitle = document.getElementById("edit-title");
  const editAuthor = document.getElementById("edit-author");
  const editCompletedPages = document.getElementById("edit-completed-pages");
  const editTotalPages = document.getElementById("edit-total-pages");
  const editIsRead = document.getElementById("edit-is-read");

  editTitle.value = book.title;
  editAuthor.value = book.author;
  editCompletedPages.value = book.completedPages;
  editTotalPages.value = book.totalPages;
  editIsRead.checked = book.isRead;

  editBookModal.style.visibility = "visible";
}

function editBook(e) {
  e.preventDefault();
  const newBook = editBookFromInput();
  if (validateForm(newBook)) {
    myLibrary.editInLibrary(newBook);
    closeModals();
    updateLibrary();
  }
}

function editBookFromInput() {
  const title = document.getElementById("edit-title").value;
  const author = document.getElementById("edit-author").value;
  let completedPages = parseInt(
    document.getElementById("edit-completed-pages").value,
  );
  let totalPages = parseInt(document.getElementById("edit-total-pages").value);
  const isRead = document.getElementById("edit-is-read").checked;

  if (isNaN(completedPages)) {
    completedPages = 0;
  }
  if (isNaN(totalPages)) {
    totalPages = 1;
  }

  return new Book(title, author, completedPages, totalPages, isRead);
}

// FORM VALIDATION
const titleErrorMsg = document.querySelectorAll(".title-error");
const authorErrorMsg = document.querySelectorAll(".author-error");
const completedPagesErrorMsg = document.querySelectorAll(".completed-pages-error");
const totalPagesErrorMsg = document.querySelectorAll(".total-pages-error");

const addTitle = document.getElementById('add-title')
const addAuthor = document.getElementById('add-author')
const addCompletedPages = document.getElementById('add-completed-pages')
const addTotalPages = document.getElementById('add-total-pages')
const editTitle = document.getElementById('edit-title')
const editAuthor = document.getElementById('edit-author')
const editCompletedPages = document.getElementById('edit-completed-pages')
const editTotalPages = document.getElementById('edit-total-pages')

addTitle.onblur = () => validateTitle(addTitle.value)
addAuthor.onblur = () => validateAuthor(addAuthor.value)
addCompletedPages.onblur = () => validateCompletedPages(addCompletedPages.value)
addTotalPages.onblur = () => validateTotalPages(addTotalPages.value)
editTitle.onblur = () => validateTitle(editTitle.value)
editAuthor.onblur = () => validateAuthor(editAuthor.value)
editCompletedPages.onblur = () => validateCompletedPages(editCompletedPages.value)
editTotalPages.onblur = () => validateTotalPages(editTotalPages.value)

function validateTitle(title) {
  titleErrorMsg.forEach(error => error.innerText = '')
  if (title.length <= 0) {
    titleErrorMsg.forEach(error => error.innerText = "Please enter a title")
    return false;
  }
  if (title.length > 50) {
    titleErrorMsg.forEach(error => error.innerText = "Title may not be more than 50 characters")
    return false;
  }
}

function validateAuthor(author) {
  authorErrorMsg.forEach(error => error.innerText = '')
  if (author.length <= 0) {
    authorErrorMsg.forEach(error => error.innerText = "Please enter an author")
    return false;
  }
  if (author.length > 50) {
    authorErrorMsg.forEach(error => error.innerText = "Author may not be more than 50 characters")
    return false;
  }
}

function validateCompletedPages(number) {
  completedPagesErrorMsg.forEach(error => error.innerText = '')
  if (number < 0 || number > 1000000) {
    completedPagesErrorMsg.forEach(error => error.innerText =
      "Completed Pages must be between 0 and 1,000,000")
    return false
  }
  if (number == '' || number == undefined || number == null) {
    completedPagesErrorMsg.forEach(error => error.innerText =
      "Please enter a number")
    return false
  }
}

function validateTotalPages(number) {
  totalPagesErrorMsg.forEach(error => error.innerText = '')
  if (number < 1 || number > 1000000) {
    totalPagesErrorMsg.innerText = "Total Pages must be between 1 and 1,000,000";
    return false;
  } else {
    return true;
  }
}

function validateForm(book) {
  clearErrors();

  const title = book.title;
  const author = book.author;
  const completedPages = book.completedPages;
  const totalPages = book.totalPages;

  validateTitle(title)
  validateAuthor(author)
  validateCompletedPages(completedPages)
  validateTotalPages(totalPages)

  if (completedPages === totalPages) book.isRead = true;

  if (
    myLibrary.isInLibrary(book) &&
    addBookModal.style.visibility === "visible"
  ) {
    titleErrorMsg.forEach(error => error.innerText = "This title is already in your library")
  }
  
  if (completedPages > totalPages) {
    completedPagesErrorMsg.forEach(error => error.innerText = "Completed Pages cannot exceed Total Pages")
    return false;
  }
  
}

// BOOK CARD
function createBookCard(book) {
  const bookCard = document.createElement("div");
  const title = document.createElement("h3");
  const author = document.createElement("h4");
  const pagesLabel = document.createElement("h5");
  const pagesContainer = document.createElement("div");
  const completedPages = document.createElement("p");
  const pagesBreak = document.createElement("p");
  const totalPages = document.createElement("p");
  const isReadButton = document.createElement("button");
  const editButton = document.createElement("button");

  isReadButton.onclick = toggleRead;
  editButton.onclick = openEditBookModal;

  bookCard.className = "book-card";
  pagesContainer.className = "pages-container";

  title.textContent = `${book.title}`;
  author.textContent = `${book.author}`;
  pagesLabel.textContent = "Pages Read: ";
  completedPages.textContent = `${book.completedPages}`;
  pagesBreak.textContent = ` / `;
  totalPages.textContent = `${book.totalPages}`;
  editButton.textContent = "Edit";

  if (book.isRead) {
    isReadButton.textContent = "Read";
    isReadButton.style.backgroundColor = "var(--blueberry)";
    bookCard.style.backgroundColor = "var(--blueberry-light)";
    bookCard.style.transition = "0.3s";
  } else {
    isReadButton.textContent = "Not Read";
    isReadButton.style.backgroundColor = "var(--citrus)";
    bookCard.style.backgroundColor = "var(--blueberry-light)";
    bookCard.style.transition = "0.3s";
  }

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pagesLabel);
  bookCard.appendChild(pagesContainer);
  pagesContainer.appendChild(completedPages);
  pagesContainer.appendChild(pagesBreak);
  pagesContainer.appendChild(totalPages);
  bookCard.appendChild(isReadButton);
  bookCard.appendChild(editButton);
  libraryContainer.appendChild(bookCard);
}

function toggleRead(e) {
  const title = e.target.parentNode.firstChild.innerHTML;
  const book = myLibrary.findInLibrary(title);
  book.isRead = !book.isRead;
  updateLibrary();
}

// SAMPLE LIBRARY
const jurrasicPark = new Book(
  "Jurrasic Park",
  "Michael Crichton",
  "400",
  "400",
  true,
);
const sherlockHolmes = new Book(
  "Sherlock Holmes",
  "Arthur Conan Doyle",
  "200",
  "500",
  false,
);
const catsCradle = new Book(
  "Cat's Cradle",
  "Kurt Vonnegut",
  "260",
  "260",
  true,
);
const theLostWorld = new Book(
  "The Lost World",
  "Michael Crichton",
  "400",
  "500",
  false,
);
const theStranger = new Book(
  "The Stranger",
  "Albert Camus",
  "150",
  "150",
  true,
);
const theGreatGatsby = new Book(
  "The Great Gatsby",
  "F. Scott Fitzgerald",
  "350",
  "350",
  false,
);

myLibrary.addToLibrary(
  jurrasicPark,
  sherlockHolmes,
  catsCradle,
  theLostWorld,
  theStranger,
  theGreatGatsby,
);

updateLibrary();
