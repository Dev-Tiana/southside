import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import type { provisionalRooms } from "@shared/hotel";
import { PhotoFrame } from "@/components/SouthsideShell";

type Room = (typeof provisionalRooms)[number];
type RoomMedia = { image?: string; imageAlt?: string };

export function RoomCard({ room, compact = false }: { room: Room; compact?: boolean }) {
  const media = room as Room & RoomMedia;
  return <article className={`room-card ${compact ? "room-card-compact" : ""}`}>
    <PhotoFrame src={media.image} alt={media.imageAlt} label={room.name} detail={media.image ? "Official SouthSide room image" : "Ask the hotel for the current room view"} variant={room.slug.includes("premium") ? "moss" : room.slug.includes("royal") ? "ink" : "copper"} />
    <div className="room-card-body"><span className="room-card-kicker">SouthSide catalogue</span><h3>{room.name}</h3><p>{room.lead}</p><div className="room-card-foot"><strong>{room.amount ? `From ₦${room.amount.toLocaleString()} per night` : "Ask for the current rate"}</strong><Link className="text-link" href={`/rooms/${room.slug}`}>View details <ArrowUpRight size={15} /></Link></div></div>
  </article>;
}
