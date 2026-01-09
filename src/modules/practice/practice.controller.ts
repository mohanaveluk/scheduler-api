import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { OpenDentalService } from '../opendental/opendental.service';
import { ClinicContext } from 'src/common/context/clinic-context.provider';
import { ApiTags } from '@nestjs/swagger';
import { PracticeService } from './practice.service';
import { ResponseDto } from 'src/common/dto/response.dto';

@ApiTags('Practice')
@Controller('practice')
export class PracticeController {
    constructor(private readonly service: OpenDentalService, private readonly practiceService: PracticeService) { }
    @Get()
    async getPractices(@Query('practiceGuid') practiceGuid: string) {
        try {
            const odClinics = await this.service.callApi({
                method: 'GET',
                endpoint: '/clinics',
                params: {},
            });

            const clinicDetail = await this.practiceService.getPractice(practiceGuid);

            console.log('clinicDetail', clinicDetail);

            return new ResponseDto(true, 'Practice details retrieved successfully', {
                openDentalClinics: (odClinics).data,
                clinicDetail: clinicDetail
            });
        } catch (error) {
            throw new HttpException(
                new ResponseDto(false, 'Failed to retrieve Practice', null, error.message),
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
