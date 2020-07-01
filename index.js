const express = require("express") // подключили express
const mongoose = require("mongoose") // подключаем пакет mongoose
const path = require("path")
const exphbs = require("express-handlebars")
const todoRoutes = require("./routes/todos") // подключаем фаел роутер


const PORT = process.env.PORT || 3000 // создаем порт
const app = express() // создаем объект приложения
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
})

app.engine("hbs", hbs.engine) // регистрируем название движка по ключу hbs
app.set("view engine", "hbs") // теперь можем пользоватся движком
app.set("views", "views") // регистрируем папку где хронятся наши файлы

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.use(todoRoutes) // регистрируем роутер


async function start(){   // создаем асинхронную функцию
    try {
        await mongoose.connect("mongodb+srv://denis:12345@cluster0-mniif.mongodb.net/todos",{
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {                    // обращаемся к переменной app
            console.log("Server has been started")
        })
    } catch (e) {
        console.log(e)
    }
}

start()


