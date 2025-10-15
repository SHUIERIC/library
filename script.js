const myLibrary = []

function Book (title, author, pageNumber, read) {
     if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
    this.id = crypto.randomUUID()
    this.title = title;
    this.author = author;
    this.pageNumber = pageNumber;
    this.read = read;
}


function addBookToLibrary (title, author, pageNumber, read) {
    const book = new Book(title, author, pageNumber, read);
    myLibrary.push(book)
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
console.log (myLibrary)


const container = document.querySelector(".bookContainer");

function displayBook () { 
    container.innerHTML = "";


myLibrary.forEach ((book) => {
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
}
)
}

displayBook ()


const showBtn = document.querySelector(".addBtn")
const addBook = document.querySelector(".addBook")
const confirmBtn = document.querySelector("#confirmBtn")

showBtn.addEventListener("click", ()=> {
    addBook.showModal()
})

confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pageNumber = document.getElementById("pageNumber").value
    const readStatus = document.querySelector("input[name=readStatus]:checked")


    addBookToLibrary(title, author, pageNumber, readStatus);
    displayBook();
    addBook.close();

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pageNumber").value = ""

})




container.addEventListener ("click", (e) => {
    if (e.target.classList.contains("deleteBtn")){
    const id = e.target.closest(".book-card").dataset.id;
    const deleteIndex = myLibrary.findIndex ( book => book.id === id);
    myLibrary.splice(deleteIndex, 1);
    e.target.closest(".book-card").remove()

}
})


Book.prototype.toggleReadStatus = function () {
    this.read=!this.read
}

container.addEventListener ("click", (e) => {
    if (e.target.classList.contains("readBtn")) {
        const readCard = e.target.closest(".book-card")
        const readId = readCard.dataset.id;
        const readBook = myLibrary.find(book => book.id === readId)
        readBook.toggleReadStatus()
        const readDiv = readCard.querySelector(".readStatus");
        readDiv.textContent = ` Read: ${readBook.read ?'Yes' : "No"}`
    }
    
})




