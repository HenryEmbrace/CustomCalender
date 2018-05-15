# test
$ ionic g component CustomCalender
#将 对应的 ts,scss html 文件进行替换修改
#在 component 文件夹下的的 components.module.ts 文件中 添加 CustomCalender 的对应信息
# import { CalendarComponent } from './custom-calender/custom-calender';
# @NgModule({ CalendarComponent })
# exports: [CalendarComponent]
# 在需要引用的 html 中 使用  <custom-calender [selected]="selected">
# 在需要引用的 ts 中
export class SignPage {
selected:number[] = [1,2,3,5,7];
today:Date = new Date(); 
curDay = this.today.getDate(); //今天
}

# 在签到响应事件中 传入需要 签到的日期：  this.selected.push(this.curDay);
