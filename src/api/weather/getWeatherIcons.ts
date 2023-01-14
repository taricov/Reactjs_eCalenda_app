import { useQuery } from "react-query";
import axios from "axios";
export const getWeatherIcons = () => {
  // const [weatherIndicators, setWeatherIndicators] =
  const lat = 30.04442;
  const long = 31.235712;

  const { isLoading, error, data } = useQuery("weatherIndicators", () =>
    axios(
      `https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${lat}&lon={lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`
    ).then((res) => console.log(res))
  );
};
