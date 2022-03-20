const apiKey = 'DJMf9SKpjssGAEGwMPloFXDEGLXEyefy';
let url = `https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=${apiKey}`;
let list = document.querySelector('.books__list');
let list2 = document.querySelector('.books__list-container')
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC30c3DZG4qgQe8BeIgL6Y_fGRes7Sk_YY",
    authDomain: "proyectoprueba-f67b1.firebaseapp.com",
    projectId: "proyectoprueba-f67b1",
    storageBucket: "proyectoprueba-f67b1.appspot.com",
    messagingSenderId: "75840391092",
    appId: "1:75840391092:web:7ba83e7ce4c7b908b814e1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();// db representa mi BBDD
let user = firebase.auth().currentUser;
const createUser = (user) => {
  db.collection("users")
    .add(user)
    .then((docRef) => console.log("Document written with ID: ", docRef.id))
    .catch((error) => console.error("Error adding document: ", error));
};

let overlay = document.createElement('DIV');
overlay.setAttribute('class', 'overlay')
let form = document.createElement('FORM');
let register = document.querySelector('.register');
let signIn = document.querySelector('.signIn')

register.addEventListener('click', e =>{
    form.setAttribute('id', 'form');
    form.setAttribute('method', 'POST');
    form.innerHTML = `<label for="email">Email:</label>
                    <input type="email" id="email" name="email">
                    <label for="pass">Password:</label>
                    <input type="password" id="pass" name ="pass">
                    <label for="pass2">Repite password</label>
                    <input type="password" id="pass2" name="pass2">
                    <input type="submit" value="Register" class="submit-btn">
                    <i class='bx bx-x-circle close' ></i>`
    overlay.appendChild(form)
    document.body.appendChild(overlay);
    //document.body.classList.toggle('move')
    let close = document.querySelector('.close');
    close.addEventListener('click', () =>{
        overlay.remove()
        //document.body.classList.toggle('move');
    })
    const signUpUser = (email, password) => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in
            let user = userCredential.user;
            alert(`user ${user.email} created with ID:${user.uid}`)
            // Guarda El usuario en Firestore
            createUser({
              id:user.uid,
              email:user.email,
              favorites : [
                  {
                      'prueba' : 'prueba'
                  }
              ]
            });
          })
          .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("Error en el sistema"+error.message);
          });
    };  
    document.getElementById("form").addEventListener("submit",function(event){
        event.preventDefault();
        let email = event.target.elements.email.value;
        let pass = event.target.elements.pass.value;
        let pass2 = event.target.elements.pass2.value;
        if(pass===pass2){
            signUpUser(email,pass);
            overlay.remove();
            //document.body.classList.toggle('move');
        }
        else{
            alert("error password");
        }
      })
})

signIn.addEventListener('click', e =>{
    form.setAttribute('id', 'form2');
    form.setAttribute('method', 'POST');
    form.innerHTML = `<label for="email2">Email:</label>
                    <input type="email" id="email2" name="email2">
                    <label for="pass2">Password:</label>
                    <input type="password" id="pass2" name ="pass2">
                    <input type="submit" value="Sign In" class="submit-btn">
                    <i class='bx bx-x-circle close' ></i>`
    overlay.appendChild(form)
    document.body.appendChild(overlay);
    //document.body.classList.toggle('move')
    let close = document.querySelector('.close');
    close.addEventListener('click', () =>{
        overlay.remove()
        //document.body.classList.toggle('move');
    })
    const signInUser = (email,password) =>{
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            let user = userCredential.user;
            alert(`logged user ${user.email} with ID:${user.uid}`);
            let log2 = document.querySelector('.log2');
            log2.remove();
            let newLog = document.createElement('DIV');
            newLog.setAttribute('class', 'newLog')
            newLog.innerHTML = `<button class="logOut">Log Out</button>
                                <button class="favorites">Favorites</button>`;
            document.querySelector('.log').appendChild(newLog)
            overlay.remove()
            //document.body.classList.toggle('move');
            const signOut = () => {
                firebase.auth().signOut().then(() => {
                    console.log("Log out user: "+user.email)
                    document.querySelector('.log').replaceChild(log2, newLog);
                    location.reload()
                }).catch((error) => {
                    console.log(error);
                });
            }
            document.querySelector('.logOut').addEventListener('click', signOut)
          })
          .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorMessage)
          });
    }
    document.getElementById("form2").addEventListener("submit",function(event){
        event.preventDefault();
        let email = event.target.elements.email2.value;
        let pass = event.target.elements.pass2.value;
        signInUser(email,pass);
    })
    
})

