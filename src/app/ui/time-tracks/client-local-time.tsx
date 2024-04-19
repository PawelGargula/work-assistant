'use client';

import { formatDateToLocal } from "@/src/app/lib/utils";

export default function ClientLocalDate({
    date
} : {
    date: Date | null
}) {
    return <>{formatDateToLocal(date)}</>
}