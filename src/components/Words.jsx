export default function Words({
  text,
  as: Tag = "p",
  className = "",
  step = 42,
  start = 0,
}) {
  const words = text.split(" ")

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="word"
          style={{ "--i": start + i * step }}
          aria-hidden="true"
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  )
}
