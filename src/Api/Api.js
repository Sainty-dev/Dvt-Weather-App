import axios from "axios";
import ENV from "../../env";

const currentWeatherEndPoint = params => `${ENV.WEATHER_API_BASE_URL}/data/2.5/weather?lat=${params?.lat}&lon=${params?.lon}&appid=${ENV.WEATHER_API_KEY}&units=metric`;
const fiveDaysForecastEndPoint = params => `${ENV.WEATHER_API_BASE_URL}/data/2.5/forecast?lat=${params?.lat}&lon=${params?.lon}&appid=${ENV.WEATHER_API_KEY}&units=metric`;


const HandleHttpCall = async (endpoint, method = "GET", data = null) => {
  try {
    const options = {
      method,
      url: endpoint,
      data,
    };

    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    if (error?.response) {
      console.log("::error>>>", error?.response?.status, error?.response?.data);
    } else {
      console.log("::error>>>", error?.message);
    }
  }
};

export const fetchCurrentWeather = params=>{
  console.log("::parr>>>",params?.lon)
  return HandleHttpCall(currentWeatherEndPoint(params))
}
export const fetchFiveDaysWeatherForecast = params=>{
  console.log("::parr>>>",params?.lat)
  return HandleHttpCall(fiveDaysForecastEndPoint(params))
}

