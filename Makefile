.PHONY: api-codegen

api-codegen:
	cd backend && swag init --parseDependency --parseInternal
	cd frontend && bun run openapi-ts
