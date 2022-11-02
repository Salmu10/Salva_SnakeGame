function register() {
    let user_name = document.getElementById('register_username').value;
    let user_password = document.getElementById('pswd').value;
    let repeat_password = document.getElementById('repeat-pswd').value;
    if (user_password == repeat_password) {
        if (user_name == '' || repeat_password == '' || user_password == '') {
            alert("Camps can't be void");
        } else {
            console.log(user_name);
            register_service(user_name, user_password);
        }
    } else {
        alert("Passwords don't match");
    }
}

function login() {
    let user_name = document.getElementById('username').value;
    let user_password = document.getElementById('password').value;
    login_service(user_name, user_password);
}

function log_out() {
    localStorage.removeItem('user_loged');
    window.location.href = './index.html';
}

function login_btn() {
    window.location.href = './login.html';
}
