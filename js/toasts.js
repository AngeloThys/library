export function createToast(book, index) {
  const toast = document.createElement('div');
  const titleElement = createTitleElement(book);
  const authorElement = createAuthorElement(book);
  const pagesElement = createPagesElement(book);
  const readStatusElement = createReadStatusElement(book);
  const deleteButton = createDeleteButton(toast);

  toast.className = 'card';
  toast.setAttribute('data-index-number', index);

  toast.addEventListener('transitionend', () => {
    this.removeBook(toast.dataset.indexNumber);
    this.displayBooks();
  });

  toast.replaceChildren(
    titleElement,
    authorElement,
    pagesElement,
    readStatusElement,
    deleteButton
  );

  return toast;
}

function createTitleElement(book) {
  const titleElement = document.createElement('div');
  const titleHeader = document.createElement('h2');
  const titleValue = document.createElement('p');

  titleHeader.textContent = 'Title';
  titleHeader.className = 'titleHeader';

  titleValue.textContent = book.title;
  titleValue.className = 'titleValue';

  titleElement.className = 'titleElement';
  titleElement.replaceChildren(titleHeader, titleValue);

  return titleElement;
}

function createAuthorElement(book) {
  const authorElement = document.createElement('div');
  const authorHeader = document.createElement('h2');
  const authorValue = document.createElement('p');

  authorHeader.textContent = 'Author';
  authorHeader.className = 'authorHeader';

  authorValue.textContent = book.author;
  authorValue.className = 'authorValue';

  authorElement.className = 'authorElement';
  authorElement.replaceChildren(authorHeader, authorValue);

  return authorElement;
}

function createPagesElement(book) {
  const pagesElement = document.createElement('div');
  const pagesHeader = document.createElement('h2');
  const pagesValue = document.createElement('p');

  pagesHeader.textContent = 'Pages';
  pagesHeader.className = 'pagesHeader';

  pagesValue.textContent = book.pages;
  pagesValue.className = 'pagesValue';

  pagesElement.className = 'pagesElement';
  pagesElement.replaceChildren(pagesHeader, pagesValue);

  return pagesElement;
}

function createReadStatusElement(book) {
  const readStatusElement = document.createElement('div');
  const readStatusSlider = document.createElement('label');
  const sliderTrigger = document.createElement('input');
  const sliderButton = document.createElement('span');

  readStatusElement.className = 'readStatusElement';

  readStatusSlider.className = 'readStatusSlider';

  sliderTrigger.className = 'sliderTrigger';
  sliderTrigger.type = 'checkbox';
  sliderTrigger.addEventListener('click', () => {
    book.changeReadStatus();
  });
  if (book.read) {
    sliderTrigger.checked = true;
  }

  sliderButton.className = 'sliderButton';

  readStatusSlider.replaceChildren(sliderTrigger, sliderButton);

  readStatusElement.replaceChildren(readStatusSlider);

  return readStatusElement;
}

function createDeleteButton(toast) {
  const deleteButton = document.createElement('img');

  deleteButton.className = 'deleteButton';
  deleteButton.src = './img/trashcan-icon.svg';
  deleteButton.alt = 'Icon of a trashcan';
  deleteButton.addEventListener('mouseenter', () => {
    deleteButton.classList.add('hover');
  });
  deleteButton.addEventListener('mouseleave', () => {
    deleteButton.classList.remove('hover');
  });
  deleteButton.addEventListener('click', () => {
    deleteButton.classList.add('active');
    toast.style.opacity = 0;
  });
  deleteButton.addEventListener('transitionend', (event) => {
    event.stopPropagation();
  });

  return deleteButton;
}
