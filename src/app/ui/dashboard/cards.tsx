import {
    ClockIcon,
    ClipboardDocumentListIcon,
    ReceiptPercentIcon
} from '@heroicons/react/24/outline';
import { fetchCardData } from '@/src/app/lib/data';

const iconMap = {
    numberOfTasks: ClipboardDocumentListIcon,
    trackedHours: ClockIcon,
    trackedVsPlanned: ReceiptPercentIcon,
};

export default async function CardWrapper() {
    const {
        numberOfTasks,
        trackedHours,
        trackedVsPlanned,
    } = await fetchCardData();

    return (
        <>
            <Card title="Total Tasks" value={numberOfTasks} type="numberOfTasks" />
            <Card title="Tracked Hours" value={trackedHours} type="trackedHours" />
            <Card title="Tracked / Planned" value={`${trackedVsPlanned}%`} type="trackedVsPlanned" />
        </>
    );
}

export function Card({
    title,
    value,
    type,
}: {
    title: string;
    value: number | string;
    type: 'numberOfTasks' | 'trackedHours' | 'trackedVsPlanned';
}) {
    const Icon = iconMap[type];

    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
            {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
            <h2 className="ml-2 text-sm font-medium">{title}</h2>
        </div>
        <p
            className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl"
        >
            {value}
        </p>
        </div>
    );
}
