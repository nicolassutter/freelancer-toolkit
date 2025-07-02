import { useMutation } from "@tanstack/solid-query";
import { createFileRoute } from "@tanstack/solid-router";
import { userClient } from "~/client";
import { Button } from "~/components/buttons";
import { TextInput } from "~/components/inputs";
import { createForm } from "@tanstack/solid-form";
import { z } from "zod";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().nonempty("Password is required"),
  });

  const form = createForm(() => ({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      loginMutation.mutateAsync(value);
    },
  }));

  const loginMutation = useMutation(() => ({
    mutationFn: async ({ email, password }: z.infer<typeof formSchema>) => {
      return userClient.login({ email, password });
    },
  }));

  return (
    <main>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        class="max-w-xs mx-auto"
      >
        <form.Field
          name="email"
          children={(field) => {
            return (
              <TextInput
                label="E-mail"
                error={field().state.meta.errors[0]?.message}
                value={field().state.value}
                onChange={(value) => field().handleChange(value)}
              />
            );
          }}
        />

        <form.Field
          name="password"
          children={(field) => {
            return (
              <TextInput
                label="Password"
                type="password"
                error={field().state.meta.errors[0]?.message}
                value={field().state.value}
                onChange={(value) => field().handleChange(value)}
              />
            );
          }}
        />

        <Button type="submit" classes="btn-block btn-primary">
          Submit
        </Button>
      </form>
    </main>
  );
}
