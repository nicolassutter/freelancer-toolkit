.PHONY: api-codegen deps

api-codegen:
	cd packages/backend && buf generate
	cd packages/backend && bun buf generate --template buf.gen.frontend.yaml

deps:
	bun install
	go install github.com/bufbuild/buf/cmd/buf@latest
	go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest
	go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
	go install connectrpc.com/connect/cmd/protoc-gen-connect-go@latest