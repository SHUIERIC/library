const container = document.querySelector(".bookContainer");
const showBtn = document.querySelector(".addBtn")
const addBook = document.querySelector(".addBook")
const confirmBtn = document.querySelector("#confirmBtn")

// Book class 
class Book {
    static myLibrary = [];

    constructor (title, author, pageNumber, read) {
        this.id = crypto.randomUUID()
        this.title = title;
        this.author = author;
        this.pageNumber = pageNumber;
        this.read = read;

        Book.myLibrary.push(this)
    }   
    
    static displayBook () { 
        container.innerHTML = "";


        Book.myLibrary.forEach ((book) => {
        const card = document.createElement("div");
        card.classList.add("book-card");
        card.dataset.id = book.id

        card.innerHTML = `
            <div> ${book.title} </div>
            <div> Author: ${book.author} </div>
            <div> Page Number: ${book.pageNumber} </div>
            <div class="readStatus"> Read: ${book.read ?'Yes' : "No"} </div>
            <button class="readBtn">Read</button>
            <button class="deleteBtn">Delete</button>
        `
        container.appendChild(card)
    })}

    toggleReadStatus() {
        this.read=!this.read
    }
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 310, false);
const book2 = new Book("1984", "George Orwell", 328, true);
const book3 = new Book("To Kill a Mockingbird", "Harper Lee", 281, true);
console.log (Book.myLibrary)
Book.displayBook()


// Add book event listners 
showBtn.addEventListener("click", ()=> {
    addBook.showModal()
})

confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pageNumber = document.getElementById("pageNumber").value
    const readStatus = document.querySelector("input[name=readStatus]:checked")


    new Book(title, author, pageNumber, readStatus);
    Book.displayBook();
    addBook.close();

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pageNumber").value = ""
})


// Remove book event lsitner
container.addEventListener ("click", (e) => {
    if (e.target.classList.contains("deleteBtn")){
    const id = e.target.closest(".book-card").dataset.id;
    const deleteIndex = Book.myLibrary.findIndex ( book => book.id === id);
    Book.myLibrary.splice(deleteIndex, 1);
    e.target.closest(".book-card").remove()

}
})


// Event listner to toggle read status 
container.addEventListener ("click", (e) => {
    if (e.target.classList.contains("readBtn")) {
        const readCard = e.target.closest(".book-card")
        const readId = readCard.dataset.id;
        const readBook = Book.myLibrary.find(book => book.id === readId)
        readBook.toggleReadStatus()
        const readDiv = readCard.querySelector(".readStatus");
        readDiv.textContent = ` Read: ${readBook.read ?'Yes' : "No"}`
    }
})




