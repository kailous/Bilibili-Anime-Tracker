import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // 导入 useRouter
import Head from 'next/head';
import styles from './AnimeList.module.css';
import 'src/app/globals.css';

interface Anime {
    title: string;
    epNum: string;
    epTitle: string;
    epCover: string; // 修改为实际封面图片的 URL
    epUrl: string;
}

function AnimeList() {
    const router = useRouter(); // 使用 useRouter 获取路由信息
    const { uid } = router.query; // 获取查询参数中的 uid 值

    const [animeData, setAnimeData] = useState<Anime[]>([]);

    useEffect(() => {
        if (uid) { // 检查 uid 是否存在
            fetch(`/api/bilibili?uid=${uid}`) // 将 uid 添加到请求中
                .then(response => response.json())
                .then((data: Anime[]) => setAnimeData(data))
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [uid]);

    return (
        <div>
            <Head>
                <meta name="referrer" content="never" />
            </Head>
            <ul className={styles['anime-list']}>
                {animeData.map((anime, index) => (
                    <li className={styles['anime-item']} key={index}>
                        <a className={styles['anime-link']} href={anime.epUrl} target={"_blank"}>
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
