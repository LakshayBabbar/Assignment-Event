import { useParams } from 'react-router';
import MarkDown from 'markdown-to-jsx';
import { useEffect, useState } from 'react';
import { EventsCardProps } from '../../../components/ui/EventsCard';

const EventPage = () => {
    const { id } = useParams();
    const [data, setData] = useState<EventsCardProps>();
    
    useEffect(() => {
        const fetchData = localStorage.getItem('events-data');
        const parsedData = JSON.parse(fetchData || '[]');
        const filteredData = parsedData.find((item: EventsCardProps) => item.id === id);
        setData(filteredData);
    }, [id]);
    const date = new Date(data?.startDate || '');

    return (
        <div className='w-full place-items-center'>
            <div className='px-5 sm:w-4/5 md:w-3/4 xl:w-1/2 space-y-6 mt-16'>
                <h1 className='text-4xl sm:text-5xl font-serif'>{data?.title}</h1>
                <div className='place-self-center py-4'>
                    {data?.mediaType === 'image' ? <img src={data?.media} alt={data?.title} className='' /> : <video src={data?.media} className='w-full' autoPlay controls />}
                </div>
                <div className='flex justify-between'>
                    <p>📍 {data?.location}</p>
                    <p>🕓 {date?.toLocaleString()}</p>
                </div>
                <div className='sm:prose-xl'>
                    <MarkDown>
                        {data?.description || ""}
                    </MarkDown>
                </div>
            </div>
        </div>
    )
}

export default EventPage;