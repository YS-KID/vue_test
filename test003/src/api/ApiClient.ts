import axios from 'axios';

export default class ApiClient {

  static get appIdOpenWeatherMap() {
    return '681fa0c699b30f64bfb06f2a7e615ee4';
  }

  static get apiUrlOpenWeatherMap() {
    return `https://api.openweathermap.org/data/2.5`;
  }

  static async getCurrentWeather(location: string): Promise<any> { // Tokyo,jp
    const { data } = await axios.get(`${this.apiUrlOpenWeatherMap}/weather`, {
      params: {
        q: location,
        APPID: this.appIdOpenWeatherMap
      }
    });
    return data;
  }

  static async getForecastWeather(location: string): Promise<any> { // Tokyo,jp
    const { data } = await axios.get(`${this.apiUrlOpenWeatherMap}/forecast`, {
      params: {
        q: location,
        APPID: this.appIdOpenWeatherMap
      }
    });
    return data;
  }

  static async getThreeWeeksWeather(location: string): Promise<any> { // Tokyo,jp
    const { data } = await axios.get(`${this.apiUrlOpenWeatherMap}/3weather`, {
      params: {
        q: location,
        APPID: this.appIdOpenWeatherMap
      }
    });
    return data;
  }
}