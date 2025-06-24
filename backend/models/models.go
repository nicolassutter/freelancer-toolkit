package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name  string `json:"name"`
	Email string `json:"email"`
}

func MigrateModels(db *gorm.DB) error {
	return db.AutoMigrate(&User{})
}
