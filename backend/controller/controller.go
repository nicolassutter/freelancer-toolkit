package controller

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

// Controller example
type Controller struct {
}

// NewController example
func NewController() *Controller {
	return &Controller{}
}

// @Produce json
// @Success 200 {string} string "Hello, World!"
// @Router / [get]
func (controller *Controller) Hello(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}
