package controller

import (
	usersv1 "backend/gen/proto/users/v1"
	"backend/gen/proto/users/v1/usersv1connect"
	"errors"

	"backend/db"
	"context"
	"fmt"

	"connectrpc.com/connect"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/adaptor"
)

type UsersServer struct{}

func (s *UsersServer) CreateUser(
	ctx context.Context,
	req *connect.Request[usersv1.CreateUserRequest],
) (*connect.Response[usersv1.CreateUserResponse], error) {
	newUser := &db.User{
		Email: req.Msg.Email,
		Name:  req.Msg.Name,
	}

	result := db.DB.Create(newUser)

	if result.Error != nil {
		err := errors.New("Unable to create user")
		return nil, connect.NewError(connect.CodeUnknown, err)
	}

	response := connect.NewResponse(&usersv1.CreateUserResponse{
		Email: fmt.Sprintf("Hello, %s!", req.Msg.Email),
	})

	return response, nil
}

/*
	curl \
		 --header "Content-Type: application/json" \
		 --data '{"email": "test@email.com"}' \
		 http://localhost:1323/proto.users.v1.UserService/CreateUser
*/
func RegisterUsersService(app *fiber.App) {
	usersService := &UsersServer{}
	path, handler := usersv1connect.NewUserServiceHandler(usersService)
	app.Use(path, adaptor.HTTPHandler(handler))
}
