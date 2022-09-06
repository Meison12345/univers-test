// Основной файл проекта
// Для модулей, установленных с помощью npm, путь не указывается
// Node ищет эти модули в папке node_modules
// Для модулей, которые создаются в программе, указывается путь
// Подключение модуля path
var path = require('path');
// Подключение модуля express
var express = require('express');
// Подключение модуля показа значка сайта (favicon)
// Этот модуль должен быть инсталирован так: npm install serve-favicon
var favicon = require('serve-favicon');
// Подключение модуля index
var indexRouter = require('./routes/index');
// Подключение модуля photo
var photoRouter = require('./routes/photo');
const helmet = require('helmet');
// Создание объекта для модуля express
var app = express();
// Обеспечение clickjacking - защиты
// https://ru.wikipedia.org/wiki/Кликджекинг
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
// https://learn.javascript.ru/clickjacking
// OWASP ZAP найдет эту уязвимость, если закомментировать следующую строку
app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));
// Папка шаблонов
app.set('views', path.join(__dirname, 'views'));
// Шаблонизатор
app.set('view engine', 'ejs');
//Добавление уровней промежуточного программного обеспечения (app.use)
//Выдача отладочной информации о содержимом запроса
app.use(function(req, res, next){
  console.log(req.method); //метод запроса
  console.log(req.url); //url-адрес
  console.log(req.headers); //заголовки
  next();
});
//Обработка запроса на передачу браузеру значка сайта (favicon)
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// Определение папки для статических ресурсов сайта
app.use(express.static(path.join(__dirname, 'public')));
// Задание маршрута для главной страницы
app.use('/', indexRouter);
// Задание маршрутов для страниц photo
app.use('/photo', photoRouter);
// Пользовательская страница 404
app.use(function(req, res){
        res.type('text/plain');
        res.status(404);
        res.send('404 — Не найдено');
});
// Пользовательская страница 500
app.use(function(err, req, res, next){
        console.error(err.stack);
        res.type('text/plain');
        res.status(500);
        res.send('500 — Ошибка сервера');
});
// Определение порта, который будет прослушивать запросы к приложению
app.listen(3000);
