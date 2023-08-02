// merge cell example1
const content1 = [
  '| @cols=2:mergedHead1 | @cols=3:mergedHead2 |',
  '| --- | --- | --- | --- | --- |',
  '| @cols=2:mergedCell1-1 | cell1-2 | @cols=2:@rows=5:mergedCell1-3 |',
  '| @rows=2:mergedCell2-1 | @rows=2:mergedCell2-2 | cell2-3 | cell2-4 | cell2-5 | cell2-6 |',
  '| cell3-1 |',
  '| cell4-1 | cell4 | cell4-3 |',
  '| cell5-1 | cell5-2 | cell5-3 | cell5-4 |',
  '',
].join('\n');

// merge cell example2
const content2 = [
  '| @cols=2:merged | @cols=5:merged |',
  '| --- | --- | --- | --- | --- | --- | --- |',
  '| @cols=2:merged | table |  |  |  | table2 |',
  '| @rows=2:merged | @rows=2:table | table2 |  |  |  | asdf |',
  '| table |  |  |  | table2 |',
  '| @cols=3:@rows=2:merged |  |  |  | table2 |',
  '|  |  |  | table |',
].join('\n');

// normal cell example
const content3 = [
  '| a | b| c | d |',
  '| --- | --- | --- | --- |',
  '| table | table2 | table3 | table4 |',
  '| table5 | table6 | table7 | table8 |',
  '| table9 | table10 | table11 | table22 |',
].join('\n');


const content4 = `
<table style="line-height: 30px;">
<thead>
  <tr>
    <td style="text-align: center;" colspan="6"><b>各厂商CDN流量计费对比</b></td>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="2">区域 | 厂商</td>
    <td rowspan="2">腾讯CDN流量单价(元/G)</td>
    <td rowspan="2">网宿CDN流量单价(元/G)</td>
    <td colspan="3">AWS计费单价</td>
  </tr>
  <tr>
    <td>CloudFront流量单价(元/G)</td>
    <td>区域数据传至源服务器(元/G)</td>
    <td>HTTPS请求（元/万次）</td>
  </tr>
  <tr>
    <td>北美</td>
    <td>0.25</td>
    <td>0.16</td>
    <td>0.61</td>
    <td>0.15</td>
    <td>0.07</td>
  </tr>
  <tr>
    <td>欧洲</td>
    <td>0.25</td>
    <td>0.16</td>
    <td>0.61</td>
    <td>0.15</td>
    <td>0.08</td>
  </tr>
</tbody>
</table>
`