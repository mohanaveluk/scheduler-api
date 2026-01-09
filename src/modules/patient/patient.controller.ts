import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { OpenDentalService } from '../opendental/opendental.service';
import { ClinicContext } from 'src/common/context/clinic-context.provider';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

@ApiTags('patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly service: OpenDentalService, private readonly clinicContext: ClinicContext) { }

  @Get()
  @ApiOperation({ summary: 'Get Patient' })
  @ApiResponse({ status: 200, description: 'Patient details retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  async getPatients(@Query('practiceGuid') practiceGuid: string) {
    this.clinicContext.setPracticeGuid(practiceGuid);
    // try {
    //   const patients = await this.service.callApi({
    //     method: 'GET',
    //     endpoint: '/patients',
    //     params: {},
    //   });
    //   return new ResponseDto(true, 'Patient details retrieved successfully', (patients).data);
    // } catch (error) {
    //   throw new HttpException(
    //     new ResponseDto(false, 'Failed to retrieve Patient details', null, error.message),
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }

    return await this.service.callApi({
        method: 'GET',
        endpoint: '/patients',
        params: {},
      });
  }
}