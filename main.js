var listCourseBlock = document.querySelector('#list-courses');
var courseAPI = 'http://localhost:3000/course';

// ======== gọi hàm chính để chạy code ========
function start() {
  getCourses(renderCourses);
  handleCreateForm();
  handleDeleteCourse()
  handleUpdateCourse();
};
start();

// ======== thêm khóa học ===================
// lấy ra khóa học từ db bằng fetch 
function getCourses(callback) {
  fetch(courseAPI)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
};
// render khóa học
function renderCourses(courses) {
  let listCoursesBlock = document.querySelector('#list-courses');
  let htmls = courses.map(function (course) {
    return `<li class="courses">
      <p>id khóa học: ${course.id}</p>
      <h5>${course.name}</h5>
      <p>${course.description}</p>
    </li>`
  })
  listCoursesBlock.innerHTML = htmls.join('');
}
// hàm tạo khóa học, callback để chạy hàm render courses
function createCourse(data, callback) {
  // options bắt buộc phải có 
  let options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    // khi cần thêm, sửa thì dùng dòng này
    body: JSON.stringify(data)
  }
  fetch(courseAPI, options)
    .then(function (response) {
      response.json(); // vì then tiếp theo không cần dùng đến khóa học vừa tạo nên k return
    })
    .then(callback); // callback ở đây sẽ dùng để chạy hàm render, để tránh khó hiểu nên không viết thẳng hàm render vào đây
}
// hàm xử lí tạo một khóa học mới
function handleCreateForm() {
  // bắt sự kiện click vào nút tạo
  let createButton = document.querySelector('#create');
  // thực thi mã này khi nút tạo được click
  createButton.onclick = function () {
    // lấy name, description từ form vừa tạo
    let name = document.querySelector('input[name="name"]').value;
    let description = document.querySelector('input[name="description"]').value;
    // tạo ra một obj cấu trúc formData như dưới
    let formData = {
      name: name,
      description: description
    }
    // gọi hàm tạo để POST formData lên db, và render lại courses
    createCourse(formData, function () {
      getCourses(renderCourses);
    });
  };
}
// ========= xóa một khóa học ==========================
// hàm xử lí xóa một khóa học bằng id xóa khóa học
function handleDeleteCourse() {
  // Bắt sự kiện click vào nút xóa
  let deleteButton = document.querySelector('#delete');
  // Thực thi mã này khi nút xóa được click
  deleteButton.onclick = function () {
    // Lấy ra id khóa học cần xóa từ input
    let id = document.querySelector('input[name="delete-id"]').value;
    // Sau khi có id, tiến hành xóa khóa học
    let options = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      }
    }
    fetch(courseAPI + '/' + id, options)
      .then(function () {
        // Sau khi xóa thành công, làm mới danh sách khóa học
        getCourses(renderCourses);
      });
  }
}
// ================= sửa một khóa học ===================
// xử lí sửa khóa học bằng cách PUT lên db
function handleUpdateCourse() {
  // bắt sự kiện click nút sửa
  let updateButton = document.querySelector('#update');
  updateButton.onclick = function () {
    let name = document.querySelector('input[name="update-name"]').value;
    let description = document.querySelector('input[name="update-description"]').value;
    let id = document.querySelector('input[name="update-id"]').value;
    let formData = {
      name: name,
      description: description
    }
    updateCourse(id, formData);
  };
}
// hàm sửa sửa khóa học 
function updateCourse(id, data) {
  let options = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }
  // thực hiện PUT form lên db 
  fetch(courseAPI + '/' + id, options)
    .then(function () {
      getCourses(renderCourses);
    })
}



