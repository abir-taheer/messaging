import { REDIS_URL } from "@/constants";
import Redis from "ioredis";

export const publisher = new Redis(REDIS_URL);
export const subscriber = new Redis(REDIS_URL);
