//Chaching of DOM Elements
const buttonShowModal = document.querySelector("#btn-show-modal");
const buttonCloseModal = document.querySelector("#btn-close-modal");
const buttonAddBook = document.querySelector("#btn-add-book");
const modalNewBook = document.querySelector("#modal-new-book");


const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const yearInput = document.querySelector("#year");



const library = [];


function saveLibrary() {
    localStorage.setItem("library", JSON.stringify(library));
}

function loadLibrary(){
    const savedLibrary = localStorage.getItem("library");
    if(savedLibrary){
        const books = JSON.parse(savedLibrary);

        books.forEach(bookData => {
            const book = new Book(bookData._title, bookData._author, bookData._year, bookData._isRead);
            library.push(book);
        });
    } else{
        alert("No books was found in the library");
    }
}


class Book{
    #id;

    constructor(title, author, year){
        
        this.#id = crypto.randomUUID()
        this.title = title;
        this.author = author;
        this.year = year;
        this.isRead = false;
    }

        toggleCompleted(){
            if(this.isRead === false) {
            this.isRead = true;

            } else {
            this.isRead = false;
            }
    }

    set title(title){
        if(typeof title === "string" && title.length !== 0){
            this._title = title;
        }else{
            // alert("The title must be a non-empty string");
        }
    }

    set author(author){
        if(typeof author === "string" && author.length !== 0){
            this._author = author;
        }else{
            // alert("The author must be a non-empty string");
        }
    }

    set year(year){
        if(typeof year === "number" && !isNaN(year)){
            this._year = year;
        }else{
            // alert("The year must be a non-empty number");
        }
    }

    get title(){
        return this._title;
    }

    get author(){
        return this._author;
    }

    get year(){
        return this._year;
    }

    get id(){
        return this.#id;
    }

}

function addBookToLibrary(book){
    
    if(book){
        library.push(book);
        saveLibrary();
        
        
    }else{
        alert("No book was added");
    }

}


function renderBooks(){
    
    let counter = 0;
    library.forEach(book => {
        counter++;
        console.log(`Book number ${counter} \nTitle: ${book.title} \nAuthor: ${book.author} \nYear: ${book.year} \nIs read: ${book.isRead} `)
       
    });
}

function clearInputFields(){
    titleInput.value = ""
    authorInput.value = ""
    yearInput.value = ""
}

function showModal(){
    modalNewBook.showModal();
}
function closeModal(){
    modalNewBook.close();
}


// Event Listeners

// Toggle for opening or closing the modal
buttonShowModal.addEventListener("click", showModal);
buttonCloseModal.addEventListener("click", closeModal);

// Adding a new book
buttonAddBook.addEventListener("click", function(){
    const title = titleInput.value;
    const author = authorInput.value;
    const year = parseInt(yearInput.value);

    const newBook = new Book(title, author, year);
    addBookToLibrary(newBook);
    saveLibrary();
    alert("Book added!");
    clearInputFields()
   
});

// Initial Load of Website
loadLibrary()
renderBooks()