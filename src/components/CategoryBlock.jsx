import { useSong } from "../context/SongContext";

function CategoryBlock({title, songs}) {
    const {deleteSong} = useSong();
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
                        {song.priority}. ｢{song.title}｣ by {song.artist}
                        <button 
                            onClick={() => deleteSong(song.title, song.artist)}
                        >❌️</button><br />
                         {song.url}
                    </li>
                ))}
            </ul>
        )}
        </>
    )
}

export default CategoryBlock;