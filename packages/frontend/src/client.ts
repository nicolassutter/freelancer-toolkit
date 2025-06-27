import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { UserService } from "@freelancer-toolkit/backend/sdk/users/v1/users_pb";

// The transport defines what type of endpoint we're hitting.
// In our example we'll be communicating with a Connect endpoint.
// If your endpoint only supports gRPC-web, make sure to use
// `createGrpcWebTransport` instead.
const transport = createConnectTransport({
  baseUrl: "http://localhost:1323",
});

// Here we make the client itself, combining the service
// definition with the transport.
export const userClient = createClient(UserService, transport);
