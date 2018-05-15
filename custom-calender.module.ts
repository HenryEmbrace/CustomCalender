import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CustomCalender } from './custom-calender';

@NgModule({
  declarations: [
    CustomCalender,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    CustomCalender
  ]
})
export class CustomCalenderModule {}
