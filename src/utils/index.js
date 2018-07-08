export function generateSummary(content) {
  let trimHtml = require('trim-html');
  let trimmed = trimHtml(content, {
    limit: 200,
    preserveTags: false,
    suffix: ' […]'
  });
  return trimmed.html;
}

export function formatPostCreateDate(date) {
  let create_time = new Date(date);
  let now = new Date().getTime();
  let day = Math.abs(now-create_time.getTime());
  let res = day / 1000 / 3600 / 24;

  switch (res) {
    case 0: res = '今天发布'; break;
    case 1: res = '昨天发布'; break;
    case 2: res = '前天发布'; break;
    default:
      if(res <= 7) {
        res = res + '天前发布'
      } else {
        res = create_time.getFullYear()+'年'+(create_time.getMonth()+1)+'月'+create_time.getDate()+'日';
      }
  }
  return res
}
