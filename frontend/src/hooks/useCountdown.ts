"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const calculateTimeLeft = (targetDate: string | Date): TimeLeft => {
    const end = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const difference = end - now;

    if (difference <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
};

export function useCountdown(targetDate: string | Date) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));
    const [isExpired, setIsExpired] = useState(() => {
        const initialTime = calculateTimeLeft(targetDate);
        return initialTime.days === 0 && initialTime.hours === 0 && initialTime.minutes === 0 && initialTime.seconds === 0;
    });

    useEffect(() => {

        const timer = setInterval(() => {
            const remaining = calculateTimeLeft(targetDate);
            setTimeLeft(remaining);
            if (remaining.days === 0 && remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0) {
                setIsExpired(true);
                clearInterval(timer);
            } else {
                setIsExpired(false);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return { ...timeLeft, isExpired };
}
