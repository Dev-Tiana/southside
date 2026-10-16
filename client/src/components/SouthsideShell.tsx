import { Link } from "wouter";
import { ArrowUpRight, Instagram, MapPin, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { hotelProfile } from "@shared/hotel";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return <Link href="/" className={`brand-mark ${compact ? "brand-mark-compact" : ""}`} aria-label="SouthSide Hotel and Suites home"><span className="brand-mark-icon">SS</span><span><strong>SouthSide</strong><em>Hotel and Suites</em></span></Link>;
}

export function StatusPill({ children, tone = "warm" }: { children: React.ReactNode; tone?: "warm" | "ink" | "pale" }) {
  return <span className={`status-pill status-${tone}`}>{children}</span>;
}

export function PhotoFrame({ label, detail, className = "", variant = "copper" }: { label: string; detail: string; className?: string; variant?: "copper" | "moss" | "ink" }) {
  return <div className={`photo-frame photo-${variant} ${className}`} role="img" aria-label={`${label}. ${detail}`}>
    <span className="photo-shape photo-shape-one" />
    <span className="photo-shape photo-shape-two" />
    <span className="photo-shape photo-shape-three" />
    <div className="photo-frame-copy"><small>Approval preview</small><strong>{label}</strong><span>{detail}</span></div>
  </div>;
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="section-label"><span />{children}</div>;
}

export function SouthsideShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const links = [{ href: "/accommodation", label: "Stay" }, { href: "/facilities", label: "Spaces" }, { href: "/gallery", label: "Gallery" }, { href: "/about", label: "Our story" }, { href: "/contact", label: "Contact" }];
  return <div className="site-shell">
    <header className="site-header">
      <div className="site-header-inner">
        <BrandMark compact />
        <nav className={`main-nav ${open ? "nav-open" : ""}`} aria-label="Primary navigation">
          {links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
          <Link href="/faq" onClick={() => setOpen(false)}>Questions</Link>
        </nav>
        <div className="header-actions"><a className="header-phone" href={`tel:${hotelProfile.phone.replaceAll(" ", "")}`}><Phone size={15} /> Call the hotel</a><Link className="button button-small button-copper" href="/booking">Check availability <ArrowUpRight size={15} /></Link></div>
        <button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
    </header>
    <main>{children}</main>
    <footer className="site-footer">
      <div className="footer-grid page-width">
        <div><BrandMark /><p className="footer-intro">A considered place to arrive in Abraka. Explore the room catalogue, ask a question, or speak with the hotel directly.</p><div className="footer-social"><a href={hotelProfile.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17} /></a><a href={hotelProfile.social.maps} target="_blank" rel="noreferrer" aria-label="Google Maps"><MapPin size={17} /></a></div></div>
        <div><small className="footer-heading">Explore</small><Link href="/accommodation">Accommodation</Link><Link href="/facilities">Spaces and facilities</Link><Link href="/gallery">Gallery</Link><Link href="/faq">Questions</Link></div>
        <div><small className="footer-heading">Speak with us</small><a href={`tel:${hotelProfile.phone.replaceAll(" ", "")}`}>{hotelProfile.phone}</a><a href={`mailto:${hotelProfile.email}`}>{hotelProfile.email}</a><span>{hotelProfile.location}</span></div>
        <div><small className="footer-heading">Before booking</small><Link href="/policies">Policies awaiting approval</Link><Link href="/contact">Contact and directions</Link><span className="footer-note">Prices and room details shown as public leads are not live until approved by the hotel.</span></div>
      </div>
      <div className="footer-bottom page-width"><span>© {new Date().getFullYear()} SouthSide Hotel and Suites</span><span>Made for clear, direct booking</span></div>
    </footer>
  </div>;
}
