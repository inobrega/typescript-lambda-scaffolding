import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterService } from '@/app/src/shared/services/router.service';
import { CreateUseCase } from '@/app/src/application/use-cases/create.use-case';
import { GetUseCase } from '@/app/src/application/use-cases/get.use-case';
import { DeleteUseCase } from '@/app/src/application/use-cases/delete.use-case';
import { PatchUseCase } from '@/app/src/application/use-cases/patch.use-case';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    RouterService,
    CreateUseCase,
    GetUseCase,
    DeleteUseCase,
    PatchUseCase,
    Logger,
  ],
})
export class AppModule {}
