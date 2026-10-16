import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import type { provisionalRooms } from "@shared/hotel";
import { PhotoFrame, StatusPill } from "@/components/SouthsideShell";

type Room = (typeof provisionalRooms)[number];

export function RoomCard({ room, compact = false }: { room: Room; compact?: boolean }) {
  return <article className={`room-card ${compact ? "room-card-compact" : ""}`}>
    <PhotoFrame label={room.name} detail="Approved hotel photography will appear here" variant={room.slug.includes("premium") ? "moss" : room.slug.includes("royal") ? "ink" : "copper"} />
    <div className="room-card-body"><StatusPill>{room.verification === "awaiting approval" ? "Awaiting approval" : "Public lead"}</StatusPill><h3>{room.name}</h3><p>{room.lead}</p><div className="room-card-foot"><span>{room.amount ? `From ₦${room.amount.toLocaleString()}` : "Rate pending"}</span><Link className="text-link" href={`/rooms/${room.slug}`}>View details <ArrowUpRight size={15} /></Link></div></div>
  </article>;
}
