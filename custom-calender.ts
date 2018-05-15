import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewChecked } from '@angular/core';

/**
 * Generated class for the CustomCalender component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'custom-calender',
  templateUrl: 'custom-calender.html'
})

export class CalendarComponent implements AfterViewChecked{

  @Input() selected : Array<number>;

  @Output() selectedChange = new EventEmitter<Array<number>>();

  @ViewChild('calendar') calendarDivRef : ElementRef;

  calendar : CustomCalender;
  
  ngAfterViewChecked(): void {
    this.calendar.init(this.calendarDivRef,this.selected);
  }


  constructor(){
    // 创建日历 对象
    this.calendar = new CustomCalender('box',{
      curDate: new Date()
    })
  }

// add() {
//   var myDate = new Date();
//   var data = myDate.getDate();
//   this.selected.push(data);
//   this.calendar.init(this.calendarDivRef,this.selected);
// }
}



export class CustomCalender{

  main : HTMLElement;
  options : any;
  today : Date;
  year : any ;
  month : any ;
  day : any ;
  date : any ;

  constructor(id,options){
    this.main = document.getElementById(id);
		this.options = options;

		this.today = new Date(options.curDate);
		this.year = this.today.getFullYear();
		this.month = this.today.getMonth() + 1;
		this.day = this.today.getDay();
		this.date = this.today.getDate();
  }

  // 初始化
  init = function(htmlRef,dayArr) {
    var me = this;
    htmlRef.nativeElement.innerHTML = me.getCalendar(dayArr);
  };
  
  //获取日历时间 
  getCalendarTime = function() {
    return this.year + '-' + this.month + '-' + this.date;
  };

  //判断是否是闰年
  isLeap = function() {
    var year = this.year;
    if(year % 4 == 0 && year % 100 > 0) {
      return true;
    }else if(year % 400 == 0 && year % 3200 > 0) {
      return true;
    }else {
      return false;
    }
  };
  //判断一个月多少天
  getLen = function() {
    var month = this.month;
    if(month == 2) {
      if(this.isLeap) {
        return 29;
      }else {
        return 28;
      }
    }else {
      if(month < 8) {
        if(month % 2 > 0) {
          return 31;
        }else {
          return 30;
        }
      }else {
        if(month % 2 > 0) {
          return 30;
        }else {
          return 31;
        }
      }
    }
  };
  getCalendar = function(dayArr) {
    var len = this.getLen();
    var d = new Date(this.year, this.month - 1, 1);
    var dfw = d.getDay();
    var arr = new Array();
    var tem = 0;
    var str = "";
    for (var i = 0; i < 6; i++) {
      arr[i] = new Array();
      for (var j = 0; j < 7; j++) {
        tem++;
        if (tem - dfw > 0 && tem - dfw <= len) {
          arr[i][j] = tem - dfw;
        } else {
          arr[i][j] = "";
        }
      }
    }
    
    str += '<h4>'+this.year + '年' + this.month + '月'+'</h4>';
    str += '<table class="sign_tab" border="0px" cellpadding="0px" cellspacing="0px">';
    str += '<thread><tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th></tr></thread>';
    str += '<tbody>';
    for (var k = 0; k < 6; k++) {
      if (k == 5 && arr[k][0] == "")
        continue;
      str += '<tr>';
      for (var m = 0; m < arr[k].length; m++) {
        dayArr.contains = function(element) {
          for (var i = 0; i < this.length; i++) {
            if (element && this[i] == element) {
              return true;
            }
          }
          return false;
        }
        if(dayArr.contains(arr[k][m])){
          str += '<td class="red_tbg"><div>' + arr[k][m] + '<span class="ui-state-default"><i class="icon iconfont icon-gou"></i></span>' + '</div></td>';
        }else{
          //判断是否是当日
          if(arr[k][m] == this.date){
            str += '<td class="cur_day"><div>' + arr[k][m] + '</div></td>';
            continue;
          }
          if(arr[k][m] == ""){
            str += '<td class="over"><div>' + arr[k][m] + '</div></td>';
            continue;
          }
          str += '<td><div>' + arr[k][m] + '</div></td>';
        }
      }
      str += '</tr>';
    }
    str += '</tbody>';
    str += '</table>';
    return str;
  };
}
