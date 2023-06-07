const username = document.getElementById('username');
const password = document.getElementById('password');
const nomeTestemunha02 = document.getElementById('nomeTestemunha02');
const cpfTestemunha = document.getElementById('cpfTestemunha');


form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (checkInputs() == 1) {
        document.querySelector('.content').style.display = "block";
        document.querySelector('.box').style.display = "none";
    }
})



function checkInputs() {
    const usernameValue = username.value;
    const passwordValue = password.value;

    if (usernameValue == '') {
        setErrorFor(username, 'O usuário é obrigatório.');
    } else if (usernameValue == 'comercial09.frigoeng@gmail.com') {
        setSuccesFor(username);
        if (passwordValue == '') {
            setErrorFor(password, 'A senha é obrigatória.');
        } else if (passwordValue != "IGOR_COMERCIAL09") {
            setErrorFor(password,
                `Senha incorreta`);
        } else {
            setSuccesFor(password);
            return 1;
        }
    } else if (usernameValue == 'comercial08.frigoeng@gmail.com') {
        setSuccesFor(username);
        if (passwordValue == '') {
            setErrorFor(password, 'A senha é obrigatória');
        } else if (passwordValue != "ANA_COMERCIAL08") {
            setErrorFor(password,
                `Senha incorreta`);
        } else {
            setSuccesFor(password);
            return 1;
        }
    } else if (usernameValue == 'comercial07.frigoeng@gmail.com') {
        setSuccesFor(username);
        if (passwordValue == '') {
            setErrorFor(password, 'A senha é obrigatória');
        } else if (passwordValue != "MARCIO_COMERCIAL07") {
            setErrorFor(password,
                `Senha incorreta`);
        } else {
            nomeTestemunha02.value = 'MARCIO SILVESTRI';
            cpfTestemunha.value = '061.549.959-70';
            setSuccesFor(password);
            return 1;
        }
    }
    else if (usernameValue == 'comercial06.frigoeng@gmail.com') {
        setSuccesFor(username);
        if (passwordValue == '') {
            setErrorFor(password, 'A senha é obrigatória');
        } else if (passwordValue != "MARI_COMERCIAL06") {
            setErrorFor(password,
                `Senha incorreta`);
        } else {
            nomeTestemunha02.value = 'MARILENE RAUBER';
            cpfTestemunha.value = '047.882.029-13';            
            setSuccesFor(password);
            return 1;
        }
    }
    else if (usernameValue == 'comercial04.frigoeng@gmail.com') {
        setSuccesFor(username);
        if (passwordValue == '') {
            setErrorFor(password, 'A senha é obrigatória');
        } else if (passwordValue != "CRIS_COMERCIAL04") {
            setErrorFor(password,
                `Senha incorreta`);
        } else {
            setSuccesFor(password);
            return 1;
        }
    } else if (usernameValue == 'admin') {
        setSuccesFor(username);
        if (passwordValue == '') {
            setErrorFor(password, 'A senha é obrigatória');
        } else if (passwordValue != "Master_@7874") {
            setErrorFor(password, `Senha incorreta`);
        } else {
            setSuccesFor(password);
            document.querySelector('.relatorio').style.display = "block";
            return 1;
        }
    } else {
        setErrorFor(username, 'Usuário incorreto.');
    }

    if (passwordValue == '') {
        setErrorFor(password, 'A senha é obrigatória.');
    }

    return 0;
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = message;

    formControl.className = 'form_control error';
}


function setSuccesFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form_control success'
}

const icon_passaword = document.querySelector('.icon_passaword');
const icon_passawordConfirmation = document.querySelector('.icon_passawordConfirmation');

icon_passaword.addEventListener('click', () => {
    if (password.type === 'password') {
        password.type = 'text';
        icon_passaword.classList.add('uil-eye-slash');
        icon_passaword.classList.remove('uil-eye');
    } else {
        password.type = 'password';
        icon_passaword.classList.remove('uil-eye-slash');
        icon_passaword.classList.add('uil-eye');
    }
})

