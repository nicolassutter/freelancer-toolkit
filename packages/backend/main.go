package main

import (
	"backend/db"
	usersv1Service "backend/services/users/v1"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	db.InitDB()

	usersv1Service.RegisterToFiber(app)

	app.Listen(":1323")
}
