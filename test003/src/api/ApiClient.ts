import axios from 'axios';

export default class ApiClient {

  static get appId() {
    return '681fa0c699b30f64bfb06f2a7e615ee4';
  }

  static get apiUrl() {
    return `https://api.openweathermap.org/data/2.5`;
  }

  static async getCurrentWeather(location: string): Promise<any> { // Tokyo,jp
    const { data } = await axios.get(`${this.apiUrl}/weather`, {
      params: {
        q: location,
        APPID: this.appId
      }
    });
    return data;
  }

  static async getThreeWeeksWeather(location: string): Promise<any> { // Tokyo,jp
    const { data } = await axios.get(`${this.apiUrl}/3weather`, {
      params: {
        q: location,
        APPID: this.appId
      }
    });
    return data;
  }
}