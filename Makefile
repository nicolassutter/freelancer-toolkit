.PHONY: api-codegen

api-codegen:
	cd backend && buf generate
	cd backend && pnpm buf generate --template buf.gen.frontend.yaml
