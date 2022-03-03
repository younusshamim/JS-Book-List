// Book Class
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class 
class UI{
    static addToBookList(book){
        let list = document.querySelector("#book-list");
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>`;
        list.appendChild(row);
    }

    static clearFields(){
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#isbn").value = '';
    }
    
    static showAlert(message, className){
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector(`.${className}`).remove();
        }, 3000)
    }

    static deleteBookItem(trgt){
        if(trgt.hasAttribute('href')){
            trgt.parentElement.parentElement.remove();

            Store.removeBook(trgt.parentElement.previousElementSibling.textContent.trim());

            UI.showAlert('Book Removed!', 'success');
        } 
    }
}

// Local Storage Class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        let books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static displayBooks(){
        let books = Store.getBooks();
        books.forEach(book => {
            UI.addToBookList(book);
        });      
    }

    static removeBook(isbn){
        let books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}







// Get The UI Element
let form = document.querySelector("#book-form");
let bookList = document.querySelector("#book-list");

// Add Event Listener
form.addEventListener('submit', newBook);
bookList.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', Store.displayBooks());


// Function Define
// Add New Book
function newBook(e){
    let bookTitle = document.querySelector("#title").value;
    let bookAuthor = document.querySelector("#author").value;
    let bookIsbn = document.querySelector("#isbn").value;

    // let ui = new UI();

    if(bookTitle === '' || bookAuthor === '' || bookIsbn === ''){
        UI.showAlert("Please fill all the fields!", "error");
    }
    else{
        let book = new Book(bookTitle, bookAuthor, bookIsbn);
        // console.log(book);

        UI.addToBookList(book);
        UI.clearFields();
        UI.showAlert("Book Added Successfully!", "success");

        Store.addBook(book);
    }

    e.preventDefault();
}


// Remove Book
function removeBook(e){
    // let ui = new UI();

    UI.deleteBookItem(e.target);
    e.preventDefault();
}









