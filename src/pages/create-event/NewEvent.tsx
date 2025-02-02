import React, { ChangeEvent, FormEvent, lazy } from 'react'
import { ChevronUp, ChevronDown, ImagePlus, Dot, MapPin, PenLine } from 'lucide-react'
import { Input } from '../../components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";
import DatePicker from '../../components/ui/date-picker';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router';
import { useToast } from '../../hooks/use-toast';
import { getVideoThumbnail, resizeImage } from '../../lib/helpers';
const ReactQuill = lazy(() => import('react-quill'));
import 'react-quill/dist/quill.snow.css';

const NewEvent = () => {
    const [media, setMedia] = React.useState<string | null>(null);
    const [thumbnail, setThumbnail] = React.useState<string | null>(null);
    const [mediaType, setMediaType] = React.useState<string | null>(null);
    const [formData, setFormData] = React.useState({
        title: "",
        description: "",
        location: "",
        community: "",
    });
    const [startDate, setStartDate] = React.useState<Date | undefined>();
    const [endDate, setEndDate] = React.useState<Date | undefined>();
    const [isFormValid, setIsFormValid] = React.useState(false);
    const router = useNavigate();
    const { toast } = useToast();

    React.useEffect(() => {
        if (formData.community && formData.title && formData.description && formData.location && startDate && endDate && media) {
            setIsFormValid(true);
        }
    }, [media, formData, startDate, endDate]);

    const onValChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return { ...prev, [name]: value };
        });
    }

    const handelFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event: ProgressEvent<FileReader>) => {
            const mediaData = event.target?.result as string;
            if (!mediaData) return;

            if (file.type.startsWith("image/")) {
                setMediaType("image");
                const resizedImage = await resizeImage(mediaData, 800, 1000); // Resize to 4:5 aspect ratio
                setMedia(resizedImage);
            } else if (file.type.startsWith("video/")) {
                if (file.size > 5 * 1024 * 1024) { // 5MB limit
                    alert("Video size should be less than 5MB");
                    return;
                }
                setMediaType("video");
                setMedia(mediaData);

                const thumbnail = await getVideoThumbnail(file);
                if (thumbnail) {
                    const resizedThumbnail = await resizeImage(thumbnail, 800, 1000); // Resize to 4:5 aspect ratio
                    setThumbnail(resizedThumbnail);
                }
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const eventData = {
            id: Math.random().toString().substring(9),
            ...formData,
            startDate,
            endDate,
            media,
            mediaType,
            thumbnail,
        };
        const data = JSON.parse(localStorage.getItem("events-data") || "[]");
        data.push(eventData);
        localStorage.setItem("events-data", JSON.stringify(data));
        toast({
            title: "Event Created",
            description: "Your event has been created successfully"
        });
        router(`/event/${eventData.id}`);
    };

    const labelStyle = "flex items-center gap-2";
    const iconStyle = "text-slate-500 size-5";
    const hrStyle = "h-2 bg-slate-200 sm:hidden";
    const defaultDivStyle = "px-5 space-y-2";
    const modules = {
        history: [{ delay: 500 }, { maxStack: 100 }, { userOnly: false }],
        toolbar: [
            [{ header: [2, 3, false] }],
            ["bold", "italic", "underline", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
        ],
    };

    return (
        <div className='text-gray-700 w-full place-self-center'>
            <h1 className='text-center my-8 text-black text-xl'>Create New Event</h1>
            <form className='sm:w-3/4 place-self-center space-y-8' onSubmit={handleSubmit}>

                <div className={defaultDivStyle}>
                    <div className='mb-8 rounded-2xl relative flex items-center justify-center h-[22rem] overflow-hidden bg-gradient-to-t from-blue-200 to-blue-50'>
                        <input id='file-upload' type="file" accept='.jpg,.png,.jpeg,.mp4' className='h-full w-full hidden' onChange={handelFileChange} required />
                        <label htmlFor='file-upload' className='flex gap-2 px-2 py-1 bg-white rounded-md items-center absolute bottom-6 cursor-pointer drop-shadow-md]'><ImagePlus strokeWidth={1.2} size={20} /> {media ? "Replace Photo" : "Add Photo"}</label>
                        {media ? <img src={mediaType === "image" ? media! : thumbnail!} alt="File" className='w-full h-full object-cover aspect-[4/5]' /> : <img src="/pic-logo.png" className='size-36' />}
                    </div>
                </div>

                <div className={defaultDivStyle}>
                    <label htmlFor="comm">Select Community</label>
                    <Select onValueChange={(val) => setFormData((prev) => { return { ...prev, community: val } })} required>
                        <SelectTrigger id='comm' className="rounded-full px-4">
                            <SelectValue placeholder="Choose" defaultValue={formData.community} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="tech-community">Tech Community</SelectItem>
                            <SelectItem value="health-community">Health Community</SelectItem>
                            <SelectItem value="cloud-community">Cloud Community</SelectItem>
                            <SelectItem value="nature-community">Nature Community</SelectItem>
                            <SelectItem value="food-community">Food Community</SelectItem>
                            <SelectItem value="entertainment-community">Entertainment Community</SelectItem>
                            <SelectItem value="travel-community">Travel Community</SelectItem>
                            <SelectItem value="devops-community">DevOps Coomunity</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className={defaultDivStyle}>
                    <label htmlFor="title">Event Title</label>
                    <Input type="text" id='title' value={formData.title} name='title' className='rounded-full' onChange={onValChange} required />
                </div>

                <hr className={hrStyle} />

                <div className='px-5 flex items-center justify-between sm:justify-normal gap-2 sm:gap-10 relative'>
                    <div className='flex flex-col gap-8'>
                        <label htmlFor="start-date" className={labelStyle}><ChevronUp className={iconStyle} />Starts</label>
                        <label htmlFor="end-date" className={labelStyle}><ChevronDown className={iconStyle} />Ends</label>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <DatePicker id='start-date' date={startDate} setDate={setStartDate} />
                        <DatePicker id='end-date' date={endDate} setDate={setEndDate} />
                    </div>
                    <div className='left-[18px] absolute flex flex-col p-0 text-slate-500'>
                        <Dot height={6} strokeWidth={6} />
                        <Dot height={6} strokeWidth={6} />
                        <Dot height={6} strokeWidth={6} />
                        <Dot height={6} strokeWidth={6} />
                        <Dot height={6} strokeWidth={6} />
                        <Dot height={6} strokeWidth={6} />
                    </div>
                </div>

                <hr className={hrStyle} />

                <div className={defaultDivStyle}>
                    <label htmlFor="location" className={labelStyle}><MapPin className={iconStyle} />Choose Location</label>
                    <Input type='text' id='location' value={formData.location} name='location' onChange={onValChange} required />
                </div>

                <hr className={hrStyle} />

                <div className={defaultDivStyle}>
                    <label htmlFor="description" className={labelStyle}><PenLine className={iconStyle} />Add Description</label>
                    <div className='h-56'>
                        <ReactQuill id='description' theme="snow" value={formData.description}
                            onChange={(val => setFormData((prev) => { return { ...prev, description: val } }))} className='h-4/5'
                            modules={modules} />
                    </div>
                </div>

                <div className='px-5'>
                    <Button type='submit' className='my-5 rounded-full bg-[#0033F7] text-white w-full hover:bg-[#0031f7e1] disabled:cursor-not-allowed' size="lg" disabled={!isFormValid}>Create Event</Button>
                </div>
            </form>
        </div>
    )
}

export default NewEvent;