import { format, isTomorrow } from "date-fns";
import { useNavigate } from "react-router";

export interface EventsCardProps {
  id: string;
  title: string;
  community: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  media: string;
  mediaType: string;
  thumbnail: string | null;
}

const EventsCard = ({ event }: { event: EventsCardProps }) => {
  const date = isTomorrow(event.startDate) ? "Tomorrow, " + format(event.startDate, "h:mm a") : format(event.startDate, "EEEE, h:mm: a");
  const navigate = useNavigate();
  const formatCommunity = event.community.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  return (
    <div className="space-y-2 sm:w-40 xl:w-56 cursor-pointer" onClick={() => navigate(`/event/${event.id}`)}>
      <img src={event.mediaType === "image" ? event.media! : event.thumbnail!} alt={event.title} className="aspect-[4/5] rounded-xl w-full object-cover" />
      <div className="flex items-center space-x-2">
        <img src="/bhag-club.png" className="size-6 rounded-full" />
        <p className="text-sm">{formatCommunity}</p>
      </div>
      <h3 className="line-clamp-2 font-semibold text-md">{event.title}</h3>
      <p className="text-sm">🕓 {date}</p>
      <p className="text-sm">📍 {event.location}</p>
    </div>
  )
}

export default EventsCard;