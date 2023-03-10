import { IData, CarsType } from '../typescript/type';
import getCarSVG from './getCarSvg';

const getPageCars = (cars: CarsType) => {
  const allCars = cars.map((carObj) => {
    const { id, color, name } = carObj;
    if (typeof color !== 'string') throw new Error('color is not string');
    const car = `<div class="car" data-id="${id}">
        <div class="wrapper wrapper-buttons">
          <button class="car__btn-select">select</button>
          <button class="car__btn-remove">remove</button>
          <h3 class="car__model">${name}</h3>
        </div>
        <div class="wrapper wrapper-image">
          <button class="car__btn-start">A</button>
          <button class="car__btn-stop" disabled>B</button>
          ${getCarSVG(color, 64, 25, 'car__image')}
          <div class="car__flag">
          </div>
        </div>
      </div>`;
    return car;
  });
  return allCars.join('\n');
};

const formGarage = `<form action="#" method="#">
<div class="wrapper wrapper-color">
  <input type="text" id="name-create">
  <input type="color" name="color-create" id="color-create">
  <button id="create-car">create</button>
</div>
<div class="wrapper wrapper-color">
  <input type="text" id="name-update" disabled>
  <input type="color" name="color-update" id="color-update" disabled>
  <button id="update-car" disabled>update</button>
</div>
<div class="wrapper wrapper-buttons">
  <button id="race">race</button><button id="reset" disabled>reset</button><button id="generate-cars">Generate cars</button>
</div>
</form>`;

const getGarage = (data: IData): string => {
  const { currentPage, totalCount, cars } = data;
  if (!cars) throw new Error('cars is not exist');
  const garage = `
  ${formGarage}
  <h2>Garage(${totalCount})</h2>
  <h3> Page #${currentPage}</h3>
  <div class="modal" id="modal">
    <div class="modal__container">
      <div class=modal__title>Winner!!!</div>
      <div class="modal__text" id="modal__text"></div>
      <div class="modal__close" id="modal__close"></div>
    </div>
  </div>
  ${getPageCars(cars)}`;
  return garage;
};

export default getGarage;
