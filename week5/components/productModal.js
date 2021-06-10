export default {
  props: ['product'],
  data() {
    return {
      tempProduct: {},
      productModal: '',
      qty: 1
    };
  },
  template: `
    <div class="modal fade" ref="productModal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
             <div class="col-md-5">
               <img :src="tempProduct.imageUrl" class="w-100 h-100" alt="" />
             </div>
             <div class="col-md-7">
             <span class="badge bg-primary">{{tempProduct.category}}</span>
             <h3 class="h5 mb-2">行程名稱: {{tempProduct.title}}</h3>
             <p>行程描述" {{tempProduct.description}}</p>
             <p>行程內容: {{tempProduct.content}}</p>
             
             <span>原價: <del>{{dollarSignThousandth(tempProduct.origin_price)}}</del></span>
             <span class="h5 text-danger ms-5">特價: {{dollarSignThousandth(tempProduct.price)}}</span>
             <div class="input-group my-3 w-50">
                <button class="btn btn-outline-secondary" type="button" @click="num(qty-1)">-1</button>
                <input type="number" min="1" class="form-control text-center" placeholder="" aria-label="Example text with two button addons" v-model.number="qty">
                <button class="btn btn-outline-secondary" @click="num(qty+1)" type="button">+1</button>
                
            </div>
            <button class="btn btn-primary" @click="$emit('emit-cart', tempProduct.id, qty)">加入購物車</button>
             </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            
          </div>
        </div>
      </div>
    </div>
    `,
  methods: {
    openModal() {
      this.productModal.show();
    },
    closeModal() {
      this.productModal.hide();
    },
    dollarSignThousandth(dollar) {
      dollar += '';
      const parts = dollar.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return `$${parts.join('.')}`;
    },
    num(qty) {
      if (qty === 0) {
        alert('人數至少為1位');
        return;
      }
      this.qty = qty;
    }
  },
  mounted() {
    this.productModal = new bootstrap.Modal(this.$refs.productModal, {
      keyboard: false,
      backdrop: 'static'
    });
  },
  watch: {
    product() {
      this.tempProduct = this.product;
    }
  }
};
