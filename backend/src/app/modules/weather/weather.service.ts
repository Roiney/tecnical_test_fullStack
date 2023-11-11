import { BadRequestException, Controller, Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import axios from 'axios';
import { PrismaService } from 'src/app/db/prisma/prisma.service';
import {
  City,
  ForecastEntry,
  Weather,
  WeatherApiResponse,
} from './entities/weatherApiResponse.entity';
import { city, weather_data, weather_types } from '@prisma/client';

@ApiTags('Weather')
@Controller('weather')
@Injectable()
export class WeatherService {
  constructor(private readonly prisma: PrismaService) {}
  async callApiOpenweathermap(city: string): Promise<WeatherApiResponse> {
    try {
      let token = process.env.TOKEN_API;

      if (!token) {
        throw new Error('TOKEN_CEP is not defined in your environment');
      }

      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=Metric&cnt=40&appid=${token}`;

      const response = await axios({
        method: 'get',
        url,
      });

      const { data } = response;

      return data;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async recordCityInformation(city: City): Promise<city> {
    try {
      const recordInformationCity = await this.prisma.city.create({
        data: {
          country: city.country,
          name: city.name,
          latitude: city.coord.lat.toString(),
          longitude: city.coord.lon.toString(),
          population: city.population,
          sunrise: city.sunrise.toString(),
          timezone: city.timezone,
          sunset: city.sunset.toString(),
        },
      });

      return recordInformationCity;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async recorListInfomation(
    cityId: number,
    list: ForecastEntry,
  ): Promise<weather_data> {
    try {
      const recostForecastEntry = await this.prisma.weather_data.create({
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

      return recostForecastEntry;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async recordWeatherTypes(
    weatherId: number,
    weather: Weather,
  ): Promise<weather_types> {
    try {
      const recordWeatherTypes = await this.prisma.weather_types.create({
        data: {
          weather_data_id: weatherId,
          description: weather.description,
          icon: weather.icon,
          main: weather.main,
        },
      });
      return recordWeatherTypes;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async callAndRecordData(city: string): Promise<any> {
    try {
      const apiResponde = await this.callApiOpenweathermap(city);
      console.dir(apiResponde, { dephl: null });
      if (apiResponde) {
      }
      const cityInformation = await this.recordCityInformation(
        apiResponde.city,
      );
      const firstListItem = apiResponde.list[0];

      const recorListInfomation = await this.recorListInfomation(
        cityInformation.id,
        firstListItem,
      );

      await this.recordWeatherTypes(
        recorListInfomation.id,
        apiResponde.list[0].weather[0],
      );

      for (const list of apiResponde.list) {
        const date = new Date(list.dt_txt);
        if (
          date.getHours() === 0 &&
          date.getMinutes() === 0 &&
          date.getSeconds() === 0
        ) {
          const recorListInfomation = await this.recorListInfomation(
            cityInformation.id,
            list,
          );
          for (const weather of list.weather) {
            await this.recordWeatherTypes(recorListInfomation.id, weather);
          }
        }
      }
      return;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async findcityinDB(city: string): Promise<city | null> {
    try {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);

      const findCity = await this.prisma.city.findFirst({
        where: {
          name: city,
          created_at: {
            gte: today.toISOString(), // Obtém a representação da data de hoje em formato ISO
          },
        },
        include: {
          weather_data: {
            include: {
              weather_types: true,
            },
          },
        },
        orderBy: { id: 'desc' },
      });

      return findCity;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(city: string): Promise<any> {
    try {
      const findcityinDB = await this.findcityinDB(city);
      if (findcityinDB) {
        return findcityinDB;
      }
      await this.callAndRecordData(city);
      const findcityinDB2 = await this.findcityinDB(city);

      return findcityinDB2;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
