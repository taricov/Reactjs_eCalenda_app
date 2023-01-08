import {
  Box,
  Button,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { z } from "zod";

const loginSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Name should have at least 2 letters" }),
  password: z
    .string({ required_error: "Password is Required" })
    .min(8, { message: "Invalid Password" }),
});

//React useQuery() to authenticate then to authorize

const LoginPage = () => {
  const [visible, { toggle }] = useDisclosure(false);
  const loginForm = useForm({
    initialValues: {
      username: "",
      passowrd: "",
    },
    validate: zodResolver(loginSchema),
  });

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-skin-hue2 to-skin-hue0 dark:bg-black dark:from-black dark:to-slate-800 ">
      <div className="flex flex-col items-center justify-around rounded-lg shadow-lg overflow-hidden mx-auto w-1/2 h-1/2 bg-gradient-to-r from-skin-hue2 to-skin-hue0 dark:bg-black dark:from-black dark:to-slate-800 dark:shadow-slate-800">
        <Box className="flex flex-col items-center justify-center ">
          <Text className="font-bold text-4xl mt-5">Login</Text>
          <Text className="text-md ">Access to your business</Text>
        </Box>
        <form
          className="w-1/2"
          onSubmit={loginForm.onSubmit((values) => console.log(values))}
        >
          <Stack mx="auto w-full">
            <TextInput
              label="User Name"
              placeholder="Username or Email"
              className="w-full"
              {...loginForm.getInputProps("email")}
            />
            <PasswordInput
              placeholder="Your Password"
              className="w-full"
              label="Password"
              visible={visible}
              onVisibilityChange={toggle}
              {...loginForm.getInputProps("password")}
            />
          </Stack>
          <Group position="right" mt="md">
            <Button
              className="bg-primary-600 dark:bg-slate-800 shadow-sm dark:hover:bg-slate-700  hover:bg-primary-700 transition-all duration-trans text-white hover:text-white mt-5 dark:text-slate-300"
              type="submit"
            >
              Login
            </Button>
          </Group>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
