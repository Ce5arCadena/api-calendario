import { 
    Put, 
    Get, 
    Post, 
    Body, 
    Param, 
    Query, 
    Controller, 
    ParseIntPipe, 
    DefaultValuePipe
} from "@nestjs/common";
import { SubjectService } from "./subjects.service";
import { ResponseDto } from "src/utils/dto/response.dto";
import { CreateSubjectDto } from "./dtos/create-subject.dto";
import { UpdateSubjectDto } from "./dtos/update-subject.dto";


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
    getSubject(@Param('id') id: number) {
        return 'uno solo';
    }

    @Post()
    createSubject(@Body() createSubjectDto: CreateSubjectDto) {
        return this.subjectService.createSubject(createSubjectDto);
    }

    @Put(':id')
    updateSubject(@Body() updateSubjectDto: UpdateSubjectDto) {

    }

    @Get(':id')
    deleteSubject(@Param('id') id: number) {

    }
}
