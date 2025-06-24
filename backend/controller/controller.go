package controller

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

// Controller example
type Controller struct {
	db *gorm.DB
}

// NewController example
func NewController(db *gorm.DB) *Controller {
	return &Controller{
		db,
	}
}

// @id getHelloWorld
// @Produce json
// @Success 200 {string} string "Hello, World!"
// @Router / [get]
func (c *Controller) Hello(r echo.Context) error {
	return r.String(http.StatusOK, "Hello, World!")
}
