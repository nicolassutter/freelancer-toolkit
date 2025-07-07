package usersv1Service

import (
	usersv1 "backend/gen/proto/users/v1"
	"backend/gen/proto/users/v1/usersv1connect"

	"context"
	"fmt"

	"connectrpc.com/connect"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/adaptor"
)

type UsersServer struct {
	usersv1connect.UserServiceHandler
}

// Ensure that UsersServer implements the UserServiceHandler interface.
var _ usersv1connect.UserServiceHandler = (*UsersServer)(nil)

// func (s *UsersServer) CreateUser(
// 	ctx context.Context,
// 	req *connect.Request[usersv1.CreateUserRequest],
// ) (*connect.Response[usersv1.CreateUserResponse], error) {
// 	newUser := &db.User{
// 		Email: req.Msg.Email,
// 		Name:  req.Msg.Name,
// 	}

// 	result := db.DB.Create(newUser)

// 	if result.Error != nil {
// 		err := errors.New("Unable to create user")
// 		return nil, connect.NewError(connect.CodeUnknown, err)
// 	}

// 	response := connect.NewResponse(&usersv1.CreateUserResponse{
// 		Email: fmt.Sprintf("Hello, %s!", req.Msg.Email),
// 	})

// 	return response, nil
// }

func (s *UsersServer) Login(
	ctx context.Context,
	req *connect.Request[usersv1.LoginRequest],
) (*connect.Response[usersv1.LoginResponse], error) {
	response := connect.NewResponse(&usersv1.LoginResponse{
		Email: fmt.Sprintf("Hello, %s!", req.Msg.Email),
		Name:  "User name",
	})

	return response, nil
}

func RegisterToFiber(app *fiber.App) {
	usersService := &UsersServer{}
	path, handler := usersv1connect.NewUserServiceHandler(usersService)
	app.Use(path, adaptor.HTTPHandler(handler))
}
