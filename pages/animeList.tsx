import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './AnimeList.module.css';
import 'src/app/globals.css'

interface Anime {
    title: string;
    epNum: string;
    epTitle: string;
    epCover: string; // 修改为实际封面图片的 URL
    epUrl: string;
}

function AnimeList() {
    const [animeData, setAnimeData] = useState<Anime[]>([]);

    useEffect(() => {
        fetch('/api/bilibili') // 使用你的 API 路由路径
            .then(response => response.json())
            .then((data: Anime[]) => setAnimeData(data))
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
                        <a className={styles['anime-link']} href={anime.epUrl}>
                            <img className={styles['anime-cover']} src={anime.epCover} alt={`Cover for ${anime.title}`} />
                            <div className={styles['info']}>
                                <h2 className={styles['anime-title']}>{anime.title}</h2>
                                <div className={styles['anime-episode']}>
                                <p>{anime.epNum}</p>
                                <p>{anime.epTitle}</p>
                                </div>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AnimeList;
