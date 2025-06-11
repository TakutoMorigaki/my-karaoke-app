function CategoryBlock({title, songs}) {
    return(
        <>
        <h2>{title}</h2>
        {songs.length === 0 ? (
            <p>曲が未登録です</p>
        ) : (
            <ul>
                {songs.map((song, index) => (
                    <li key={index}>
                        ｢{song.title}｣ by {song.artist}
                    </li>
                ))}
            </ul>
        )}
        </>
    )
}

export default CategoryBlock;