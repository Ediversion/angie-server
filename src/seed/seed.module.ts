import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { CrmModule } from '../crm/crm.module';
import { UsersModule } from '../users/users.module';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [CrmModule, UsersModule,GroupsModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {

}
