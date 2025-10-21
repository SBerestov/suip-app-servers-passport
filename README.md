# Inventory Management System 🏭

**Веб-приложение для учета материалов на складе**  
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/) 
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/) 
[![Flask](https://img.shields.io/badge/Flask-3.1.0-important)](https://flask.palletsprojects.com/) 
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-blue)](https://www.postgresql.org/) 
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-teal)](https://tailwindcss.com/)

<img src="main-page.png" alt="Превью приложения" width="600">

Демо на Railway - https://suip-app-servers-passport-production.up.railway.app/ (закончилась пробная подписка)

## О проекте
Система инвентаризации материалов для оптимизации учета на складе. Реализовано:
- Управление материалами: добавление, редактирование, удаление.
- Поиск по названию, категориям, количеству.
- Заведение новых материалов в интерактивном формате.

## 🛠 Технологии
**Бэкенд**:
- Python 3.10+
- Flask 3.1.0
- PostgreSQL (psycopg2)

**Фронтенд**:
- React
- TypeScript
- TailwindCSS

## 🚀 Запуск локально
1. **Клонировать репозиторий**:
   ```bash
   git clone https://github.com/SBerestov/suip-app-servers-passport.git
   cd suip-app-servers-passport

2. **Настроить виртуальное окружение**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate    # Windows

3. Установить зависимости
   ```bash
   pip install -r requirements.txt

4. Запустить приложение
   ```bash
   python run.app

5. В другом терминале перейти в frontend
    ```bash
    cd .\frontend\
    npm install
    npm run dev

6. Открыть приложение в браузере
    ```bash
    http://localhost:5173/

## 📸 Демонстрация работы
1. Гамбургер-меню и вывод записей из таблиц
   
![Гамбургер-меню и вывод записей из таблиц](https://github.com/SBerestov/suip-app-servers-passport/blob/main/blob/assets/gifs/01.gif)

2. Добавление нового материала
   
![Добавление нового материала](https://github.com/SBerestov/suip-app-servers-passport/blob/main/blob/assets/gifs/02.gif)

3. Форма дополнительной проверки после заведения данных
   
![Форма дополнительной проверки после заведения данных](https://github.com/SBerestov/suip-app-servers-passport/blob/main/blob/assets/gifs/03.gif)

4. Просмотр данных записи
   
![Просмотр данных записи](https://github.com/SBerestov/suip-app-servers-passport/blob/main/blob/assets/gifs/04.gif)

5. Редактирование текущей записи
    
![Редактирование текущей записи](https://github.com/SBerestov/suip-app-servers-passport/blob/main/blob/assets/gifs/05.gif)

6. Уадление записи
    
![Уадление записи](https://github.com/SBerestov/suip-app-servers-passport/blob/main/blob/assets/gifs/06.gif)

7. Поиск
    
![Поиск](https://github.com/SBerestov/suip-app-servers-passport/blob/main/blob/assets/gifs/07.gif)
