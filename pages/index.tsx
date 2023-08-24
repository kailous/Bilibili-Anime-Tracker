// pages/index.tsx
// Bilibili 番剧列表

import {useState, useEffect} from 'react';
import Head from 'next/head';
import styles from './AnimeList.module.css';
import 'src/app/globals.css';

// 创建Index组件
function Index() {

    // 定义Anime接口
    interface Anime {
        title: string;
        epNum: string;
        epTitle: string;
        epCover: string;
        epUrl: string;
        epProgress: string;
        epTime: string;
        epStart: number;
        epEnd: number;
    }

    //使用useState钩子来管理状态
    const [animeData, setAnimeData] = useState<Anime[]>([]);

    // 使用 useEffect 钩子来在组件渲染时执行数据获取操作
    useEffect(() => {
        fetch('/api/bilibili') // 使用 fetch API 来获取数据
            .then(response => response.json()) // 获取到数据后将其转换为 JSON 格式
            .then(data => {
                setAnimeData(data); // 将获取到的数据设置到状态中
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className={styles['box']}>
            <Head>
                <meta name="referrer" content="never"/>
            </Head>
            <ul className={styles['anime-list']}>
                {animeData.map((anime, index) => (
                    <li className={styles['anime-item']} key={index}>

                        {/*// 为每个番剧创建一个链接*/}
                        <a className={styles['anime-link']} href={anime.epUrl} target="_blank"
                           rel="noopener noreferrer" title={`${anime.title}\n第${anime.epStart}话-${anime.epTitle}`}>
                            <img className={styles['anime-cover']} src={anime.epCover}
                                 alt={`Cover for ${anime.title}`}/>
                            <div className={styles['info']}>
                                <p className={styles['anime-title']}>{anime.title}</p>
                                <div className={styles['anime-episode']}>

                                    {/*// 看完的和没看完的显示不同的内容*/}
                                    {anime.epStart < anime.epEnd ? (
                                        <p>{anime.epNum}/<span className={styles['watched-episode']}>看到{anime.epStart}话{anime.epTime}</span></p>
                                    ) : (
                                        <p>已看完全部{anime.epStart}话</p>
                                    )}
                                    {/*鼠标指针滑过的时候显示完整的标题*/}
                                    <p>{anime.epTitle}</p>
                                    {/* 添加进度条 */}
                                    <div className={styles['progress-bar']}>
                                        <div
                                            className={styles['progress']}
                                            style={{
                                                width: `${(anime.epStart / anime.epEnd) * 100}%`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>

    );
}

export default Index;
