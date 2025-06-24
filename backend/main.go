package main

import (
	"backend/controller"

	_ "backend/docs"

	"github.com/labstack/echo/v4"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// @title Freelancer Toolkit API
// @version 0.0.1
func main() {
	e := echo.New()

	db, err := gorm.Open(sqlite.Open("main.sqlite"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	c := controller.NewController(db)

	// Migrate the schema

	e.GET("/", c.Hello)
	e.Logger.Fatal(e.Start(":1323"))
}
