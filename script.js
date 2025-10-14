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

    this.sayBook = function () {
        console.log(this.title)
    }
}


function addBookToLibrary (title, author, pageNumber, read) {
    const book = new Book(title, author, pageNumber, read);
    myLibrary.push(book)
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);



function displayBook () { 
    const container = document.querySelector(".bookContainer");
    container.innerHTML = "";


myLibrary.forEach ((book) => {
    const card = document.createElement("div")
    card.classList.add("book-card")

    card.innerHTML = `
        <div></div>
        <div> ${book.title} </div>
        <div> Author: ${book.author} </div>
        <div> Page Number: ${book.pageNumber} </div>
        <div> Read: ${book.read ?'Yes' : "No"} </div>
        <div></div>
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





