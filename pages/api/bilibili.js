const fetch = require('isomorphic-fetch');

export default async function handler(req, res) {
    const { uid } = req.query; // 从查询参数中获取 uid 值

    if (!uid) {
        return res.status(400).json({ error: 'Missing uid parameter' });
    }

    const apiUrl = `https://api.bilibili.com/x/space/bangumi/follow/list?type=1&follow_status=0&pn=1&ps=15&vmid=${uid}`; // 将 uid 添加到 API URL 中

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const programList = data.data.list;

        const programs = programList.map(program => ({
            title: program.title,
            epNum: program.new_ep.index_show,
            epTitle: program.new_ep.long_title,
            epCover: program.new_ep.cover,
            epUrl: program.url,
        }));

        res.status(200).json(programs);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
}
