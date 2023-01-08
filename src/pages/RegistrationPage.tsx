import {
  Box,
  Button,
  Checkbox,
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
  //TODO: dropdown all countries
  //TODO: Hide
  const CountriesArray = fetch(
    "htttps://https://wft-geo-db.p.rapidapi.com/v1/geo/countries"
  ).then((res) => console.log(res));
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-skin-hue2 to-skin-hue0 dark:bg-black dark:from-black dark:to-slate-800 blue:bg-primary-900 disabled:bg-black">
      <div className=" bg-gradient-to-r from-skin-hue2 to-skin-hue0 flex flex-col items-center justify-around bg-white rounded-lg shadow-lg overflow-hidden mx-auto w-3/4 h-3/4 dark:shadow-slate-800 dark:bg-black dark:from-black dark:to-slate-800  ">
        {/* <div className="relative w-screen h-screen flex flex-col items-center justify-center mx-auto my-0 bg-gradient-to-r from-skin-hue2 to-skin-hue0  pt-10"> */}
        <Box py={30}>
          <Text
            align="center"
            className="text-3xl font-bold text-gray-darkest dark:text-slate-300"
          >
            Registration
          </Text>
          <Text
            align="center"
            className="text-xl  text-gray-darkest dark:text-slate-300"
          >
            Create a new account!
          </Text>
        </Box>
        <Box sx={{ maxWidth: "70%" }} mx="auto">
          <form
            onSubmit={registarationForm.onSubmit((values) =>
              console.log(values)
            )}
          >
            <SimpleGrid cols={2}>
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
                className="bg-primary-600 dark:bg-slate-800 shadow-sm dark:hover:bg-slate-700 dark:text-gray-dark  hover:bg-primary-700 transition-all duration-trans text-white hover:text-white mt-5 dark:text-slate-300"
                type="submit"
              >
                Register
              </Button>
            </Group>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default RegistrationPage;
