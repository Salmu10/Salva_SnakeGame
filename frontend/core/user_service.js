
async function register_service(input_username, input_password){

    const register_call = await fetch("http://localhost:3000/api/user/", {
        method: 'POST',
        body: JSON.stringify({ input_username, input_password }),
        headers:{
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    const res_json = await register_call.json();
    if (res_json == 'Error') {
        alert("User already exists");
        document.getElementById('register_username').value = '';
        document.getElementById('pswd').value = '';
        document.getElementById('repeat-pswd').value = '';
    } else {
        localStorage.setItem('user_loged', JSON.stringify(input_username));
        window.location.href = './index.html';
    }
}

async function login_service(user_name, user_password) {
    const res = await fetch("http://localhost:3000/api/user/" + JSON.stringify(user_name) + "/" + JSON.stringify(user_password));
    const log_json = await res.json();
    if (log_json == "Error"){
        alert('This user not exist');
    }else{
        localStorage.setItem('user_loged', JSON.stringify(log_json.user));
        localStorage.setItem('user_image', JSON.stringify(log_json.image));
        window.location.href = './index.html'; 
    }
}

async function get_user_data() {
    const user_name = JSON.parse(localStorage.getItem("user_loged"));
    if (user_name != null) {
        const res = await fetch("http://localhost:3000/api/score/" + user_name);
        const res_json = await res.json();
        if (res_json == "Error") {
            console.log("res_json error");
            localStorage.removeItem('HighScore');
        } else {
            console.log(res_json);
            localStorage.setItem('HighScore', res_json);
        }
    } else {
        console.log("Not loged");
    }
}

get_user_data();