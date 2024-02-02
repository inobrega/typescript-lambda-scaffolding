import { Module } from '@nestjs/common';
import { FunctionService } from '@/app/src/shared/services/function.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [FunctionService],
})
export class AppModule {}
