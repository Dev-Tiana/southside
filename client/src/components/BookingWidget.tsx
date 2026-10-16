import { ArrowRight, CalendarDays, LoaderCircle, MessageCircle, UsersRound } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { provisionalRooms, hotelProfile } from "@shared/hotel";
import { trpc } from "@/lib/trpc";

function tomorrow() { const value = new Date(); value.setDate(value.getDate() + 1); return value.toISOString().slice(0, 10); }
function plusDays(value: string, days: number) { const date = new Date(`${value}T12:00:00`); date.setDate(date.getDate() + days); return date.toISOString().slice(0, 10); }

export function BookingWidget({ compact = false }: { compact?: boolean }) {
  const [, navigate] = useLocation();
  const [checkIn, setCheckIn] = useState(tomorrow());
  const [checkOut, setCheckOut] = useState(plusDays(tomorrow(), 2));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [roomSlug, setRoomSlug] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<{ configured: boolean; nights: number; rooms: Array<{ name?: string; slug?: string; total?: number; available?: number }> } | null>(null);
  const search = trpc.booking.search.useMutation({ onSuccess: value => { setResult(value as typeof result); setMessage(value.configured ? "Your dates are ready. Review the available rooms below." : "Your dates are ready. Call or WhatsApp the hotel to continue."); }, onError: error => setMessage(error.message || "We could not check those dates. Please try again or contact the hotel.") });
  const nights = useMemo(() => Math.max(0, Math.round((new Date(`${checkOut}T12:00:00`).getTime() - new Date(`${checkIn}T12:00:00`).getTime()) / 86400000)), [checkIn, checkOut]);
  const whatsapp = `${hotelProfile.social.whatsapp}&text=${encodeURIComponent(`Hello SouthSide Hotel and Suites. I would like to ask about a stay from ${checkIn} to ${checkOut}.`)}`;
  const submit = (event: React.FormEvent) => { event.preventDefault(); setMessage(""); setResult(null); search.mutate({ checkIn, checkOut, adults, children, rooms, roomSlug: roomSlug || undefined }); };
  return <section className={`booking-widget ${compact ? "booking-widget-compact" : ""}`} aria-label="Check availability">
    <div className="booking-widget-top"><div><small className="eyebrow">Plan your stay</small><h2>Check your dates</h2></div><span className="booking-time">{nights > 0 ? `${nights} night${nights === 1 ? "" : "s"}` : "Choose your dates"}</span></div>
    <form className="booking-form" onSubmit={submit}>
      <label><span><CalendarDays size={15} /> Check in</span><input type="date" value={checkIn} min={tomorrow()} onChange={event => { setCheckIn(event.target.value); if (event.target.value >= checkOut) setCheckOut(plusDays(event.target.value, 1)); }} required /></label>
      <label><span><CalendarDays size={15} /> Check out</span><input type="date" value={checkOut} min={plusDays(checkIn, 1)} onChange={event => setCheckOut(event.target.value)} required /></label>
      <label><span><UsersRound size={15} /> Adults</span><select value={adults} onChange={event => setAdults(Number(event.target.value))}>{[1, 2, 3, 4, 5, 6].map(value => <option key={value} value={value}>{value}</option>)}</select></label>
      <label><span>Children</span><select value={children} onChange={event => setChildren(Number(event.target.value))}>{[0, 1, 2, 3, 4].map(value => <option key={value} value={value}>{value}</option>)}</select></label>
      <label><span>Rooms</span><select value={rooms} onChange={event => setRooms(Number(event.target.value))}>{[1, 2, 3, 4].map(value => <option key={value} value={value}>{value}</option>)}</select></label>
      <label className="booking-room-select"><span>Room preference</span><select value={roomSlug} onChange={event => setRoomSlug(event.target.value)}><option value="">Any room</option>{provisionalRooms.map(room => <option key={room.slug} value={room.slug}>{room.name}</option>)}</select></label>
      <button className="button button-copper booking-submit" type="submit" disabled={search.isPending}>{search.isPending ? <><LoaderCircle className="spin" size={17} /> Checking</> : <>Check dates <ArrowRight size={17} /></>}</button>
    </form>
    {message && <div className="booking-message" role="status"><strong>{message}</strong><span><a href={`tel:${hotelProfile.phone.replaceAll(" ", "")}`}>Call {hotelProfile.phone}</a> or <a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={13} /> WhatsApp the hotel</a></span></div>}
    {result?.configured && <div className="availability-result"><div><strong>{result.rooms.length ? "Available rooms" : "No rooms match those dates"}</strong><span>Dates checked by the hotel reservation system.</span></div>{result.rooms.slice(0, 3).map(room => <button key={room.slug} type="button" className="availability-row" onClick={() => navigate(`/rooms/${room.slug}`)}><span>{room.name}</span><small>{room.available} available</small><b>{room.total ? `₦${room.total.toLocaleString()}` : "Ask for current rate"}</b></button>)}</div>}
  </section>;
}
