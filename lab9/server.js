const express = require('express');
const cors = require('cors');
const path = require('path');
const dataCard = require('./src/components/Icons/dataCard.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Налаштування CORS і JSON
app.use(cors());
app.use(express.json());

// Встановлюємо папку 'public' як статичну
app.use(express.static(path.join(__dirname, 'public')));


// API для отримання даних стадіонів з фільтрацією та сортуванням
app.get('/api/stadiums', (req, res) => {
    const { searchStadium, sortStadium, minPrice, maxPrice } = req.query;
    let filteredStadiums = dataCard;

    // Фільтрація за назвою стадіону
    if (searchStadium) {
        filteredStadiums = filteredStadiums.filter(stadium =>
            stadium.title.toLowerCase().includes(searchStadium.toLowerCase())
        );
    }

    // Фільтрація за діапазоном цін
    const min = parseInt(minPrice, 10) || 0;
    const max = parseInt(maxPrice, 10) || Infinity;
    filteredStadiums = filteredStadiums.filter(stadium =>
        stadium.price >= min && stadium.price <= max
    );

    // Сортування за критеріями
    if (sortStadium) {
        switch (sortStadium) {
            case '1': // Сортування за назвою
                filteredStadiums.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case '2': // Сортування за зростанням ціни
                filteredStadiums.sort((a, b) => a.price - b.price);
                break;
            case '3': // Сортування за спаданням ціни
                filteredStadiums.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }
    }

    res.json(filteredStadiums);
});

// Маршрут для кореневої сторінки
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    setTimeout(() => {
        res.send({ message: "Дані успішно завантажено" });
    }, 3000);
});