let favoriteList = []

async function getBooks(){

    try{
        let response = await fetch(url)
        let data = response.json()
        .then(data =>{  
            signIn.addEventListener('click', e =>{
                form.setAttribute('id', 'form2');
                form.setAttribute('method', 'POST');
                form.innerHTML = `<label for="email2">Email:</label>
                                <input type="email" id="email2" name="email2">
                                <label for="pass2">Password:</label>
                                <input type="password" id="pass2" name ="pass2">
                                <input type="submit" value="Sign In" class="submit-btn">
                                <i class='bx bx-x-circle close' ></i>`
                overlay.appendChild(form)
                document.body.appendChild(overlay);
                //document.body.classList.toggle('move')
                let close = document.querySelector('.close');
                close.addEventListener('click', () =>{
                    overlay.remove()
                    //document.body.classList.toggle('move');
                })
            })
            let books = data.results.lists
            books.forEach(book =>{
                let listItem = document.createElement('UL');
                listItem.setAttribute('class', 'book__list-item')
                listItem.setAttribute('id', `${book.list_name}`)
                listItem.innerHTML = `<h3>${book.display_name}</h3>
                                    <p>Update: ${book.updated}</p>
                                    <button class="item-button">read more!!</button>`
                list.appendChild(listItem)
            })
            let names = document.querySelectorAll('.book__list-item');
            names.forEach(name =>{
                name.lastChild.addEventListener('click', e =>{
                    const selected = e.target
                    let div = document.createElement('DIV');
                    let newList = document.createElement('UL');
                    newList.setAttribute('class', 'newList');
                    div.innerHTML = `<h2>${selected.parentNode.id}</h2>
                                    <button class="back"><i class='bx bx-arrow-back'></i>Back to index</button>`
                    const listas = data.results.lists
                    listas.forEach(lista=>{
                        const listasLibros = lista.books
                        if(selected.parentNode.id == lista.list_name){
                            listasLibros.forEach(li=>{
                                let listItem = document.createElement('LI');
                                listItem.setAttribute('class', 'book__list-item2');
                                listItem.innerHTML = `<h3>${li.title}</h3>
                                                        <img src="${li.book_image}" alt="book image">
                                                        <p>${li.description}</p>
                                                        <button class="sellButton"><a href="${li.amazon_product_url}" target="_blank">But at Amazon</a></button>
                                                        <button class="sellButton favoriteList" id="favoriteList">Add to favorites</button>`
                                newList.appendChild(listItem);
                                div.appendChild(newList);
                                let favoriteButton = listItem.lastChild;
                                favoriteButton.addEventListener('click', e =>{
                                    let favoriteBook = {
                                        title : `${li.title}`,
                                        img : `${li.book_image}`,
                                        desc : `${li.description}`,
                                        link : `${li.amazon_product_url}`
                                    };

                                        if (firebase.auth().currentUser !== null) {
                                            newList.removeChild(listItem)
                                            favoriteList.push(favoriteBook)
                                            //favoriteList.push(favoriteBook);
                                            let user = firebase.auth().currentUser.uid
                                            db.collection("users").doc(`0ON00QOcRNy8WHu5mwVa`).set({
                                                favoriteList
                                            }, {merge : true})
                                            .then(() => {
                                                console.log('Added to favorites');
                                            })
                                            .catch((error) =>{
                                                console.log('Error' + error)
                                            })
                                            
                                        }else{
                                            console.log('You have to log for this option')
                                        }
                                        console.log(favoriteList)
                                })
                            })
                        }  
                    })
                    list2.replaceChild(div, list);
                    window.scroll(0,0);
                    document.querySelector('.back').addEventListener('click', () =>{
                        list2.replaceChild(list, div)
                    })
                })
            })
        })
    }catch(err){
        console.log(err)
    }
}
getBooks()


