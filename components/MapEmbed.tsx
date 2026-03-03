import { SHOW_CONFIG } from "@/data/config";

export default function MapEmbed({ height = 400 }: { height?: number }) {
  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg">
      <iframe
        src={SHOW_CONFIG.googleMapsEmbedUrl}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map showing ${SHOW_CONFIG.venueName}`}
      />
    </div>
  );
}
