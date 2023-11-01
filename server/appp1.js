document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8000/login', true); //  URL сервера
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    var formData = new FormData(document.getElementById('loginForm'));
    var jsonData = {};
    for (var key of formData.keys()) {
        jsonData[key] = formData.get(key);
    }

    xhr.send(JSON.stringify(jsonData));

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Login attempt successfully recorded.');
            // Добавьте здесь код для обработки успешного входа, например, перенаправление на другую страницу
            window.location.href = 'https://www.onlinegdb.com/online_c_compiler#';
        } else {
            console.error('Error: ' + xhr.status);
            // Добавьте здесь код для обработки ошибки входа, например, отображение сообщения об ошибке
            alert('Ошибка входа. Попробуйте еще раз.');
        }
    };

    xhr.onerror = function() {
        console.error('An error occurred during the login attempt.');
    };
});
