document.getElementById('errorMessage').style.display = 'none';

const searchBooks = () => {
    const inputField = document.getElementById('search-field');
    const inputText = inputField.value;

    //empty input handle
    if (inputText === '') {
        displayError();
    } else {
        const url = `https://openlibrary.org/search.json?q=${inputText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => findResult(data))
    }

}

findResult = Allresults => {
    // total results
    const numberOfResultsFound = Allresults.numFound;

    const inputField = document.getElementById('search-field');
    const inputText = inputField.value;
    inputField.value = '';

    //first showing number of results found 
    const numberOfResult = document.getElementById('number-of-results');
    if (numberOfResultsFound === 0) {
        numberOfResult.innerHTML = '';
        displayError();
    } else {
        document.getElementById('errorMessage').style.display = 'none';
        numberOfResult.innerHTML = `<h1>${numberOfResultsFound} Books Found for '${inputText}'</h1>`;
        showResult(Allresults.docs);
    }
}



// error handling function 
const displayError = () => {
    document.getElementById('errorMessage').style.display = 'block';
    document.getElementById('searchResult').textContent = '';
    document.getElementById('book-numbers').textContent = '';
}

//trying to show results
showResult = books => {
    const parentDiv = document.getElementById('searchResult');
    parentDiv.textContent = '';

    //using foreach loop to show each book

    books.forEach(book => {

        //add cover image
        let coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

        if (book.cover_i === undefined) {
            coverUrl = `https://covers.openlibrary.org/b/id/10909258-M.jpg`;
        }

        //add book title
        const bookName = book.title;

        //author name, publisher name, first publish year, publish date
        let { author_name, publisher, first_publish_year, publish_date } = book;

        //author validation
        if (author_name === undefined) {
            author_name = 'Author Not Found'
        }

        //publisher validation
        if (publisher === undefined) {
            publisher = 'publisher Not Found'
        }

        //first publication year validation
        if (first_publish_year === undefined) {
            first_publish_year = 'Not Found'
        }

        //publish date validation
        if (publish_date === undefined) {
            first_publish_year = 'Not Found'
        }



        //creating child div of result to add
        const child = document.createElement('div');
        child.classList.add('card');
        child.classList.add('col-3');
        child.classList.add('mx-5');

        child.innerHTML = `
        <img src="${coverUrl}" class="card-img-top w-75 h-75 mt-2 rounded mx-auto" alt="Cover Not Available" >
        <div class="card-body">
                <h5 class="card-title">${bookName}</h5>
                <p class="card-text mb-0"><span class="fw-bold">Author: </span> ${author_name}</p>
                <p class="card-text mb-0"><span class="fw-bold">Publisher: </span>${publisher}</p>
                <p class="card-text mb-0"><span class="fw-bold">Publish Date: </span>${publish_date[0]}</p>
                <p class="card-text mb-0"><span class="fw-bold">First Publish: </span>${first_publish_year}</p>

        </div>     
        `

        parentDiv.appendChild(child);
    });

}