package dailyRevenueTablesv1Service

import (
	dailyRevenuTablesv1 "backend/gen/proto/dailyRevenueTables/v1"
	"backend/gen/proto/dailyRevenueTables/v1/dailyRevenuTablesv1connect"
	"context"

	"connectrpc.com/connect"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/adaptor"
)

type DailyRevenuTablesServer struct {
	dailyRevenuTablesv1connect.DailyRevenueTablesServiceHandler
}

var _ dailyRevenuTablesv1connect.DailyRevenueTablesServiceHandler = (*DailyRevenuTablesServer)(nil)

func (s *DailyRevenuTablesServer) CreateDailyRevenuTable(
	ctx context.Context,
	req *connect.Request[dailyRevenuTablesv1.DailyRevenueTable],
) (*connect.Response[dailyRevenuTablesv1.DailyRevenueTable], error) {
	response := connect.NewResponse(&dailyRevenuTablesv1.DailyRevenueTable{})
	return response, nil
}

func RegisterToFiber(app *fiber.App) {
	usersService := &DailyRevenuTablesServer{}
	path, handler := dailyRevenuTablesv1connect.NewDailyRevenueTablesServiceHandler(usersService)
	app.Use(path, adaptor.HTTPHandler(handler))
}
