let productData = [];
// DOM節點
const productList = document.querySelector('#productList');
const productCount = document.querySelector('#productCount');
const clearAll = document.querySelector('#clearAll');
const addProductBtn = document.querySelector('#addProduct');
// 新增產品

function addProduct() {
  const timeStamp = Math.floor(Date.now());
  const title = document.querySelector('#title');
  const originPrice = document.querySelector('#origin_price');
  const price = document.querySelector('#price');
  if (title.value === '' || originPrice.value === '' || price.value === '') {
    alert('請輸入完整資訊');
    return;
  }
  const item = {
    id: timeStamp,
    title: title.value.trim(),
    origin_price: parseInt(originPrice.value, 10),
    price: parseInt(price.value, 10)
  };
  productData.push(item);
  console.log(productData);
  render();
  title.value = '';
  originPrice.value = '';
  price.value = '';
}
addProductBtn.addEventListener('click', addProduct);
// document.getElementById('addProduct').addEventListener('click', (e) => {
//   const timeStamp = Math.floor(Date.now());
//   if (document.getElementById('title').value.trim() !== '') {
//     productData.push({
//       id: timeStamp,
//       title: document.getElementById('title').value.trim(),
//       origin_price:
//         parseInt(document.getElementById('origin_price').value) || 0,
//       price: parseInt(document.getElementById('price').value) || 0,
//       is_enabled: false
//     });
//     let str = '';
//     productData.forEach((item) => {
//       str += `
//       <tr>
//       <td>${item.title}</td>
//       <td width="120">
//         ${item.origin_price}
//       </td>
//       <td width="120">
//         ${item.price}
//       </td>
//       <td width="100">
//         <div class="form-check form-switch">
//           <input class="form-check-input" type="checkbox" id="${item.id}" ${
//   item.is_enabled ? 'checked' : ''
// } data-action="status" data-id="${item.id}">
//           <label class="form-check-label" for="${item.id}">${
//   item.is_enabled ? '啟用' : '未啟用'
// }</label>
//         </div>
//       </td>
//       <td width="120">
//         <button type="button" class="btn btn-sm btn-danger move" data-action="remove" data-id="${
//   item.id
// }"> 刪除 </button>
//       </td>
//     </tr>`;
//     });
//     document.getElementById('productList').innerHTML = str;
//     document.getElementById('productCount').textContent = productData.length;

//     document.getElementById('title').value = '';
//     document.getElementById('origin_price').value = '';
//     document.getElementById('price').value = '';
//   }
// });

// 刪除全部產品
function deleteAll() {
  productData = [];
  render();
}
clearAll.addEventListener('click', deleteAll);
// document.getElementById('clearAll').addEventListener('click', (e) => {
//   e.preventDefault();
//   productData = [];

//   let str = '';
//   productData.forEach((item) => {
//     str += `
//     <tr>
//       <td>${item.title}</td>
//       <td width="120">
//         ${item.origin_price}
//       </td>
//       <td width="120">
//         ${item.price}
//       </td>
//       <td width="100">
//         <div class="form-check form-switch">
//           <input class="form-check-input" type="checkbox" id="${item.id}" ${
//   item.is_enabled ? 'checked' : ''
// } data-action="status" data-id="${item.id}">
//           <label class="form-check-label" for="${item.id}">${
//   item.is_enabled ? '啟用' : '未啟用'
// }</label>
//         </div>
//       </td>
//       <td width="120">
//         <button type="button" class="btn btn-sm btn-danger move" data-action="remove" data-id="${
//   item.id
// }"> 刪除 </button>
//       </td>
//     </tr>`;
//   });
//   document.getElementById('productList').innerHTML = str;
//   document.getElementById('productCount').textContent = productData.length;
// });

// 刪除特定產品與切換啟用狀態
function deleteOneItem(e) {
  const { action } = e.target.dataset;
  const id = parseInt(e.target.dataset.id, 10);

  if (action === 'remove') {
    productData.forEach((item, index) => {
      if (id === item.id) {
        productData.splice(index, 1);
      }
    });
  } else if (action === 'status') {
    productData.forEach((item) => {
      if (id === item.id) {
        item.is_enabled = !item.is_enabled;
      }
    });
  }
  render();
}
productList.addEventListener('click', deleteOneItem);
// document.getElementById('productList').addEventListener('click', (e) => {
// const { action } = e.target.dataset;
// const { id } = e.target.dataset;
// if (action === 'remove') {
//   let newIndex = 0;
//   productData.forEach((item, key) => {
//     if (id === item.id) {
//       newIndex = key;
//     }
//   });
// productData.splice(newIndex, 1);
// } else if (action === 'status') {
//   productData.forEach((item) => {
//     if (id === item.id) {
//       item.is_enabled = !item.is_enabled;
//     }
//   });
// }
//   let str = '';
//   productData.forEach((item) => {
//     str += `
//     <tr>
//       <td>${item.title}</td>
//       <td width="120">
//         ${item.origin_price}
//       </td>
//       <td width="120">
//         ${item.price}
//       </td>
//       <td width="100">
//         <div class="form-check form-switch">
//           <input class="form-check-input" type="checkbox" id="${item.id}" ${
//   item.is_enabled ? 'checked' : ''
// } data-action="status" data-id="${item.id}">
//           <label class="form-check-label" for="${item.id}">${
//   item.is_enabled ? '啟用' : '未啟用'
// }</label>
//         </div>
//       </td>
//       <td width="120">
//         <button type="button" class="btn btn-sm btn-danger move" data-action="remove" data-id="${
//   item.id
// }"> 刪除 </button>
//       </td>
//     </tr>`;
//   });
//   document.getElementById('productList').innerHTML = str;
//   document.getElementById('productCount').textContent = productData.length;
// });

// 渲染畫面

function render() {
  let str = '';
  productData.forEach((item) => {
    str += `
      <tr>
    <td>${item.title}</td>
    <td width="120">
      ${item.origin_price}
    </td>
    <td width="120">
      ${item.price}
    </td>
    <td width="100">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="${item.id}" ${
  item.is_enabled ? 'checked' : ''
} data-action="status" data-id="${item.id}">
        <label class="form-check-label" data-action="status" for="${item.id}">${
  item.is_enabled ? '啟用' : '未啟用'
}</label>
      </div>
    </td>
    <td width="120">
      <button type="button" class="btn btn-sm btn-danger move" data-action="remove" data-id="${
  item.id
}"> 刪除 </button>
    </td>
  </tr>
      
      `;
  });
  productList.innerHTML = str;
  productCount.textContent = productData.length;
}

// 初始化
function init(params) {
  render();
}
init();
// let str = '';
// productData.forEach((item) => {
//   str += `
//   <tr>
//     <td>${item.title}</td>
//     <td width="120">
//       ${item.origin_price}
//     </td>
//     <td width="120">
//       ${item.price}
//     </td>
//     <td width="100">
//       <div class="form-check form-switch">
//         <input class="form-check-input" type="checkbox" id="${item.id}" ${
//   item.is_enabled ? 'checked' : ''
// } data-action="status" data-id="${item.id}">
//         <label class="form-check-label" data-action="status" for="${item.id}">${
//   item.is_enabled ? '啟用' : '未啟用'
// }</label>
//       </div>
//     </td>
//     <td width="120">
//       <button type="button" class="btn btn-sm btn-danger move" data-action="remove" data-id="${
//   item.id
// }"> 刪除 </button>
//     </td>
//   </tr>`;
// });
// document.getElementById('productList').innerHTML = str;
// document.getElementById('productCount').textContent = productData.length;
