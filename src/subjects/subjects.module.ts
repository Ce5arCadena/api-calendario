import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthGuard } from "src/auth/auth.guard";
import { SubjectService } from "./subjects.service";
import { Subject } from "./entities/subject.entity";
import { User } from "src/users/entities/user.entity";
import { SubjectController } from "./subjects.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Subject, User])],
    controllers: [SubjectController],
    providers: [SubjectService, {
        provide: APP_GUARD,
        useClass: AuthGuard
    }]
})

export class SubjectModule {}