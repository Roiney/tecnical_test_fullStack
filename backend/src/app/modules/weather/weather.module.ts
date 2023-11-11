import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { PrismaService } from 'src/app/db/prisma/prisma.service';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService, PrismaService],
})
export class WeatherModule {}
