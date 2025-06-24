package controller

import (
	"backend/models"
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

type createUserBody struct {
	Name  string `json:"name" validate:"required"`
	Email string `json:"email" validate:"required" format:"email"`
}

// @id createUser
// @Success 200 {object} models.User "User created successfully"
// @Failure 500 {string} string "Error creating user"
// @Param createUserBody body createUserBody true "User data"
// @Router /users [post]
// @Summary Create a new user
// @Accept  json
// @Produce json
func (c *Controller) CreateUser(r echo.Context) error {
	// Implementation for creating a user
	newUser := models.User{
		Name:  r.FormValue("name"),
		Email: r.FormValue("email"),
	}

	result := c.db.Create(&newUser)

	if result.Error != nil {
		// If there is an error, return a 500 Internal Server Error status code.
		return r.String(http.StatusInternalServerError, "Error creating user")
	}

	return r.JSON(http.StatusOK, &newUser)
}
