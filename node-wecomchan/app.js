const axios = require('axios').default;

const send_to_wecom = async ($text, $wecom_cid, $wecom_aid, $wecom_secret,  $wecom_touid = '@all') => {
  try {
    const { data: info } = await axios.get('https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=' + $wecom_cid + '&corpsecret=' + $wecom_secret)
    console.log('info', info)
    if (info && info.access_token && info.access_token.length) {
      const url = 'https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=' + info.access_token
      const data = {
        touser: $wecom_touid,
        agentid: $wecom_aid,
        msgtype: 'text',
        text: {
          content: $text
        },
        duplicate_check_interval: 600
      }

      const res = await axios.post(url, data)
      console.log('res', res)
    }
  } catch(err) {
    console.log(err)
  }
}

send_to_wecom("推送测试\r\n测试换行", "wwd17ab7cddc629123", "1000003", "");