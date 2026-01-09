/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PracticeRepository } from './practice.repository';

@Injectable()
export class PracticeService {
    
    constructor(private practiceRepository: PracticeRepository) { }

    async getPractice(practiceGuid: string) {
        
        try {
            return await this.practiceRepository.getPractice(practiceGuid);

        } catch (error) {
            throw error.message;
        }
    }

    async getVisitReasons(practiceGuid: string) {
        try {
            return await this.practiceRepository.getvistReasons(practiceGuid);
        } catch (error) {
            throw error.message;
        }
    }
}
