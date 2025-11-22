import { SubjectService } from "./subjects.service";
import { CreateSubjectDto } from "./dtos/create-subject.dto";

import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from "@nestjs/common";
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

    }

    @Put(':id')
    updateSubject(@Body() updateSubjectDto: UpdateSubjectDto) {

    }

    @Get(':id')
    deleteSubject(@Param('id') id: number) {

    }
}
