const apiKey = 'DJMf9SKpjssGAEGwMPloFXDEGLXEyefy';
let url = `https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=${apiKey}`;
let api ='?api-key=DJMf9SKpjssGAEGwMPloFXDEGLXEyefy'
let list = document.querySelector('.books__list');


//Llamada a la API
async function getBooks(){
    try{
        const response = await fetch(url);
        let data = await response.json();
        return data
    }catch(err){
        console.log(err)
    }
}

getBooks().then(data =>{  
    let books = data.results.lists
    books.forEach(book =>{
        let listItem = document.createElement('UL');
        listItem.setAttribute('class', 'book__list-item')
        listItem.innerHTML = `<h3>${book.display_name}</h3>
                            <p>Update: ${book.updated}</p>
                            <button class="item-button">read more</button>`
        list.appendChild(listItem)
    })
})