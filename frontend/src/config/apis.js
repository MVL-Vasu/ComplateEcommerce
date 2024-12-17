const localpath = 'http://localhost:3001/'

const api_paths = {

     register: `${localpath}signup`,
     login: `${localpath}login`,
     forgetpass: `${localpath}forgetpass`,
     otpverify: `${localpath}verify`,
     all_products: `${localpath}products/allproducts`,
     popularinwomen: `${localpath}products/popularinwomen`,
     newcollections: `${localpath}products/newcollections`,
     GetOtpTimer : `${localpath}GetOtpTimer`,
     UpdatePass : `${localpath}UpdatePass`,
     singleproduct : `${localpath}products`

}

export default api_paths;