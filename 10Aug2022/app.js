window.addEventListener("load", solve);

function solve() {
  let firstName = document.getElementById("first-name");
  let lastName = document.getElementById("last-name");
  let age = document.getElementById("age");
  let gender = document.getElementById("genderSelect");
  let content = document.getElementById("task");
  let inProgres = document.getElementById("in-progress");
  let finish = document.getElementById("finished");
  let dishes = document.getElementById("progress-count");
  let clearBtn = document.getElementById("clear-btn")
  let dishesValue = Number(dishes.textContent);

  let submitBtn = document.getElementById("form-btn");
  submitBtn.addEventListener('click', submit);
  function submit() {
    if (
      firstName.value == ''
      || lastName.value == ''
      || age.value == ''
      || content.value == ''
    ) {
      return;
    }
    let liElementInfo = createElement('li', undefined, 'each-line');

    let article = createElement('article', undefined, undefined);

    let nameHead = createElement('h4', `${firstName.value} ${lastName.value}`, undefined);

    let genderAgeParagraf = createElement('p', `${gender.value}, ${age.value}`, undefined);

    let text = createElement('p', `Dish description: ${content.value}`, undefined);

    let editBtn = createElement('button', 'Edit', 'edit-btn');

    let completeBtn = createElement('button', 'Mark as complete', 'complete-btn');

    article.appendChild(nameHead);
    article.appendChild(genderAgeParagraf);
    article.appendChild(text);

    liElementInfo.appendChild(article);
    liElementInfo.appendChild(editBtn);
    liElementInfo.appendChild(completeBtn);

    inProgres.appendChild(liElementInfo);

    let editFirstName = firstName.value;
    let editLastname = lastName.value;
    let editAge = age.value;
    let editContent = content.value;

    firstName.value = '';
    lastName.value = '';
    age.value = '';
    content.value = '';
    dishesValue++;
    dishes.textContent = dishesValue;

    editBtn.addEventListener('click', onEdit);
    function onEdit() {
      firstName.value = editFirstName;
      lastName.value = editLastname;
      age.value = editAge;
      content.value = editContent;

      liElementInfo.remove()
      dishesValue--
      dishes.textContent = dishesValue;
    }

    completeBtn.addEventListener('click',isComplete);
    function isComplete(){
      editBtn.remove();
      completeBtn.remove();
      dishesValue--
      dishes.textContent = dishesValue;

      finish.appendChild(liElementInfo);
    }
    clearBtn.addEventListener('click',clearAll)
    function clearAll(){
      finish.innerHTML = ''
    }
  }
  function createElement(type, text, classType) {
    let newElement = document.createElement(type);
    if (text !== undefined) {
      newElement.textContent = text;
    }
    if (classType !== undefined) {
      newElement.className = classType;
    }
    return newElement;
  }
}
