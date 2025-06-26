package main

import (
	"backend/controller"
	"backend/db"
	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	db.InitDB()

	controller.RegisterUsersService(app)

	app.Listen(":1323")
}
