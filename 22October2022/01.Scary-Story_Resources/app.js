window.addEventListener("load", solve);

function solve() {
  let firstName = document.getElementById("first-name");
  let lastName = document.getElementById("last-name");
  let age = document.getElementById("age");
  let storyTitle = document.getElementById("story-title");
  let genre = document.getElementById("genre");
  let textStory = document.getElementById("story");
  let previewList = document.getElementById("preview-list")

  let publihsBtn = document.getElementById("form-btn");
  publihsBtn.addEventListener('click', onPublish)
  function onPublish(e) {
    if (
      firstName.value == ''
      || lastName.value == ''
      || age.value == ''
      || storyTitle.value == ''
      || textStory.value == ''
    ) {
      return;
    }

    let liElementInfo = createElement('li',undefined,'story-info');

    let articleElementInfo = createElement('article',undefined,undefined);

    let fullName = createElement('h4',`Name: ${firstName.value} ${lastName.value}`,undefined);

    let ageParagraf = createElement('p',`Age: ${age.value}`,undefined);

    let titleParagraf = createElement('p',`Title: ${storyTitle.value}`,undefined);

    let genreParagraf = createElement('p',`Genre: ${genre.value}`,undefined);

    let textParagraf = createElement('p',`${textStory.value}`);
    
    let saveBtn = createElement('button',`Save Story`,'save-btn');
    saveBtn.addEventListener('click',onSave)

    let editBtn = createElement('button',`Edit Story`,'edit-btn');
    editBtn.addEventListener('click',onEdit);

    let deleteBtn = createElement('button',`Delete Story`,'delete-btn');
    deleteBtn.addEventListener('click',onDelete);

    articleElementInfo.appendChild(fullName);
    articleElementInfo.appendChild(ageParagraf);
    articleElementInfo.appendChild(titleParagraf);
    articleElementInfo.appendChild(genreParagraf);
    articleElementInfo.appendChild(textParagraf);

    liElementInfo.appendChild(articleElementInfo);
    liElementInfo.appendChild(saveBtn);
    liElementInfo.appendChild(editBtn);
    liElementInfo.appendChild(deleteBtn);

    previewList.appendChild(liElementInfo);
   
    let editFirstName = firstName.value;
    let editLastname = lastName.value;
    let editAge = age.value;
    let editStoryTitle = storyTitle.value;
    let editTextStory = textStory.value;

    firstName.value = '';
    lastName.value = '';
    age.value = '';
    storyTitle.value = '';
    textStory.value = '';

    publihsBtn.disabled = true;

    function onSave(){
      let mainDiv = document.getElementById("main");
      mainDiv.innerHTML = '';
      let messege = createElement('h1',"Your scary story is saved!",undefined);
      mainDiv.appendChild(messege)
    }
    function onEdit(){
      firstName.value = editFirstName;
      lastName.value = editLastname;
      age.value = editAge;
      storyTitle.value = editStoryTitle;
      textStory.value = editTextStory;
      
      publihsBtn.disabled = false;

      liElementInfo.remove()

    }
    function onDelete(){
      liElementInfo.remove()
      publihsBtn.disabled = false;
    }

    function createElement(type,text,classType){
      let newElement = document.createElement(type);
      if(text !== undefined){
        newElement.textContent = text;
      }
      if(classType !== undefined){
        newElement.className = classType;
      }
      return newElement;
    }
  }
}

