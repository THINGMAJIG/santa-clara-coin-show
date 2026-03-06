export default function MapEmbed({
  height = 400,
  src,
  venueName,
}: {
  height?: number;
  src: string;
  venueName: string;
}) {
  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg">
      <iframe
        src={src}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map showing ${venueName}`}
      />
    </div>
  );
}
