window.addEventListener('load', solve);

function solve() {
    let genre = document.getElementById("genre");
    let name = document.getElementById("name");
    let author = document.getElementById("author");
    let date = document.getElementById("date");

    let allHitsContainer = document.querySelector('.all-hits-container');
    let savedContainer = document.querySelector('.saved-container');

    let likes = document.querySelector('.likes p');
    let likedSong = 0;

    document.getElementById("add-btn").addEventListener('click', addSong);
    function addSong(e) {
        e.preventDefault();

        if (
            genre.value == ''
            || name.value == ''
            || author.value == ''
            || date.value == ''
        ) {
            return;
        }

        let divElementInfo = createElement('div', 'hits-info', undefined, undefined);

        let imgElement = createElement('img', undefined, undefined, undefined);
        imgElement.setAttribute('src', './static/img/img.png');
        divElementInfo.appendChild(imgElement);

        createElement('h2', undefined, `Genre: ${genre.value}`, divElementInfo);
        createElement('h2', undefined, `Name: ${name.value}`, divElementInfo);
        createElement('h2', undefined, `Author: ${author.value}`, divElementInfo);
        createElement('h3', undefined, `Date: ${date.value}`, divElementInfo);

        let saveBtn = createElement('button', 'save-btn', 'Save song', undefined);
        let likeBtn = createElement('button', 'like-btn', 'Like song', undefined);
        let deleteBtn = createElement('button', 'delete-btn', 'Delete', undefined);

        divElementInfo.appendChild(saveBtn);
        divElementInfo.appendChild(likeBtn);
        divElementInfo.appendChild(deleteBtn);

        allHitsContainer.appendChild(divElementInfo);

        clearInput();

        likeBtn.addEventListener('click',onLike)
        function onLike(){
            likedSong++
            likes.textContent = `Total Likes: ${likedSong}`;
            likeBtn.disabled = true;
        }

        saveBtn.addEventListener('click',onSave);
        function onSave(){
            likeBtn.remove();
            saveBtn.remove();

            savedContainer.appendChild(divElementInfo);
        }

        deleteBtn.addEventListener('click',onDelete);
        function onDelete(e){
            let main = e.target.parentElement;
            main.remove();
        }
    }

    function clearInput() {
        genre.value = ''
        name.value = ''
        author.value = ''
        date.value = ''
    }

    function createElement(type, classType, text, parent) {
        let element = document.createElement(type)
        if (classType != undefined) {
            element.className = classType;
        }
        if (text != undefined) {
            element.textContent = text;
        }
        if (parent != undefined) {
            parent.appendChild(element);
            return;
        }
        return element;
    }
}