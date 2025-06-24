.PHONY: api-codegen

api-codegen:
	cd backend && swag init
	cd frontend && bun run openapi-ts
