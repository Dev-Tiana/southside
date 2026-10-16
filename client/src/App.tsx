import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Accommodation from "./pages/Accommodation";
import RoomDetail from "./pages/RoomDetail";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import { Booking, BookingConfirmation } from "./pages/Booking";
import BookingManage from "./pages/BookingManage";
import { About, FAQ, Facilities, Gallery, Offers, Policies, VerificationNotes } from "./pages/ContentPages";

function PageMeta({ title, description }: { title: string; description: string }) {
  if (typeof document !== "undefined") {
    document.title = `${title} | SouthSide Hotel and Suites`;
    const descriptionTag = document.querySelector('meta[name="description"]') || document.head.appendChild(Object.assign(document.createElement("meta"), { name: "description" }));
    descriptionTag.setAttribute("content", description);
  }
  return null;
}

function HomeRoute() { return <><PageMeta title="A considered stay in Abraka" description="SouthSide Hotel and Suites in Abraka. Explore accommodation leads, facilities, contact details, and a clear path to a reservation enquiry." /><Home /></>; }
function AccommodationRoute() { return <><PageMeta title="Accommodation" description="Explore the editable public room catalogue for SouthSide Hotel and Suites in Abraka." /><Accommodation /></>; }
function RoomRoute() { return <><PageMeta title="Room details" description="Review a SouthSide room category lead, its evidence, and the information awaiting hotel approval." /><RoomDetail /></>; }
function ContactRoute() { return <><PageMeta title="Contact and location" description="Contact SouthSide Hotel and Suites in Abraka by telephone, email, or enquiry form." /><Contact /></>; }
function BookingRoute() { return <><PageMeta title="Booking enquiry" description="Check dates and begin a reservation enquiry for SouthSide Hotel and Suites in Abraka." /><Booking /></>; }

function Router() {
  return <Switch>
    <Route path="/" component={HomeRoute} />
    <Route path="/accommodation" component={AccommodationRoute} />
    <Route path="/rooms/:slug" component={RoomRoute} />
    <Route path="/facilities" component={Facilities} />
    <Route path="/gallery" component={Gallery} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={ContactRoute} />
    <Route path="/offers" component={Offers} />
    <Route path="/faq" component={FAQ} />
    <Route path="/policies" component={Policies} />
    <Route path="/verification" component={VerificationNotes} />
    <Route path="/booking" component={BookingRoute} />
    <Route path="/booking/confirmation" component={BookingConfirmation} />
    <Route path="/booking/manage" component={BookingManage} />
    <Route path="/admin" component={Admin} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
