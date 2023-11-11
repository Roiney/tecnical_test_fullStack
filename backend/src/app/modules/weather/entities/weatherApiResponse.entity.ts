export class Weather {
  id!: number;
  main!: string;
  description!: string;
  icon!: string;
}

class MainWeatherData {
  temp!: number;
  feels_like!: number;
  temp_min!: number;
  temp_max!: number;
  pressure!: number;
  sea_level!: number;
  grnd_level!: number;
  humidity!: number;
  temp_kf!: number;
}

class Clouds {
  all!: number;
}

class Rain {
  '3h'!: number;
}

class Wind {
  speed!: number;
  deg!: number;
  gust!: number;
}

class Sys {
  pod!: string;
}

export class ForecastEntry {
  dt!: number;
  main!: MainWeatherData;
  weather!: Weather[];
  clouds!: Clouds;
  wind!: Wind;
  visibility!: number;
  pop!: number;
  rain!: Rain;
  sys!: Sys;
  dt_txt!: string;
}

export class City {
  id!: number;
  name!: string;
  coord!: { lat: number; lon: number };
  country!: string;
  population!: number;
  timezone!: number;
  sunrise!: number;
  sunset!: number;
}

export class WeatherApiResponse {
  cod!: string;
  message!: number;
  cnt!: number;
  list!: ForecastEntry[];
  city!: City;
}
