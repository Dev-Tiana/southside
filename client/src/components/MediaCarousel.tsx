import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type CarouselItem = {
  src: string;
  alt: string;
  label?: string;
};

export function MediaCarousel({ items, className = "", interval = 4500 }: { items: readonly CarouselItem[]; className?: string; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    if (items.length < 2 || paused) return;
    const timer = window.setInterval(() => setIndex(current => (current + 1) % items.length), interval);
    return () => window.clearInterval(timer);
  }, [items.length, interval, paused]);

  useEffect(() => {
    setIndex(current => Math.min(current, Math.max(0, items.length - 1)));
  }, [items.length]);

  if (!items.length) return null;
  const current = items[index];
  const move = (direction: number) => setIndex(value => (value + direction + items.length) % items.length);

  return <div
    className={`media-carousel ${className}`}
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onFocus={() => setPaused(true)}
    onBlur={() => setPaused(false)}
    onTouchStart={event => { touchStart.current = event.changedTouches[0]?.clientX ?? null; }}
    onTouchEnd={event => {
      if (touchStart.current === null) return;
      const delta = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
      if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1);
      touchStart.current = null;
    }}
    aria-roledescription="carousel"
    aria-label={current.label ?? "SouthSide hotel photographs"}
  >
    <div className="media-carousel-stage">
      {items.map((item, itemIndex) => <img
        key={`${item.src}-${itemIndex}`}
        className={`media-carousel-image ${itemIndex === index ? "media-carousel-image-active" : ""}`}
        src={item.src}
        alt={itemIndex === index ? item.alt : ""}
        aria-hidden={itemIndex === index ? undefined : true}
        loading={itemIndex === 0 ? "eager" : "lazy"}
      />)}
    </div>
    {items.length > 1 && <>
      <button type="button" className="media-carousel-arrow media-carousel-arrow-left" onClick={() => move(-1)} aria-label="Previous photograph"><ChevronLeft size={18} /></button>
      <button type="button" className="media-carousel-arrow media-carousel-arrow-right" onClick={() => move(1)} aria-label="Next photograph"><ChevronRight size={18} /></button>
      <div className="media-carousel-dots" role="tablist" aria-label="Choose photograph">
        {items.map((item, itemIndex) => <button key={`${item.src}-dot`} type="button" role="tab" aria-selected={itemIndex === index} aria-label={`Show photograph ${itemIndex + 1}`} className={itemIndex === index ? "media-carousel-dot-active" : ""} onClick={() => setIndex(itemIndex)} />)}
      </div>
    </>}
    {current.label && <span className="media-carousel-label">{current.label}</span>}
  </div>;
}
