//Chaching of DOM Elements
const buttonShowModal = document.querySelector("#btn-show-modal");
const buttonCloseModal = document.querySelector("#btn-close-modal");
const buttonAddBook = document.querySelector("#btn-add-book");
const modalNewBook = document.querySelector("#modal-new-book");
const tableHead = document.querySelector("thead");
const tableBody = document.querySelector("#library-table-body");
const mainContent = document.querySelector("main");


const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const yearInput = document.querySelector("#year");



const library = [];


function saveLibrary() {
    localStorage.setItem("library", JSON.stringify(library));
}

function loadLibrary() {
    const savedLibrary = localStorage.getItem("library");
    if (savedLibrary) {
        const books = JSON.parse(savedLibrary);

        books.forEach(bookData => {
            const book = new Book(bookData._title, bookData._author, bookData._year);
            book.isRead = bookData.isRead; // Restore the `isRead` property
            library.push(book);
        });
    } else {
        alert("No books were found in the library");
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
                saveLibrary();
                renderBooks(); 

            } else {
                this.isRead = false;
                saveLibrary();
                renderBooks(); 
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
        renderBooks();
        
        
    }else{
        alert("No book was added");
    }

}

function deleteBook(index){
    const bookTitle = library[index].title;
    const confirmation = confirm(`Confirm that you want to delete "${bookTitle}"? `);
    if(confirmation){
        library.splice(index, 1); 
        saveLibrary();
        renderBooks(); 
    }else{
        return;
    }
  
}

function renderBooks() {
    tableBody.innerHTML = ""; 
   
    if(library.length === 0){
        const message = document.createElement("p")
        message.textContent = "Your library is empty. Click the button above to add your first book!";
        tableHead.style.display = "none";
        mainContent.appendChild(message) 
    }

    library.forEach((book, index) => {
        const tableRow = document.createElement("tr"); 

        // Create the td for Title
        const titleCell = document.createElement("td");
        titleCell.textContent = book.title;
        tableRow.appendChild(titleCell);

        // Create the td for Author
        const authorCell = document.createElement("td");
        authorCell.textContent = book.author;
        tableRow.appendChild(authorCell);
        
        // Create the td for Year
        const yearCell = document.createElement("td");
        yearCell.textContent = book.year;
        tableRow.appendChild(yearCell);

        // Status Section
        const statusCell = document.createElement("td");
        const statusButton = document.createElement("button"); 
        
        if(book.isRead){
            statusButton.textContent = "Read"
            statusButton.classList.add("btn-status-isread");
        }else{
            statusButton.textContent = "Not Read"
        }
        statusCell.appendChild(statusButton);
        tableRow.appendChild(statusCell);
        
        // Delete Section
        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn-danger");
        deleteCell.appendChild(deleteButton);
        tableRow.appendChild(deleteCell);
        
        // Event Listeners
        deleteButton.addEventListener("click", () => deleteBook(index))
        statusButton.addEventListener("click", () => book.toggleCompleted(index))

        tableBody.appendChild(tableRow);
    });
}



function showModal(){
    modalNewBook.showModal();
}
function closeModal(){
    modalNewBook.close();
}


// Event Listeners

// Toggle for opening or closing the modal
buttonShowModal.addEventListener("click", () => showModal())
buttonCloseModal.addEventListener("click", () => closeModal())


// Adding a new book
buttonAddBook.addEventListener("click", function(){
    const title = titleInput.value;
    const author = authorInput.value;
    const year = parseInt(yearInput.value);

    const newBook = new Book(title, author, year);
    addBookToLibrary(newBook);
    saveLibrary();
    closeModal();
   
});

// Initial Load of Website
loadLibrary()
renderBooks()