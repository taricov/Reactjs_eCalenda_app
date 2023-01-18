import {
  Box,
  Button,
  Checkbox,
  Container,
  Group,
  PasswordInput,
  Select,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { MantinePassowrdInput } from "../components/MantinePasswordInput";

const registrationSchema = z.object({
  name: z.string().min(2, { message: "Name should have at least 2 letters" }),
  bizName: z
    .string()
    .min(2, { message: "Business name should have at least 2 letters" }),
  email: z
    .string({ required_error: "Email is Required" })
    .email({ message: "Invalid Email" }),
  subdomain: z
    .string({ required_error: "Domain name is Required" })
    .min(5, { message: "Your domain should be 5 letters up" }),
  password: z
    .string({ required_error: "Password is Required" })
    .min(8, { message: "Invalid Password" }),
});

const RegistrationPage = () => {
  const registarationForm = useForm({
    initialValues: {
      name: "",
      bizName: "",
      email: "",
      subdomain: "",
      passowrd: "",
      confirmedPassword: "",
      termsOfService: false,
    },
    validate: zodResolver(registrationSchema),
  });
  const CountriesArray = fetch(
    "htttps://https://wft-geo-db.p.rapidapi.com/v1/geo/countries"
  ).then((res) => console.log(res));
  return (
    <>
      <Container className="h-screen flex items-center justify-center">
        <Box>
          <Box>
            <Text align="center" className="text-3xl" fw={"bold"}>
              Registration
            </Text>
            <Text align="center">Create new account!</Text>
          </Box>
          <Box mx="auto" w={"70%"}>
            <form
              onSubmit={registarationForm.onSubmit((values) =>
                console.log(values)
              )}
            >
              <SimpleGrid cols={2} mt={40}>
                <TextInput
                  classNames={{ input: "" }}
                  withAsterisk
                  label="Name"
                  placeholder="Patrick Joe"
                  {...registarationForm.getInputProps("name")}
                />
                <TextInput
                  withAsterisk
                  label="Business Name"
                  placeholder="Joe"
                  {...registarationForm.getInputProps("bizName")}
                />
              </SimpleGrid>
              <SimpleGrid cols={3}>
                <Select
                  withAsterisk
                  label="Country"
                  placeholder="Search Countries"
                  searchable
                  nothingFound="No Country Found"
                  data={["CountriesArray"]}
                />

                <TextInput
                  label="City"
                  placeholder="Manhanten"
                  {...registarationForm.getInputProps("city")}
                />
                <TextInput
                  label="Zip Code"
                  placeholder="34723"
                  {...registarationForm.getInputProps("zipCode")}
                />
              </SimpleGrid>
              <TextInput
                withAsterisk
                className="w-1/2"
                label="Email"
                placeholder="your@email.com"
                {...registarationForm.getInputProps("email")}
              />

              <SimpleGrid cols={1} className="flex justify-center my-2">
                <MantinePassowrdInput />
                <PasswordInput
                  label="Confirm password"
                  withAsterisk
                  className="w-full"
                />
              </SimpleGrid>

              <Checkbox
                classNames={{
                  input: "cursor-pointer",
                  label: "cursor-pointer",
                }}
                description="By hitting Register that meana you agree to all Services Agreement about privacy and cookies."
                mt="md"
                size="xs"
                label="Terms and Conditions"
                {...registarationForm.getInputProps("termsOfService", {
                  type: "checkbox",
                })}
              />

              <Group position="right" mt="md">
                <Button
                  className="bg-app-color-500 hover:bg-app-color-600 transition duration-200"
                  type="submit"
                >
                  Register
                </Button>
              </Group>
            </form>
          </Box>
          <Group>
            <Text
              component="a"
              href="/login"
              className="underline hover:opacity-50 duration-200 transition"
              size={"sm"}
              mx="auto"
            >
              Already User? Login!
            </Text>
          </Group>
        </Box>
      </Container>
    </>
  );
};

export default RegistrationPage;
