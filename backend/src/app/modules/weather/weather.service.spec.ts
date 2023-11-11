import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import {
  City,
  ForecastEntry,
  Weather,
  WeatherApiResponse,
} from './entities/weatherApiResponse.entity';
// import { city } from '@prisma/client';
import { PrismaService } from 'src/app/db/prisma/prisma.service';
import { city, weather_data, weather_types } from '@prisma/client';

describe('WeatherService', () => {
  let service: WeatherService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherService, PrismaService],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('recordCityInformation', () => {
    it('should record city information', async () => {
      const cityData: City = {
        id: 3455775,
        name: 'Osasco',
        coord: { lat: -23.5325, lon: -46.7917 },
        country: 'BR',
        population: 677856,
        timezone: -10800,
        sunrise: 1699690564,
        sunset: 1699737982,
      };

      const cityResponse: city = {
        id: 33,
        name: 'Osasco',
        latitude: '-23.5325',
        longitude: '-46.7917',
        country: 'BR',
        population: 677856,
        timezone: -10800,
        sunrise: '1699690564',
        sunset: '1699737982',
        created_at: new Date('2023-11-11T18:05:25.000Z'),
        updated_at: new Date('2023-11-11T18:05:25.000Z'),
      };

      const prismaCreateMock = jest
        .spyOn(prisma.city, 'create')
        .mockResolvedValue(cityResponse);

      const result = await service.recordCityInformation(cityData);

      expect(result).toEqual(cityResponse);
      expect(prismaCreateMock).toHaveBeenCalledWith({
        data: {
          country: cityData.country,
          name: cityData.name,
          latitude: cityData.coord.lat.toString(),
          longitude: cityData.coord.lon.toString(),
          population: cityData.population,
          sunrise: cityData.sunrise.toString(),
          timezone: cityData.timezone,
          sunset: cityData.sunset.toString(),
        },
      });
    });

    it('should record city information error', async () => {
      const cityData: City = {
        id: 3455775,
        name: 'Osasco',
        coord: { lat: -23.5325, lon: -46.7917 },
        country: 'BR',
        population: 677856,
        timezone: -10800,
        sunrise: 1699690564,
        sunset: 1699737982,
      };

      const prismaCreateMock = jest
        .spyOn(prisma.city, 'create')
        .mockRejectedValue(new Error('Something went wrong'));

      try {
        await service.recordCityInformation(cityData);
      } catch (error: any) {
        expect(error.message).toBe('Something went wrong');
      }

      expect(prismaCreateMock).toHaveBeenCalledWith({
        data: {
          country: cityData.country,
          name: cityData.name,
          latitude: cityData.coord.lat.toString(),
          longitude: cityData.coord.lon.toString(),
          population: cityData.population,
          sunrise: cityData.sunrise.toString(),
          timezone: cityData.timezone,
          sunset: cityData.sunset.toString(),
        },
      });
    });
  });

  describe('recorListInfomation', () => {
    it('should record list information', async () => {
      const list: ForecastEntry = {
        dt: 1700092800,
        main: {
          temp: 22.36,
          feels_like: 22.87,
          temp_min: 22.36,
          temp_max: 22.36,
          pressure: 1011,
          sea_level: 1011,
          grnd_level: 928,
          humidity: 85,
          temp_kf: 0,
        },
        weather: [
          { id: 500, main: 'Rain', description: 'light rain', icon: '10n' },
        ],
        clouds: { all: 71 },
        wind: { speed: 6.07, deg: 139, gust: 9.81 },
        visibility: 10000,
        pop: 0.6,
        rain: { '3h': 1.69 },
        sys: { pod: 'n' },
        dt_txt: '2023-11-16 00:00:00',
      };
      const cityId: number = 35;
      const returnFunction: weather_data = {
        id: 156,
        city_id: 35,
        dt: 1700092800,
        temp: 22.36,
        feels_like: 22.87,
        temp_min: 22.36,
        temp_max: 22.36,
        pressure: 1011,
        sea_level: 1011,
        grnd_level: 928,
        humidity: 85,
        temp_kf: 0,
        clouds_all: 71,
        wind_speed: 6.07,
        wind_deg: 139,
        wind_gust: 9.81,
        visibility: 10000,
        pop: 0.6,
        rain_3h: null,
        sys_pod: 'n',
        dt_txt: '2023-11-16 00:00:00',
        created_at: new Date('2023-11-11T18:38:40.000Z'),
        updated_at: new Date('2023-11-11T18:38:40.000Z'),
      };

      const prismaCreateMock = jest
        .spyOn(prisma.weather_data, 'create')
        .mockResolvedValue(returnFunction);

      const result = await service.recorListInfomation(cityId, list);

      expect(result).toEqual(returnFunction);
      expect(prismaCreateMock).toHaveBeenCalledWith({
        data: {
          city_id: cityId,
          clouds_all: list.clouds.all,
          dt: list.dt,
          dt_txt: list.dt_txt,
          temp: list.main.temp,
          feels_like: list.main.feels_like,
          grnd_level: list.main.grnd_level,
          humidity: list.main.humidity,
          temp_min: list.main.temp_min,
          temp_kf: list.main.temp_kf,
          pressure: list.main.pressure,
          temp_max: list.main.temp_max,
          pop: list.pop,
          wind_speed: list.wind.speed,
          wind_gust: list.wind.gust,
          wind_deg: list.wind.deg,
          sea_level: list.main.sea_level,
          sys_pod: list.sys.pod,
          visibility: list.visibility,
        },
      });
    });
  });

  describe(' recordWeatherTypes', () => {
    it('should Weather Type information', async () => {
      const weather: Weather = {
        id: 500,
        main: 'Rain',
        description: 'light rain',
        icon: '10n',
      };

      const weatherReturn: weather_types = {
        id: 162,
        weather_data_id: 162,
        main: 'Rain',
        description: 'light rain',
        icon: '10n',
      };

      const prismaCreateMock = jest
        .spyOn(prisma.weather_types, 'create')
        .mockResolvedValue(weatherReturn);
      const weatherId: number = 1;
      const result = await service.recordWeatherTypes(weatherId, weather);

      expect(result).toEqual(weatherReturn);
      expect(prismaCreateMock).toHaveBeenCalledWith({
        data: {
          weather_data_id: weatherId,
          description: weather.description,
          icon: weather.icon,
          main: weather.main,
        },
      });
    });
  });
});
