let userLibrary = JSON.parse(localStorage.getItem('Book') || '[]');

const button = document.getElementById('button');
const addBookButton = document.getElementById('addButton');
const form = document.getElementById('bookFormInputs');
const formContainer = document.getElementsByClassName('.form-container');
const cardContainer = document.getElementById('cardContainer');
const bookCounter = document.getElementById('bookCounter');

const totalBooksContainer = document.getElementById('totalBooks');
const completedBooksContainer = document.getElementById('completedBooks');

let bookTitle = '';
let bookAuthor = '';
let bookReleaseYear = '';
let bookPages = '';
let isRead = false;
let userBook;
let readStatus;
let buttonIndex = 0;
let index;

let completedBooks;
let totalBooks;

let incorrectTitle = document.querySelector('.incorrectTitle');
let incorrectAuthor = document.querySelector('.incorrectAuthor');
let incorrectReleaseYear = document.querySelector('.incorrectReleaseYear');
let incorrectPages = document.querySelector('.incorrectPages');

let incorrectMessage = document.createElement('p');

displayCards();

function Book(title, author, releaseYear, pages, isRead) {
	this.title = title;
	this.author = author;
	this.releaseYear = releaseYear;
	this.pages = pages;
	this.isRead = isRead;
}

function setBookToLocalStorage() {
	localStorage.setItem('Book', JSON.stringify(userLibrary));
}

function addBookToLibrary() {
	if (checkValidation() == false) {
		return;
	} else {
		bookTitle = form.bookTitle.value;
		bookAuthor = form.bookAuthor.value;
		bookReleaseYear = form.bookReleaseYear.value;
		bookPages = form.bookPages.value;
		isRead = form.isRead.checked;

		userBook = new Book(
			bookTitle,
			bookAuthor,
			bookReleaseYear,
			bookPages,
			isRead
		);

		userLibrary.push(userBook);
		setBookToLocalStorage();
		readButtonListeners();
	}
}

function resetForm() {
	form.bookTitle.value = '';
	form.bookAuthor.value = '';
	form.bookReleaseYear.value = '';
	form.bookPages.value = '';
	form.isRead.checked = false;
}

/* Validation */

function checkValidation() {
	if (
		checkBookTitle() == false ||
		checkBookAuthor() == false ||
		checkBookReleaseDate() == false ||
		checkBookPages() == false
	) {
		return false;
	} else return true;
}

function checkBookTitle() {
	if (form.bookTitle.value == '') {
		incorrectMessage.textContent = '* Book title cannot be blank';
		incorrectTitle.appendChild(incorrectMessage);
		incorrectTitle.style.color = 'red';
		incorrectTitle.style.textTransform = 'lowercase';
		return false;
	} else return true;
}

function checkBookAuthor() {
	if (form.bookAuthor.value == '') {
		incorrectMessage.textContent = '* Author cannot be blank';
		incorrectAuthor.appendChild(incorrectMessage);
		incorrectAuthor.style.color = 'red';
		incorrectAuthor.style.textTransform = 'lowercase';

		return false;
	} else return true;
}

function checkBookReleaseDate() {
	if (form.bookReleaseYear.value == '') {
		incorrectMessage.textContent = '* Release Date cannot be blank';
		incorrectReleaseYear.appendChild(incorrectMessage);
		incorrectReleaseYear.style.color = 'red';
		incorrectReleaseYear.style.textTransform = 'lowercase';
		return false;
	} else return true;
}

function checkBookPages() {
	if (form.bookPages.value == '') {
		incorrectMessage.textContent = '* Pages cannot be blank';
		incorrectPages.appendChild(incorrectMessage);
		incorrectPages.style.color = 'red';
		incorrectPages.style.textTransform = 'lowercase';
		return false;
	} else return true;
}

