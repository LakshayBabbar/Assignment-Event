import React from 'react'
import EventsCard, { EventsCardProps } from '../../components/ui/EventsCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"


const Home = () => {
  const [data, setData] = React.useState<[EventsCardProps] | null>(null);
  const [filteredData, setFilteredData] = React.useState<[EventsCardProps] | null>(null);

  React.useEffect(() => {
    const fetchData = localStorage.getItem('events-data');
    if (fetchData) {
      const parseData = JSON.parse(fetchData);
      setData(parseData);

      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      const filteredData = parseData.filter((event: EventsCardProps) => {
        const eventDate = new Date(event.startDate);
        return eventDate >= startOfMonth && eventDate <= endOfMonth;
      });

      setFilteredData(filteredData);
    }
  }, []);


  return (
    <div className='p-4 w-full flex flex-col items-center gap-10 mt-10'>
      <h1 className='text-4xl'>Events</h1>

      <Tabs defaultValue="all">
        <TabsList className='mb-5'>
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="currMonth">This Month</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 justify-items-center gap-4'>
            {data && data.length > 0 ? data?.map((event: EventsCardProps) => {
              return (
                <EventsCard key={event.id} event={event} />
              )
            }) : <p className='text-center'>No events found</p>}
          </div>
        </TabsContent>
        <TabsContent value="currMonth">
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 justify-items-center gap-4'>
            {filteredData && filteredData.length > 0 ? filteredData.map((event: EventsCardProps) => {
              return (
                <EventsCard key={event.id} event={event} />
              );
            }) : <p className='text-center'>No events found</p>}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Home;