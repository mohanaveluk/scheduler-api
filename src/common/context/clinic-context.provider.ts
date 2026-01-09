import { Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Inject } from '@nestjs/common';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class ClinicContext {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  private _practiceGuid!: string;

  setPracticeGuid(practiceGuid: string) {
    this._practiceGuid = practiceGuid;
  }

  getPracticeGuid(): string {
    if (!this._practiceGuid) {
      throw new Error('clinicId not initialized in ClinicContext');
    }
    return this._practiceGuid;
  }

  get practiceGuid() {
    //const id = 0; //this.request.params['practiceGuid'];
    const id = this.request.params.practiceGuid || this.request.query.practiceGuid || this.request.headers['x-practice-guid']
    return id;
  }
}