function displayCards() {
	buttonIndex = 0;
	totalBooks = 0;
	completedBooks = 0;
	cardContainer.replaceChildren();
	userLibrary = JSON.parse(localStorage.getItem('Book') || '[]');

	for (let i = 0; i < userLibrary.length; i++) {
		bookAuthor = userLibrary[i].author;
		bookTitle = userLibrary[i].title;
		bookReleaseYear = userLibrary[i].releaseYear;
		bookPages = userLibrary[i].pages;
		isRead = userLibrary[i].isRead;

		if (isRead == true) {
			completedBooks++;
		}

		const cardTemplate = `<div class="library-card">
									<div class="book-title">
										<button id="readButton">
											<span id="readIcon" index="${buttonIndex}" class="material-icons bookIsRead bookIsNotRead" > done_all </span>
										</button>
										<h4 title="${bookTitle}">${bookTitle}</h4>
										<button id="deleteButton">
											<span id="deleteIcon" index="${buttonIndex}" class="material-icons "> highlight_off </span>
										</button>
									</div>
									<div class="library-card-content">
										<div class="book-author">
											<h3>Author</h3>
											<span id="author">${bookAuthor}</span>
										</div>
										<div class="book-release-date">
											<h3>Release Date</h3>
											<span id="releaseDate">${bookReleaseYear}</span>
										</div>
										<div class="book-pages">
											<h3>Pages</h3>
											<span id="releaseDate">${bookPages}</span>
										</div>
									</div>
								</div>`;

		const libraryDiv = document.createElement('div');
		libraryDiv.innerHTML = cardTemplate;

		let readButtonChildren =
			libraryDiv.firstElementChild.firstElementChild.firstElementChild
				.firstElementChild;

		if (isRead == true) {
			readButtonChildren.classList.toggle('bookIsNotRead');
		} else {
			readButtonChildren.classList.toggle('bookIsRead');
		}
		cardContainer.appendChild(libraryDiv);
		buttonIndex++;
	}

	updateBookCounter();
}

function updateBookCounter() {
	totalBooks = buttonIndex;
	totalBooksContainer.innerText = totalBooks;
	completedBooksContainer.innerText = completedBooks;
}

/* On Click Events */

button.addEventListener('click', () => {
	if (checkValidation()) {
		document.getElementById('formContainerID').style.display = 'none';
	}
	addBookToLibrary();
	displayCards();
	readButtonListeners();
	deleteButtonListeners();
	resetForm();
});

addBookButton.addEventListener('click', () => {
	document.getElementById('formContainerID').style.display = 'block';
});

window.onclick = function (event) {
	if (event.target.className === 'formContainer') {
		event.target.style.display = 'none';
	}
};

let readButtons = document.querySelectorAll('#readButton');

function readButtonListeners() {
	let readIcons = document.querySelectorAll('#readIcon');
	for (let i = 0; i < readIcons.length; i++) {
		let toggleButton = readIcons.item(i);
		toggleButton.addEventListener('click', () => {
			toggleButton.classList.toggle('bookIsRead');
			toggleButton.classList.toggle('bookIsNotRead');

			if (userLibrary[i].isRead == false) {
				userLibrary[i].isRead = true;
				setBookToLocalStorage();
				displayCards();
				readButtonListeners();
				deleteButtonListeners();
			} else if (userLibrary[i].isRead == true) {
				userLibrary[i].isRead = false;
				setBookToLocalStorage();
				displayCards();
				readButtonListeners();
				deleteButtonListeners();
			}
		});
	}
}

function deleteButtonListeners() {
	let deleteButtons = document.querySelectorAll('#deleteIcon');
	for (let i = 0; i < deleteButtons.length; i++) {
		let toggleButton = deleteButtons.item(i);
		toggleButton.addEventListener('click', () => {
			if (
				confirm(
					'Are you sure you want to delete ' +
						userLibrary[i].title +
						' from your library?'
				) == true
			) {
				userLibrary.splice(i, 1);
				setBookToLocalStorage();
				displayCards();
				deleteButtonListeners();
				readButtonListeners();
			}
		});
	}
}

readButtonListeners();
deleteButtonListeners();
