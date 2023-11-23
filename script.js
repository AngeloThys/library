import { createToast } from './js/toasts.js';

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  changeReadStatus() {
    this.read = this.read ? false : true;
  }
}

class Library {
  constructor() {
    this.library = [
      {
        title: 'A',
        author: 'A',
        pages: 2,
        read: true,
      },
    ];
  }

  addBook(book) {
    this.library.push(book);
  }

  removeBook(bookIndex) {
    this.library.splice(bookIndex, 1);
  }

  displayBooks() {
    const main = document.querySelector('main');
    const toasts = [];
    for (let [index, book] of this.library.entries()) {
      const toast = createToast(book, index);

      toasts.push(toast);
    }
    main.replaceChildren(...toasts);
  }
}

function getBookInfo() {
  const bookTitle = document.querySelector('#title').value;
  const bookAuthor = document.querySelector('#author').value;
  const bookPages = document.querySelector('#pages').value;
  const bookRead = document.querySelector('#read').checked;

  return [bookTitle, bookAuthor, bookPages, bookRead];
}

const openFormButton = document.querySelector('.action');
const dialog = document.querySelector('#bookDialog');
const form = document.querySelector('#bookForm');
const cancelButton = document.querySelector('#cancel');
const submitButton = document.querySelector('#submit');

const library = new Library();

openFormButton.addEventListener('click', () => {
  dialog.showModal();
});

cancelButton.addEventListener('click', () => {
  dialog.close();
});

submitButton.addEventListener('click', () => {
  const book = new Book(...getBookInfo());
  library.addBook(book);
  dialog.close();
  form.reset();
  library.displayBooks();
});

library.displayBooks();