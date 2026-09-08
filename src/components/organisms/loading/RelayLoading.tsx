import {
  Bot,
  FileText,
  Hash,
  MessageCircle,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

const loadingItems = [
  {
    type: "relay",
  },
  {
    type: "icon",
    icon: MessageCircle,
    iconColor: "text-blue-500",
    background: "bg-blue-50",
  },
  {
    type: "icon",
    icon: Hash,
    iconColor: "text-violet-500",
    background: "bg-violet-50",
  },
  {
    type: "icon",
    icon: Users,
    iconColor: "text-pink-500",
    background: "bg-pink-50",
  },
  {
    type: "icon",
    icon: FileText,
    iconColor: "text-orange-500",
    background: "bg-orange-50",
  },
  {
    type: "icon",
    icon: Bot,
    iconColor: "text-cyan-500",
    background: "bg-cyan-50",
  },
];

export const RelayLoading = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((previous) => {
        return (previous + 1) % loadingItems.length;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const currentItem = loadingItems[currentIndex];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div
        key={currentIndex}
        className={`
          relay-loading-icon
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          ${
            currentItem.type === "relay"
              ? "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
              : currentItem.background
          }
        `}
      >
        {currentItem.type === "relay" ? (
          <span className="text-xl font-black text-white">
            R
          </span>
        ) : (
          currentItem.icon && (
            <currentItem.icon
              className={`h-6 w-6 ${currentItem.iconColor}`}
              strokeWidth={1.8}
            />
          )
        )}
      </div>
    </div>
  );
};