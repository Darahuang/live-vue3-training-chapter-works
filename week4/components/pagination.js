export default {
  props: ['page'],
  template: `
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center mt-5">
        <li class="page-item" :class="{'disabled': !page.has_pre}">
          <a class="page-link" href="#" @click="changePage(page.current_page-1)">Previous</a>
        </li>
        <li class="page-item" v-for="(item,key) in page.total_pages" :key="key"
          :class="{'active': item === page.current_page}">
          <a class="page-link"  href="#" @click="changePage(item)">{{item}}</a>
        </li>
        <li class="page-item" :class="{'disabled': !page.has_next}">
          <a class="page-link" href="#" @click="changePage(page.current_page+1)">Next</a>
        </li>
    </ul>
</nav>
    
    `,
  methods: {
    changePage(page) {
      this.$emit('emit-page', page);
    }
  }
};
