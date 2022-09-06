// Подключение модуля express
var express = require('express');
// Создание объекта для модуля express
var app = express();
// Пример использования промежуточного ПО
app.use(function(req, res, next){
  console.log('Промежуточное ПО 1');
  next();
});
app.use(function(req, res, next){
  console.log('Промежуточное ПО 2');
  next();
});
app.use(function(req, res, next){
  console.log('Промежуточное ПО 3');
  console.log(req.method);
  console.log(req.url);
  console.log(req.headers);
  res.type('text/plain');
  res.status(200);
  res.send('Ответ сервера клиенту');
});
// Определение порта, который будет
// прослушивать запросы к приложению
console.log('Запущено приложение middleware.'+
' Наберите в баузере http://localhost:3000');
app.listen(3000);
