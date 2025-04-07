const library = [];


function saveLibrary() {
    localStorage.setItem("library", JSON.stringify(library));
}

function loadLibrary(){
    const savedLibrary = localStorage.getItem("library");
    if(savedLibrary){
        const books = JSON.parse(savedLibrary);

        books.forEach(bookData => {
            const book = new Book(bookData._title, bookData._author, bookData._year);
            library.push(book);
        });
    } else{
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
    }

    set title(title){
        if(typeof title === "string" && title.length !== 0){
            this._title = title;
        }else{
            alert("The title must be a non-empty string");
        }
    }

    set author(author){
        if(typeof author === "string" && author.length !== 0){
            this._author = author;
        }else{
            alert("The author must be a non-empty string");
        }
    }

    set year(year){
        if(typeof year === "number" && !isNaN(year)){
            this._year = year;
        }else{
            alert("The year must be a non-empty number");
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

const addBookToLibrary = (book) =>{
    
    if(book){
        library.push(book);
        saveLibrary();
        renderBooks();
        
    }else{
        alert("No book was added");
    }

}

function renderBooks(){
    
    let counter = 0;
    library.forEach(book => {
        counter++;
        console.log(`Book number ${counter} \nTitle: ${book.title} \nAuthor: ${book.author} \nYear: ${book.year} `)
       
    });
}

const book1 = new Book("Harry Potter", "Jacob Asker", 2004);
const book2 = new Book("Book 2", "Anders Asker", 2009);
addBookToLibrary(book1);
addBookToLibrary(book2);


// Event Listeners


// Initial Load of Website
loadLibrary()
renderBooks()