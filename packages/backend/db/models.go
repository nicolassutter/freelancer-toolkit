package db

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name               string              `json:"name"`
	Email              string              `json:"email"`
	DailyRevenueTables []DailyRevenueTable `json:"dailyRevenueTables"`
}

type Tax struct {
	gorm.Model
	Name                string  `json:"name"`
	Amount              float64 `json:"amount"`
	DailyRevenueTableID uint    `json:"dailyRevenueTableId"`
}

type DatasetEntry struct {
	gorm.Model
	Status              string `json:"status"`
	Date                string `json:"date"`
	DailyRevenueTableID uint   `json:"dailyRevenueTableId"`
}

type DailyRevenueTable struct {
	gorm.Model
	DailyRevenue float64        `json:"dailyRevenue"`
	Currency     string         `json:"currency"`
	Taxes        []Tax          `json:"taxes"`
	Dataset      []DatasetEntry `json:"dataset"`
	UserID       uint           `json:"userId"`
}

func MigrateModels(db *gorm.DB) error {
	models := []any{
		&User{},
		&Tax{},
		&DatasetEntry{},
		&DailyRevenueTable{},
	}

	for _, model := range models {
		db.AutoMigrate(model)
	}

	return nil
}
