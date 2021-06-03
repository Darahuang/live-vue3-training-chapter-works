const app = {
  data: {
    url: 'https://vue3-course-api.hexschool.io/',
    path: 'starlightselection',
    products: [],
    cookieToken: ''
  },
  getProducts() {
    axios.get(`${this.data.url}api/${this.data.path}/admin/products`)
      .then((res) => {
        if (res.data.success) {
          this.data.products = res.data.products;
          this.renderProducts(this.data.products);
        } else {
          alert('無法取得商品');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
  renderProducts(ary) {
    const productList = document.querySelector('#productList');
    const productCount = document.querySelector('#productCount');
    let str = '';
    ary.forEach((item) => {
      str += ` <tr>
      <td>${item.title}</td>
      <td width="120">
      $${item.origin_price}
      </td>
      <td width="120">
      $${item.price}
      </td>
      <td width="100">
        <span class="">${item.is_enabled ? '啟用' : '未啟用'}</span>
      </td>
      <td width="120">
        <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id="${item.id}"> 刪除 </button>
      </td>
    </tr>`;
    });
    productList.innerHTML = str;
    productCount.textContent = this.data.products.length;
    const deleteBtn = document.querySelectorAll('.deleteBtn');
    deleteBtn.forEach((item) => {
      item.addEventListener('click', this.deleteOneItem); // this指向該dom< button type="button">
    });
  },
  deleteOneItem(e) {
    const { id } = e.target.dataset;
    axios.delete(`${app.data.url}api/${app.data.path}/admin/product/${id}`)
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          app.getProducts();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  },
  created() {
    this.data.cookieToken = document.cookie.replace(/(?:(?:^|.*;\s*)starlightToken\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    if (this.data.cookieToken) {
      axios.defaults.headers.common.Authorization = this.data.cookieToken;
    } else {
      alert('請重新登入');
      window.location = 'index.html';
    }
    this.getProducts();
  }
};
app.created();
