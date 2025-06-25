package main

import (
	"backend/controller"
	"backend/db"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	db.InitDB()

	controller.RegisterUsersService(e)

	server := &http.Server{
		Addr:    ":1323",
		Handler: e,
	}

	if err := server.ListenAndServe(); err != http.ErrServerClosed {
		log.Fatal(err)
	}
}
