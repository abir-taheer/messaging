import Redis from "ioredis";
import { REDIS_URL } from "@/constants";

export const publisher = new Redis(REDIS_URL);
export const subscriber = new Redis(REDIS_URL);
