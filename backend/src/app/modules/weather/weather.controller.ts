import { Controller, Get, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get(':city')
  async findOne(@Param('city') city: string): Promise<any> {
    return await this.weatherService.findOne(city);
  }
}
