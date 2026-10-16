import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { RoomCard } from "@/components/RoomCard";
import { SectionLabel, SouthsideShell, StatusPill } from "@/components/SouthsideShell";
import { provisionalRooms } from "@shared/hotel";

export default function Accommodation() {
  return <SouthsideShell><section className="page-hero"><div className="page-width"><SectionLabel>Accommodation</SectionLabel><h1>Choose the room that fits your stay.</h1><p>These categories are drawn from public SouthSide leads and remain editable. The hotel must confirm current names, room details, rates, inventory, and approved photographs before live reservation use.</p></div></section><section className="page-content"><div className="page-width"><div className="integrity" style={{ marginBottom: 38 }}><div className="integrity-inner"><div><StatusPill>Public catalogue leads</StatusPill><p style={{ marginTop: 9 }}>A price shown here is a reference only. It is not an offer or a confirmed current rate.</p></div><Link className="text-link" href="/booking">Check an enquiry date <ArrowRight size={15} /></Link></div></div><div className="catalogue-grid">{provisionalRooms.map(room => <RoomCard key={room.slug} room={room} />)}</div></div></section></SouthsideShell>;
}
