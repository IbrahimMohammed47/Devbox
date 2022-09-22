import { GraphQLRequestModule } from '@golevelup/nestjs-graphql-request';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ToolModule } from 'src/tool/tool.module';
import { ProductHuntImporter } from './producthunt-importer.cron';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    GraphQLRequestModule.forRoot(GraphQLRequestModule, {
      // Exposes configuration options based on the graphql-request package
      endpoint: process.env.PRODUCT_HUNT_ENDPOINT,
      options: {
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${process.env.PRODUCT_HUNT_TOKEN}`,
        },
      },
    }),
    ToolModule
  ],
  providers: [ProductHuntImporter],
})
export class CronsModule {}
