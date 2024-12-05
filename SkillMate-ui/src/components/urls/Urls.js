// Urls.js

const urls = {
    user: {
        login: (mobile) => `http://localhost:8080/login/find-user/${mobile}`
    },
    admin: {
        save: 'http://localhost:8080/admin/save',
        get: (id) => `http://localhost:8080/admin/get/${id}`,
        getList: 'http://localhost:8080/admin/getList',
        update: (id) => `http://localhost:8080/admin/update/${id}`,
        delete: (id) => `http://localhost:8080/admin/delete/${id}`,
    },
    student: {
        save: 'http://localhost:8080/student/save',
        get: (id) => `http://localhost:8080/student/get/${id}`,
        getList: 'http://localhost:8080/student/getList',
        update: (id) => `http://localhost:8080/student/update/${id}`,
        delete: (id) => `http://localhost:8080/student/delete/${id}`,
    },
    trainer: {
        save: 'http://localhost:8080/trainer/save',
        get: (id) => `http://localhost:8080/trainer/get/${id}`,
        getList: 'http://localhost:8080/trainer/getList',
        update: (id) => `http://localhost:8080/trainer/update/${id}`,
        delete: (id) => `http://localhost:8080/trainer/delete/${id}`,
    },
    contactUs: {
        save: 'http://localhost:8080/ContactUs/save',
        get: (id) => `http://localhost:8080/ContactUs/get/${id}`,
        getList: 'http://localhost:8080/ContactUs/getList',
        update: (id) => `http://localhost:8080/ContactUs/update/${id}`,
        delete: (id) => `http://localhost:8080/ContactUs/delete/${id}`,
    },
    course: {
        save: 'http://localhost:8080/course/save',
        get: (id) => `http://localhost:8080/course/get/${id}`,
        getList: 'http://localhost:8080/course/getList',
        update: (id) => `http://localhost:8080/course/update/${id}`,
        delete: (id) => `http://localhost:8080/course/delete/${id}`,
    },
    review: {
        save: 'http://localhost:8080/review/save',
        get: (id) => `http://localhost:8080/review/get/${id}`,
        getList: 'http://localhost:8080/review/getList',
        update: (id) => `http://localhost:8080/review/update/${id}`,
        delete: (id) => `http://localhost:8080/review/delete/${id}`,
    },
};

export default urls;



// import urls from './Urls';

// // For example, to use the admin save URL
// console.log(urls.admin.save);

// // To get a dynamic URL, like the student get by id
// const studentId = 123;
// console.log(urls.student.get(studentId));

// // To log a dynamic URL for login with a specific mobile number
// const mobile = '1234567890';
// console.log(urls.user.login(mobile));
