import { Link } from "react-router-dom";
import { useSong } from "../context/SongContext";

function CategoryBlock({title, songs}) {
    return(
        <>
        <h2>{title}</h2>
        {songs.length === 0 ? (
            <p>曲が未登録です</p>
        ) : (
            <ul>
                {[...songs]
                  .sort((a, b) => a.priority - b.priority)
                  .map((song, index) => (
                    <li key={index}>
                        {song.priority}.
                        <Link to={`/song/${encodeURIComponent(song.title)}/${encodeURIComponent(song.artist)}`}>
                            ｢{song.title}｣ by {song.artist}
                        </Link>
                    </li>
                ))}
            </ul>
        )}
        </>
    );
}

export default CategoryBlock;