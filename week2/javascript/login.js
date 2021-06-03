// DOM節點
const btn = document.querySelector('#js-btn');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
// API
const url = 'https://vue3-course-api.hexschool.io/';
const path = 'starlightselection';
btn.addEventListener('click', login);

function login() {
  if (username.value === '' || password.value === '') {
    alert('請輸入Email或Password');
    return;
  }
  const user = {
    username: username.value,
    password: password.value
  };

  axios.post(`${url}admin/signin`, user)
    .then((res) => {
      if (res.data.success) {
        const { expired, token } = res.data; // 解構語法
        document.cookie = `starlightToken=${token}; expires=${new Date(expired)}`;
        window.location = 'products.html'; // 跳轉到products.html頁面
      } else {
        alert(res.data.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
