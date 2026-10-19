import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import type { provisionalRooms } from "@shared/hotel";
import { MediaCarousel } from "@/components/MediaCarousel";

type Room = (typeof provisionalRooms)[number];

export function RoomCard({ room, compact = false }: { room: Room; compact?: boolean }) {
  return <article className={`room-card ${compact ? "room-card-compact" : ""}`}>
    <MediaCarousel items={room.media} className="room-card-carousel" />
    <div className="room-card-body"><span className="room-card-kicker">SouthSide catalogue</span><h3>{room.name}</h3><p>{room.lead}</p><div className="room-card-foot"><strong>{room.amount ? `From ₦${room.amount.toLocaleString()} per night` : "Ask for the current rate"}</strong><Link className="text-link" href={`/rooms/${room.slug}`}>View details <ArrowUpRight size={15} /></Link></div></div>
  </article>;
}
