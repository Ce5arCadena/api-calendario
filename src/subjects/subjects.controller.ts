import { 
    Put, 
    Get, 
    Post, 
    Body, 
    Param, 
    Query, 
    Controller, 
    ParseIntPipe, 
    DefaultValuePipe,
    Delete,
} from "@nestjs/common";
import { SubjectService } from "./subjects.service";
import { CreateSubjectDto } from "./dtos/create-subject.dto";
import { UpdateSubjectDto } from "./dtos/update-subject.dto";
import { PayloadJwt } from "src/utils/decorators/payload-jwt.decorator";
import type { JwtPayload } from "src/utils/interfaces/jwt-payload.interface";


@Controller('subjects')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) {}

    @Get()
    allSubjects(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10),ParseIntPipe) limit: number,
    ) {
        return 'lista de todos';
    }

    @Get(':id')
    getSubject(@Param('id') id: number, @PayloadJwt() payload: JwtPayload) {
        return this.subjectService.getSubject(id, payload);
    }

    @Post()
    createSubject(@Body() createSubjectDto: CreateSubjectDto, @PayloadJwt() payload: JwtPayload) {
        return this.subjectService.createSubject(createSubjectDto, payload);
    }

    @Put(':id')
    updateSubject(@Param('id') id: number, @Body() updateSubjectDto: UpdateSubjectDto, @PayloadJwt() payload: JwtPayload) {
        return this.subjectService.updateSubject(id, updateSubjectDto, payload);
    }

    @Delete(':id')
    deleteSubject(@Param('id') id: number, @PayloadJwt() payload: JwtPayload) {
        return this.subjectService.deleteSubject(id, payload);
    }
}
