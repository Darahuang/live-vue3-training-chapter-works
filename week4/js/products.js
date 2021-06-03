import pagination from '../components/pagination.js';

let productModal = '';
let delProductModal = '';
const app = Vue.createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io',
      path: 'starlightselection',
      products: [],
      pagination: {},
      tempProduct: { // 修改產品或是新增產品的預存結構
        imagesUrl: []
      },
      isNew: false
    };
  },
  components: {
    pagination
  },
  methods: {
    getProducts(page = 1) {
      axios.get(`${this.url}/api/${this.path}/admin/products?page=${page}`)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          } else {
            alert(response.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openModal(status, item) {
      if (status === 'new') {
        this.tempProduct = {};
        this.isNew = true;
        productModal.show();
      } else if (status === 'edit') {
        this.tempProduct = { ...item };
        this.isNew = false;
        productModal.show();
      } else if (status === 'delete') {
        this.tempProduct = { ...item };
        delProductModal.show();
      }
    },
    updateProduct(product) {
      // 新增產品
      let url = `${this.url}/api/${this.path}/admin/product`;
      let httpMethod = 'post';
      // 編輯產品
      if (!this.isNew) {
        url = `${this.url}/api/${this.path}/admin/product/${product.id}`;
        httpMethod = 'put';
      }

      axios[httpMethod](url, { data: product })
        .then((res) => {
          if (res.data.success) {
            productModal.hide();
            alert(res.data.message);
            this.getProducts();
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteProduct(product) {
      axios.delete(`${this.url}/api/${this.path}/admin/product/${product.id}`)
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message);
            this.getProducts();
            delProductModal.hide();
          } else {
            alert(res.data.message);
            delProductModal.hide();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    uploadImage(img) {
      const formData = new FormData();
      formData.append('file-to-upload', img);
      axios.post(`${this.url}/api/${this.path}/admin/upload`, formData)
        .then((res) => {
          if (res.data.success) {
            this.tempProduct.imageUrl = res.data.imageUrl;
          }
        });
    }

  },
  created() {
    const cookieToken = document.cookie.replace(/(?:(?:^|.*;\s*)starlightToken\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    if (!cookieToken) {
      alert('請重新登入');
      window.location = 'index.html';
    }
    axios.defaults.headers.common.Authorization = cookieToken;
    this.getProducts();
  },
  mounted() {
    productModal = new bootstrap.Modal(document.querySelector('#productModal'), {
      backdrop: 'static',
      keyboard: false
    });
    delProductModal = new bootstrap.Modal(document.querySelector('#delProductModal'), {
      backdrop: 'static',
      keyboard: false
    });
  }
});

app.component('product-modal', {
  props: ['product'],
  data() {
    return {
      img: ''
    };
  },
  template: `
    <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
           aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 id="productModalLabel" class="modal-title">
                <span>新增產品</span>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-group">
                    <label for="imageUrl">主要圖片</label>
                    <input type="text" class="form-control"
                             placeholder="請輸入圖片連結" v-model="product.imageUrl">
                  </div>
                  <div class="form-group">
                   <label for="customFile">或上傳圖片</label>
                   <input type="file" id="customFile" class="form-control" ref="files"
                    @change="uploadFile"/>
                  </div>
                  <img class="img-fluid" :src="product.imageUrl" alt="" >
                  <div class="mb-1"> 多圖新增</div>
                  <div v-if="Array.isArray(product.imagesUrl)">
                    <div class="mb-1" v-for="(image, key) in product.imagesUrl" :key="key">
                      <div class="form-group">
                        <label for="imageUrl">圖片網址</label>
                        <input type="text" class="form-control" v-model="product.imagesUrl[key]" placeholder="請輸入圖片連結">
                      </div>
                      <img :src="image" class="img-fluid">
                    </div>                 
                  <div v-if="!product.imagesUrl.length || product.imagesUrl[product.imagesUrl.length-1]" >
                    <button class="btn btn-outline-primary btn-sm d-block w-100" @click="product.imagesUrl.push('')">
                      新增圖片
                    </button>
                  </div>
                  <div v-else>
                    <button class="btn btn-outline-danger btn-sm d-block w-100" @click="product.imagesUrl.pop()">
                      刪除圖片
                    </button>
                  </div>
                </div>
                <div v-else>
                  <button class="btn btn-outline-primary btn-sm d-block w-100" @click="addImages">
                    新增圖片
                  </button>
                </div>
                </div>
                <div class="col-sm-8">
                  <div class="form-group">
                    <label for="title">標題</label>
                    <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="product.title">
                  </div>

                  <div class="row">
                    <div class="form-group col-md-6">
                      <label for="category">分類</label>
                      <input id="category" type="text" class="form-control"
                             placeholder="請輸入分類" v-model="product.category">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">單位</label>
                      <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="product.unit">
                    </div>
                  </div>

                  <div class="row">
                    <div class="form-group col-md-6">
                      <label for="origin_price">原價</label>
                      <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model.number="product.origin_price">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">售價</label>
                      <input id="price" type="number" min="0" class="form-control"
                             placeholder="請輸入售價" v-model.number="product.price">
                    </div>
                  </div>
                  <hr>

                  <div class="form-group">
                    <label for="description">產品描述</label>
                    <textarea id="description" type="text" class="form-control"
                              placeholder="請輸入產品描述" v-model="product.description"> 
                    </textarea>
                  </div>
                  <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea id="content" type="text" class="form-control"
                              placeholder="請輸入說明內容" v-model="product.content">
                    </textarea>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input id="is_enabled" class="form-check-input" type="checkbox"
                             :true-value="1" :false-value="0" v-model="product.is_enabled">
                      <label class="form-check-label" for="is_enabled">是否啟用</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
              </button>
              <button type="button" class="btn btn-primary" @click="updateProduct">
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
    `,
  methods: {
    updateProduct() {
      this.$emit('emit-product', this.product);
    },
    addImages() {
      this.product.imagesUrl = [];
      this.product.imagesUrl.push('');
    },
    uploadFile() {
      this.$emit('emit-image', this.$refs.files.files[0]);
    }
  }

});

app.component('delete-modal', {
  props: ['delProduct'],
  template: `
    <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
           aria-labelledby="delProductModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 id="delProductModalLabel" class="modal-title">
                <span>刪除產品</span>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              是否刪除
              <strong class="text-danger">{{delProduct.title}}</strong> (刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
              </button>
              <button type="button" class="btn btn-danger" @click="deleteProduct">
                確認刪除
              </button>
            </div>
          </div>
        </div>
      </div>`,
  methods: {
    deleteProduct() {
      this.$emit('emit-delete', this.delProduct);
    }
  }
});

app.mount('#app');
