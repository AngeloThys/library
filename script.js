// All books are stored locally
const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBooks(library) {
  const main = document.querySelector("main");
  for (let book of library) {
    const div = document.createElement("div");
    div.className = "card";
    for (let property in book) {
      if (property === "read") {
        const h2 = document.createElement("h2");
        const label = document.createElement("label");
        const input = document.createElement("input");
        const span = document.createElement("span");

        h2.textContent = property[0].toUpperCase() + property.slice(1);

        label.className = "toggle";
        input.setAttribute("type", "checkbox");
        span.className = "slider";

        label.appendChild(input);
        label.appendChild(span);

        div.appendChild(h2);
        div.appendChild(label);

        break;
      }

      const h2 = document.createElement("h2");
      const p = document.createElement("p");

      h2.textContent = property[0].toUpperCase() + property.slice(1);
      p.textContent = book[property];

      div.appendChild(h2);
      div.appendChild(p);
    }
    const img = document.createElement("img");

    img.setAttribute("src", "./img/trashcan-icon.svg");
    img.setAttribute("alt", "Icon of a trashcan");

    div.appendChild(img);

    main.appendChild(div);
  }
}

const openFormButton = document.querySelector(".action");
const dialog = document.querySelector("#bookDialog");
const form = document.querySelector("#bookForm");
const cancelButton = document.querySelector("#cancel");
const submitButton = document.querySelector("#submit");

openFormButton.addEventListener("click", () => {
  dialog.showModal();
});

cancelButton.addEventListener("click", () => {
  dialog.close();
});

function getBookInfo() {
  const bookTitle = document.querySelector("#title").value;
  const bookAuthor = document.querySelector("#author").value;
  const bookPages = document.querySelector("#pages").value;
  const bookRead = document.querySelector("#read").value;

  return [bookTitle, bookAuthor, bookPages, bookRead];
}

submitButton.addEventListener("click", () => {
  const newBook = getBookInfo();
  addBookToLibrary(...newBook);
  dialog.close();
  form.reset();
  displayBooks(myLibrary);
});
