(function () {  
  let messages = [];
  const formAddProduct = document.getElementById('form-addProduct');
  const inputTitle = document.getElementById('input-title');
  const inputDescription = document.getElementById('input-description');
  const inputPrice = document.getElementById('input-price');
  const inputCategory = document.getElementById('input-category');
  const inputCode = document.getElementById('input-code');
  const inputStock = document.getElementById('input-stock');
  const showMessage = document.getElementById('show-message');

  const formDeleteProduct = document.getElementById('form-deleteProduct');
  const inputId = document.getElementById('input-id');


  const socket = io();

  formAddProduct.addEventListener('submit',(e)=>{
    e.preventDefault()
    newProduct = {
      title: inputTitle.value,
      description: inputDescription.value,
      price: inputPrice.value,
      category: inputCategory.value,
      code: inputCode.value,
      stock: inputStock.value
    }
    socket.emit('addProduct', newProduct)

  })

  formDeleteProduct.addEventListener('submit',(e)=>{
    e.preventDefault()
    let id= inputId.value

    socket.emit('deleteProducts', id)
  })

  function updateMessages(products = []) {
    showMessage.innerText = '';
    products.forEach((product) => {
      const item = document.createElement('li');
      item.innerText = `id : ${product.id}
      title : ${product.title}
      price : ${product.price}
      stock : ${product.stock}
      code : ${product.code}
      
      `;
      showMessage.appendChild(item);
    })
  }

  socket.on('connect', () => {
    console.log('Conectados al servidor');
  });

  socket.on('start', (data) => {
    products = data;
    updateMessages(products);
  });

})();