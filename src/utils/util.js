
const util = {
  //转义特殊字符<,>,",'
  escapeToHtmlEntity: function (str) {
    if (!str) {
      return '';
    }

    var escape = {
      '<': '&lt;',
      '>': '&gt;',
      '\"': '&quot;',
      '&': '&amp;'
    };

    return str.replace(/[&<>"]/g, function (match) {
      return escape[match] || match;
    });
  },

  //转义特殊字符<,>,",'
  unEscapeToHtmlEntity: function (str) {
    if (!str) {
      return '';
    }

    str = str.replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '\"')
      .replace(/&amp;/g, '&')
      .replace(/&nbsp;/g, ' ')
      .replace(/<br>/g, '\n');

    return str;
  },
  //	延迟函数
  delay: function (time, callBack) {
    setTimeout(function () {
      callBack && callBack();
    }, time)
  },
  diffTime: function(start, end) {
    var start = new Date(start),
      end = new Date(end);
    var diff = end.getTime() - start.getTime();
    var days=Math.floor(diff/(24*3600*1000));

    //计算出小时数
    var leave1=diff%(24*3600*1000);    //计算天数后剩余的毫秒数
    var hours=Math.floor(leave1/(3600*1000));
    //计算相差分钟数
    var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
    var minutes=Math.floor(leave2/(60*1000));

    //计算相差秒数
    var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
    var seconds=Math.round(leave3/1000);

    var returnStr = "";
    if(minutes>0) {
      returnStr = minutes + "分" + returnStr;
    }
    if(hours>0) {
      returnStr = hours + "小时" + returnStr;
    }
    if(days>0) {
      returnStr = days + "天" + returnStr;
    }
    return returnStr;
  },
  //	选择日期 将2016-09-09转换成new Date()格式
  selectDateFormat: function (date, sep) {
    date = date.split(sep);
    var y = Number(date[0]),
      m = Number(date[1]) - 1,
      d = Number(date[2]);
    return new Date(y, m, d)
  },
  //	设置日期
  setDate: function (num, date) {
    date = typeof date === 'undefined' ? new Date() : date;
    var y = date.getFullYear(),
      m = date.getMonth(),
      d = date.getDate() + num;

    var dd = new Date(y, m, d);

    y = dd.getFullYear();
    m = dd.getMonth() + 1;
    d = dd.getDate();
    m = m > 9 ? m : '0' + m;
    d = d > 9 ? d : '0' + d;
    return y + '-' + m + '-' + d;
  },

  //	根据日期获取天数
  getDays: function (start, end, sep) {
    var dd = end.split(sep),
      y = Number(dd[0]),
      m = Number(dd[1] - 1),
      d = Number(dd[2]);
    end = +new Date(y, m, d);
    dd = start.split(sep);
    y = Number(dd[0]);
    m = Number(dd[1] - 1);
    d = Number(dd[2]);
    start = +new Date(y, m, d)

    return Math.floor((end - start) / 1000 / (24 * 60 * 60))
  },
}

module.exports = util

