import {
  Box,
  Button,
  Center,
  Container,
  Group,
  PasswordInput,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is Required" })
    .min(8, { message: "Invalid Password" }),
});

const LoginPage = () => {
  const [visible, { toggle }] = useDisclosure(false);
  const loginForm = useForm({
    initialValues: {
      email: "",
      passowrd: "",
    },
    validate: zodResolver(loginSchema),
  });

  return (
    <>
      <Container className="h-screen flex items-center justify-center">
        <Box w={"100%"}>
          <Center className="flex-col">
            <Text className="font-bold text-4xl mt-5">Login</Text>
            <Text className="text-md ">Access to your business</Text>
          </Center>
          <Space h={25} />
          <Stack align={"center"}>
            <form
              className="w-1/2"
              onSubmit={loginForm.onSubmit((values) => console.log(values))}
            >
              <Stack mx="auto w-full">
                <TextInput
                  placeholder="Email"
                  className="w-full"
                  {...loginForm.getInputProps("email")}
                />
                <PasswordInput
                  placeholder="Password"
                  visible={visible}
                  onVisibilityChange={toggle}
                  {...loginForm.getInputProps("password")}
                />
              </Stack>
              <Group position="right" mt="md">
                <Button
                  className="bg-app-color-500 hover:bg-app-color-600 transition duration-200"
                  type="submit"
                >
                  Login
                </Button>
              </Group>
            </form>
            <Group>
              <Text
                component="a"
                href="/register"
                className="underline hover:opacity-50 duration-200 transition"
                size={"sm"}
              >
                New User? Create Account
              </Text>
            </Group>
          </Stack>
        </Box>
      </Container>
    </>
  );
};
export default LoginPage;
