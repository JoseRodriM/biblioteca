const apiKey = 'DJMf9SKpjssGAEGwMPloFXDEGLXEyefy';
let url = `https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=${apiKey}`;
let api ='?api-key=DJMf9SKpjssGAEGwMPloFXDEGLXEyefy'
let list = document.querySelector('.books__list');
let list2 = document.querySelector('.books__list-container')

//https://api.nytimes.com/svc/books/v3/lists/${}.json?api-key=DJMf9SKpjssGAEGwMPloFXDEGLXEyefy

/*async function getBooks(){
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
*/



let r = '';
async function getBooks(){
    try{
        let response = await fetch(url)
        let data = response.json()
        .then(data =>{  
            let books = data.results.lists
            books.forEach(book =>{
                let listItem = document.createElement('UL');
                listItem.setAttribute('class', 'book__list-item')
                listItem.setAttribute('id', `${book.list_name_encoded}`)
                listItem.innerHTML = `<h3>${book.display_name}</h3>
                                    <p>Update: ${book.updated}</p>
                                    <button class="item-button">read more</button>`
                list.appendChild(listItem)
            })
            let names = document.querySelectorAll('.book__list-item');
            names.forEach(name =>{
                name.lastChild.addEventListener('click', e =>{
                    const selected = e.target
                    console.log(selected.parentNode)
                    r = `https://api.nytimes.com/svc/books/v3/lists/${selected.parentNode.id}.json?api-key=DJMf9SKpjssGAEGwMPloFXDEGLXEyefy`
                    async function getUrl(){
                        const response2 = await fetch(r)
                        const data2 = response2.json()
                        .then(data2 =>{
                            let newList = document.createElement('LI');
                            let booksList = data2.results.books
                            
                            booksList.forEach(book =>{
                                let listItem = document.createElement('UL');
                                listItem.setAttribute('class', 'book__list-item2');
                                listItem.innerHTML = `<h3>${book.title}</h3>
                                                        <img src="${book.book_image}" alt="book image">
                                                        <p>${book.description}</p>`
                                newList.appendChild(listItem)
                            })
                            list2.replaceChild(newList, list)
                            
                        })
                    }
                    window.scroll(0,0)
                    getUrl()
                })
                
            })
            
        })
    }catch(err){
        console.log(err)
    }
    
}


getBooks()
