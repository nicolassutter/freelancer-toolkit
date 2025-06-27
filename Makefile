.PHONY: api-codegen

api-codegen:
	cd packages/backend && buf generate
	cd packages/backend && bun buf generate --template buf.gen.frontend.yaml
