package db

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() *gorm.DB {
	database, err := gorm.Open(sqlite.Open("main.sqlite"), &gorm.Config{})

	// migrate every db model
	MigrateModels(database)

	if err != nil {
		panic("failed to connect database")
	}

	DB = database

	return database
}
