// pages/index.tsx
// Bilibili 番剧列表

import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './AnimeList.module.css';
import 'src/app/globals.css';

function Index() {
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

    const [animeData, setAnimeData] = useState<Anime[]>([]);

    useEffect(() => {
        fetch('/api/bilibili')
            .then(response => response.json())
            .then(data => {
                setAnimeData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <Head>
                <meta name="referrer" content="never" />
            </Head>
            <ul className={styles['anime-list']}>
                {animeData.map((anime, index) => (
                    <li className={styles['anime-item']} key={index}>
                        <a className={styles['anime-link']} href={anime.epUrl} target="_blank" rel="noopener noreferrer">
                            <img className={styles['anime-cover']} src={anime.epCover} alt={`Cover for ${anime.title}`} />
                            <div className={styles['info']}>
                                <h2 className={styles['anime-title']}>{anime.title}</h2>
                                <div className={styles['anime-episode']}>
                                    <p>
                                        {anime.epNum}/
                                        {anime.epStart < anime.epEnd ? (
                                            <span className={styles['watched-episode']}>
                                        看到{anime.epStart}话{anime.epTime}
                                    </span>
                                        ) : (
                                            `看到${anime.epStart}话`
                                        )}
                                    </p>
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
