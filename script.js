// const { fetchItem } = require("./helpers/fetchItem");
// const { fetchProducts } = require("./helpers/fetchProducts");
// const item = require("./mocks/item");
const cartItem = '.cart__items';
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
const somarPrice = () => {
  const pegarItems = document.querySelectorAll('.cart__item');
  let soma = 0;
  pegarItems.forEach((item) => {
    const teste = item.innerText.split(' ');
    const teste2 = teste[teste.length - 1];
    const num = teste2.substring(1);
    soma += parseFloat(num);
  });
  const somaTotal = document.querySelector('.total-price');
  somaTotal.innerText = soma;
};

function cartItemClickListener(event) {
  event.target.remove();
  const itens = document.querySelector('.cart__items');
  localStorage.setItem('cartItems', itens.innerHTML);
  somarPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const funFetch = async () => {
  const pegarItem = document.querySelector('.items');
  const data = await fetchProducts('computador');
  const produtos = data.results;
  produtos.forEach((produto) => {
    const obj = {
      sku: produto.id,
      name: produto.title,
      image: produto.thumbnail,
    };
    pegarItem.appendChild(createProductItemElement(obj));
  });
};

const funItem = async (chulambes) => {
  const ItemCart = document.querySelector(cartItem);
  const itemSku = chulambes.target.parentNode.firstChild.innerText;
  const items = await fetchItem(itemSku);
    const obj = {
      sku: items.id,
      name: items.title,
      salePrice: items.price,
    };
    ItemCart.appendChild(createCartItemElement(obj));
    localStorage.setItem('cartItems', ItemCart.innerHTML);
    somarPrice();
};

const limpar = () => {
  const pegarItens = document.querySelector(cartItem);
  pegarItens.innerHTML = '';
  somarPrice();
  localStorage.setItem('pegarItens', pegarItens.innerHTML);
};

window.onload = () => {

 };

 window.onload = async () => { 
const carregar = document.querySelector('.loading');
 await funFetch();
 carregar.remove();
 const itensCart = document.querySelector(cartItem);
 itensCart.innerHTML = localStorage.getItem('cartItems');
 itensCart.addEventListener('click', cartItemClickListener);
 const pegarBotao = document.querySelectorAll('.item__add');
 pegarBotao.forEach((botao) => {
   botao.addEventListener('click', funItem);
 });
 const pegarEmpty = document.querySelector('.empty-cart');
 pegarEmpty.addEventListener('click', limpar);
};
