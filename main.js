document.addEventListener('DOMContentLoaded', function() {
  const productTable = document.getElementById('productTable');

  // Load existing products from local storage
  loadProducts();

  // Add product function
  window.addProduct = function() {
    const name = document.getElementById('m1').value;
    const category = document.getElementById('m2').value;
    const price = document.getElementById('m3').value;
    const description = document.getElementById('m4').value;

    if (name && category && price && description) {
      const product = { id: Date.now(), name, category, price, description };
      addProductToTable(product);
      saveProduct(product);

      document.getElementById('m1').value = '';
      document.getElementById('m2').value = '';
      document.getElementById('m3').value = '';
      document.getElementById('m4').value = '';
    } else {
      alert('Please fill in all fields');
    }
  };

  function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach(addProductToTable);
  }

  function saveProduct(product) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
  }

  function addProductToTable(product) {
    const row = document.createElement('tr');
    row.dataset.id = product.id; // Save the id in a data attribute
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>${product.price}</td>
      <td>${product.description}</td>
      <td><button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button></td>
    `;
    productTable.appendChild(row);
  }

  window.deleteProduct = function(id) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = products.filter(product => product.id !== id);
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Remove product from the table
    const rows = productTable.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
      if (parseInt(rows[i].dataset.id) === id) {
        productTable.removeChild(rows[i]);
        break;
      }
    }
  };
});
