// Urls.js
const baseUrl = 'http://localhost:8080';
const urls = {
    login: {
        sendOtpNumber: `${baseUrl}/auth/otp/mobile`,
        sendOtpEmail: `${baseUrl}/auth/otp/email`,
        verifyOtpNumber: `${baseUrl}/auth/verifyOtp/mobile`,
        verifyOtpEmail: `${baseUrl}/auth/verifyOtp/email`,
        getDetails: `${baseUrl}/users/getdetails`,
    },
    admin: {
        login: `${baseUrl}/admin/login`,
        get: (id) => `${baseUrl}/admin/get/${id}`,
        getList: `${baseUrl}/admin/getList`,
        update: (id) => `${baseUrl}/admin/update/${id}`,
        delete: (id) => `${baseUrl}/admin/delete/${id}`,
    },
    student: {
        save: `${baseUrl}/student/save`,
        get: (id) => `${baseUrl}/student/get/${id}`,
        getList: `${baseUrl}/student/getList`,
        update: (id) => `${baseUrl}/student/update/${id}`,
        delete: (id) => `${baseUrl}/student/delete/${id}`,
    },
    trainer: {
        save: `${baseUrl}/trainer/save`,
        get: (id) => `${baseUrl}/trainer/get/${id}`,
        getList: `${baseUrl}/trainer/getList`,
        update: (id) => `${baseUrl}/trainer/update/${id}`,
        delete: (id) => `${baseUrl}/trainer/delete/${id}`,
    },
    contactUs: {
        save: `${baseUrl}/ContactUs/save`,
        get: (id) => `${baseUrl}/ContactUs/get/${id}`,
        getList: `${baseUrl}/ContactUs/getList`,
        update: (id) => `${baseUrl}/ContactUs/update/${id}`,
        delete: (id) => `${baseUrl}/ContactUs/delete/${id}`,
    },
    course: {
        save: `${baseUrl}/course/save`,
        get: (id) => `${baseUrl}/course/get/${id}`,
        getList: `${baseUrl}/course/getList`,
        update: (id) => `${baseUrl}/course/update/${id}`,
        delete: (id) => `${baseUrl}/course/delete/${id}`,
    },
    review: {
        save: `${baseUrl}/review/save`,
        get: (id) => `${baseUrl}/review/get/${id}`,
        getList: `${baseUrl}/review/getList`,
        update: (id) => `${baseUrl}/review/update/${id}`,
        delete: (id) => `${baseUrl}/review/delete/${id}`,
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
