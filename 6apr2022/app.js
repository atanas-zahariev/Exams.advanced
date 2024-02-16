window.addEventListener("load", solve);

function solve() {
  let title = document.getElementById("post-title");
  let categori = document.getElementById("post-category");
  let content = document.getElementById("post-content");

  let reviewList = document.getElementById("review-list");
  let publishedList = document.getElementById("published-list");


  document.getElementById("publish-btn").addEventListener('click', onPublish);
  function onPublish() {
    if (
      title.value == ''
      || categori.value == ''
      || content.value == ''
    ) { return }

    let post = createElement('li', 'rpost', undefined);

    let article = createElement('article', undefined, undefined);

    let titleValue = createElement('h4', undefined, title.value);
    let categoryValue = createElement('p', undefined,`Category: ${categori.value}`);
    let contentValue = createElement('p', undefined, `Content: ${content.value}`);

    let editBtn = createElement('button', 'action-btn edit', 'Edit');
    let approveBtn = createElement('button', 'action-btn approve', 'Approve');

    article.appendChild(titleValue);
    article.appendChild(categoryValue);
    article.appendChild(contentValue);

    post.appendChild(article);
    post.appendChild(editBtn);
    post.appendChild(approveBtn);

    reviewList.appendChild(post);

    let editTitle = title.value;
    let editCategory = categori.value;
    let editContent = content.value;

    title.value = '';
    categori.value = '';
    content.value = '';

    editBtn.addEventListener('click', onEdit);
    function onEdit() {
      title.value = editTitle;
      categori.value = editCategory;
      content.value = editContent;
      post.remove();
    }

    approveBtn.addEventListener('click',onApprove);
    function onApprove(){
      editBtn.remove();
      approveBtn.remove();
      publishedList.appendChild(post)
    }

    document.getElementById("clear-btn").addEventListener('click',onClear);
    function onClear(){
      post.remove();
    }

  }

  function createElement(type, classType, text) {
    let element = document.createElement(type);
    if (classType != undefined) {
      element.className = classType;
    } if (text !== undefined) {
      element.textContent = text;
    }
    return element;
  }
}

