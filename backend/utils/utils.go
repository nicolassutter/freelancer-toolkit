package utils

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func RegisterHanderOnPath(e *echo.Echo, path string, handler http.Handler) {
	g := e.Group(path)

	g.Any(
		"*",
		func(c echo.Context) error {
			// Use the provided handler to serve the request
			handler.ServeHTTP(c.Response().Writer, c.Request())
			return nil
		},
	)
}
