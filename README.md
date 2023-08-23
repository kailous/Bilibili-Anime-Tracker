# Bilibili Anime Tracker 哔哩哔哩 追番列表

这是一个展示 Bilibili 追剧列表的网站，使用 Next.js 开发。</br>
可以一键在 Vercel 上部署。</br>

## 功能特点

- 获取指定用户的追番列表信息。
- 在前端展示追番数据，包括番剧标题、集数、封面等。
- 支持直接点击跳转到哔哩哔哩番剧页面。
- 显示追番进度，包括已看集数、总集数、观看进度条。

## 部署说明
复制本仓库到你的 Github 仓库，然后在 Vercel 上部署。</br>
部署完成后，你需要配置环境变量</br>
环境变量的字段名需要和下表一致，值则是你的 Bilibili Cookie 中对应的值。</br>

| 环境变量 | 字段名称 |
| --- |-------------------|
|REACT_APP_UUID| _uuid             |
|REACT_APP_Buvid3| buvid3            |
|REACT_APP_SID| sid               |
|REACT_APP_DedeUserID| DedeUserID        |
|REACT_APP_DedeUserID_ckMd5| DedeUserID__ckMd5 |
|REACT_APP_SESSDATA| SESSDATA          |
|REACT_APP_bili_jct| bili_jct          |

你可以在 Vercel 绑定自己的域名就可以访问了</br>

