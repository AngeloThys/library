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
    this.library = [];
  }

  addBook(book) {
    this.library.push(book);
  }

  removeBook(bookIndex) {
    this.library.splice(bookIndex, 1);
  }

  displayBooks() {
    const main = document.querySelector("main");
    const cards = [];
    for (let [index, book] of this.library.entries()) {
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
          input.addEventListener("click", () => {
            book.changeReadStatus();
          });
          span.className = "slider";

          if (book[property]) {
            input.checked = true;
          }

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

      img.addEventListener("mouseenter", (event) => {
        event.stopPropagation();
        img.style.cssText =
          "transition: transform 0.2s; transform: scale(1.1);";
      });

      img.addEventListener("mouseleave", (event) => {
        event.stopPropagation();
        img.style.cssText =
          "transition: transform 0.2s; transform: scale(1.0);";
      });

      img.addEventListener("click", () => {
        img.style.cssText =
          "transition: transform 0.1s; transform: rotate(30deg);";
        div.style.opacity = 0;
      });

      img.addEventListener("transitionend", (event) => {
        event.stopPropagation();
      });

      div.addEventListener("transitionend", (event) => {
        if (event.propertyName === "opacity") {
          this.removeBook(div.dataset.indexNumber);
          this.displayBooks();
        }
      });

      div.appendChild(img);

      div.setAttribute("data-index-number", index);

      cards.push(div);
    }
    main.replaceChildren(...cards);
  }
}

function getBookInfo() {
  const bookTitle = document.querySelector("#title").value;
  const bookAuthor = document.querySelector("#author").value;
  const bookPages = document.querySelector("#pages").value;
  const bookRead = document.querySelector("#read").checked;

  return [bookTitle, bookAuthor, bookPages, bookRead];
}

const openFormButton = document.querySelector(".action");
const dialog = document.querySelector("#bookDialog");
const form = document.querySelector("#bookForm");
const cancelButton = document.querySelector("#cancel");
const submitButton = document.querySelector("#submit");

const library = new Library();

openFormButton.addEventListener("click", () => {
  dialog.showModal();
});

cancelButton.addEventListener("click", () => {
  dialog.close();
});

submitButton.addEventListener("click", () => {
  const book = new Book(...getBookInfo());
  library.addBook(book);
  dialog.close();
  form.reset();
  library.displayBooks();
});
