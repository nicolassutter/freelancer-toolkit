package db

import (
	"backend/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("main.sqlite"), &gorm.Config{})

	// migrate every db model
	models.MigrateModels(db)

	if err != nil {
		panic("failed to connect database")
	}

	DB = db

	return db
}
