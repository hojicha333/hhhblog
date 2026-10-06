import editorial from "../assets/images/editorial.webp";
import consoleImage from "../assets/images/console.webp";
import rooms from "../assets/images/rooms.webp";

export const covers = {
  editorial,
  console: consoleImage,
  rooms
} as const;

export type CoverName = keyof typeof covers;
