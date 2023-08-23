// pages/api/bilibili.js
// 从 Bilibili API 获取番剧列表

import fetch from 'isomorphic-fetch';

// 从字符串中提取数字
function extractNumberFromString(str) {
    const match = str.match(/\d+/);
    return match ? parseInt(match[0]) : null;
}

// 从时间字符串中提取时间部分，格式为 HH:MM
function extractTimeFromProgress(str) {
    // 使用正则表达式提取时间部分，格式为 HH:MM
    const match = str.match(/\d+:\d+/);
    return match ? ' ' + match[0] : null;
}

// 剔除时间部分，保留数字部分
function removeTimeFromProgress(str) {
    // 使用正则表达式替换时间部分为空字符串
    return str.replace(/\s*\d+:\d+\s*/, '');
}


// 为 Bilibili API 请求构建标头，从环境变量中获取 cookie
function buildHeaders() {
    return {
        'Cookie': `uuid=${process.env.REACT_APP_UUID}; buvid3=${process.env.REACT_APP_Buvid3}; sid=${process.env.REACT_APP_SID}; DedeUserID=${process.env.REACT_APP_DedeUserID}; DedeUserID__ckMd5=${process.env.REACT_APP_DedeUserID_ckMd5}; SESSDATA=${process.env.REACT_APP_SESSDATA}; bili_jct=${process.env.REACT_APP_bili_jct}`,
    };
}

// 从 Bilibili API 获取番剧列表
export default async function handler(req, res) {
    if (req.method === 'GET') {
        // 从环境变量中获取用户 ID，构建 API 请求 URL
        const apiUrl = `https://api.bilibili.com/x/space/bangumi/follow/list?type=1&vmid=${process.env.REACT_APP_DedeUserID}`;

        // 发送 API 请求
        try {

            // 从 Bilibili API 获取番剧列表
            const response = await fetch(apiUrl, {
                headers: buildHeaders(),
            });

            // 如果 API 请求失败，抛出错误
            if (!response.ok) {
                throw new Error(`Bilibili API 请求失败: ${response.status} ${response.statusText}`);
            }

            // 从 API 响应中提取 JSON 数据
            const data = await response.json();
            const programList = data.data.list;

            // 从 API 响应中提取所需的数据
            const programs = programList.map(program => ({
                title: program.title,
                epNum: program.new_ep.index_show,
                epTitle: program.new_ep.long_title,
                epCover: program.new_ep.cover,
                epUrl: program.url,
                epProgress: removeTimeFromProgress(program.progress),
                epTime: extractTimeFromProgress(program.progress),
                epStart:extractNumberFromString(program.progress),
                epEnd: extractNumberFromString(program.new_ep.index_show),
            }));

            // 将数据作为 JSON 响应发送
            res.status(200).json(programs);
        } catch (error) {

            // 如果出错，将错误作为 JSON 响应发送
            console.error('获取数据时出错:', error);
            res.status(500).json({ error: '获取数据时出错' });
        }
    } else {

        // 如果不是 GET 请求，返回错误
        res.status(405).json({ error: '方法不允许' });
    }
}