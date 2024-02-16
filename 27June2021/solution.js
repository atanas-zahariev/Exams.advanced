window.addEventListener('load', solution);

function solution() {
  const fulName = document.getElementById("fname");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const address = document.getElementById("address");
  const code = document.getElementById("code");

  const infoPreview = document.getElementById('infoPreview');

  let editBtn = document.getElementById('editBTN');
  let continueBTN = document.getElementById("continueBTN");

  let submitBTN = document.getElementById("submitBTN");
  submitBTN.addEventListener('click', onSubmit)

  function onSubmit() {
    if (fulName.value == '' || email.value == '') {
      return;
    }

    createElement('li', `Full Name: ${fulName.value}`, infoPreview)
    createElement('li', `Email: ${email.value}`, infoPreview);
    createElement('li', `Phone Number: ${phone.value}`, infoPreview);
    createElement('li', `Address: ${address.value}`, infoPreview);
    createElement('li', `Postal Code: ${code.value}`, infoPreview);

    submitBTN.disabled = true;

    editBtn.disabled = false;
    continueBTN.disabled = false;


    let editfulName = fulName.value;
    let editemail = email.value;
    let editphone = phone.value;
    let editaddress = address.value;
    let editcode = code.value;

    clearInput()

    editBtn.addEventListener('click', onEdit)
    function onEdit() {
      fulName.value = editfulName;
      email.value = editemail;
      phone.value = editphone;
      address.value = editaddress;
      code.value = editcode;

      infoPreview.innerHTML = ''

      submitBTN.disabled = false;

      editBtn.disabled = true;
      continueBTN.disabled = true;
    }

    continueBTN.addEventListener('click',isFinish);
    function isFinish(){
      let blockDiv = document.getElementById("block");
      blockDiv.innerHTML = '';
      createElement('h3','Thank you for your reservation!',blockDiv)
    }
  }

  function createElement(type, text, parent) {
    let element = document.createElement(type);
    element.textContent = text;
    if (parent) {
      parent.appendChild(element);
      return;
    }
    return element;
  }

  function clearInput() {
    fulName.value = '';
    email.value = '';
    phone.value = '';
    address.value = '';
    code.value = '';

  }

}
