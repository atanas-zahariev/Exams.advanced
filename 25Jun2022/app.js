window.addEventListener("load", solve);

function solve() {
  let makeElement = document.getElementById('make');
  let model = document.getElementById('model');
  let productionYear = document.getElementById("year");
  let fuelType = document.getElementById('fuel');
  let cost = document.getElementById("original-cost");
  let price = document.getElementById("selling-price");
  let form = document.getElementById("table-body");
  let carList = document.getElementById("cars-list");
  let profit = document.getElementById("profit");
  let totalProfit = 0;

  let publishBtn = document.getElementById("publish");
  publishBtn.addEventListener('click', onPublish);
  function onPublish(e) {
    e.preventDefault();

    if (
         makeElement.value == ''
      || model.value == ''
      || productionYear.value == ''
      || fuelType.value == ''
      || cost.value == ''
      || price.value == ''
      || Number(cost.value) > Number(price.value)
    ) {
      return;
    }

    let rowElementInfo = createElements('tr', undefined, 'row');

    let nameColom = createElements('td', `${makeElement.value}`, undefined);

    let modelColom = createElements('td', `${model.value}`, undefined);

    let yearColom = createElements('td', `${productionYear.value}`, undefined);

    let fuelTypeColom = createElements('td', `${fuelType.value}`, undefined);

    let costColom = createElements('td', `${cost.value}`, undefined);

    let priceColom = createElements('td', `${price.value}`, undefined);

    let buttonsColom = createElements('td', undefined, undefined);

    let editBtn = createElements('button', 'Edit', 'action-btn edit');

    let sellBtn = createElements('button', 'Sell', 'action-btn sell');

    buttonsColom.appendChild(editBtn);
    buttonsColom.appendChild(sellBtn);

    rowElementInfo.appendChild(nameColom);
    rowElementInfo.appendChild(modelColom);
    rowElementInfo.appendChild(yearColom);
    rowElementInfo.appendChild(fuelTypeColom);
    rowElementInfo.appendChild(costColom);
    rowElementInfo.appendChild(priceColom);
    rowElementInfo.appendChild(buttonsColom);

    form.appendChild(rowElementInfo);

    let editMakeElement = makeElement.value;
    let editModel = model.value;
    let editProductionYear = productionYear.value;
    let editFuelType = fuelType.value;
    let editCost = cost.value;
    let editPrice = price.value;

    makeElement.value = '';
    model.value = '';
    productionYear.value = '';
    fuelType.value = '';
    cost.value = '';
    price.value = '';

    editBtn.addEventListener('click', onEdit);
    function onEdit() {
      makeElement.value = editMakeElement;
      model.value = editModel;
      productionYear.value = editProductionYear;
      fuelType.value = editFuelType;
      cost.value = editCost;
      price.value = editPrice;

      rowElementInfo.remove();
    }

    sellBtn.addEventListener('click', onSell);
    function onSell() {
      let liElementInfo = createElements('li', undefined, 'each-list');
      let spanModel = createElements('span', `${editMakeElement} ${editModel}`, undefined);
      let spanYear = createElements('span', `${editProductionYear}`, undefined);
      let difference = Number(editPrice) - Number(editCost);
      totalProfit += difference;
      let spanDifference = createElements('span', difference, undefined);

      liElementInfo.appendChild(spanModel);
      liElementInfo.appendChild(spanYear);
      liElementInfo.appendChild(spanDifference);

      carList.appendChild(liElementInfo);

      rowElementInfo.remove();

      profit.textContent = Math.round(totalProfit).toFixed(2);
      productionYear.value = editProductionYear;
      fuelType.value = editFuelType;

    }
  }

  function createElements(type, text, classType) {
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