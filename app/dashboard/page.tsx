"use client";

// import { useState, useEffect } from "react";
// import { FiShare2 } from "react-icons/fi";
// import Appbar from "../components/Appbar";
// import { Button } from "@/components/ui/button";
// import { ChevronDown, ChevronUp } from "lucide-react";
import StreamView from "../components/StreamView";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const REFRESH_INTERVAL_MS = 10 * 1000;

// Mock data for demonstration
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockQueue = [
  {
    id: 1,
    title: "Awesome video 1",
    likes: 5,
    dislikes: 2,
    thumbnail: "/placeholder.svg?height=90&width=120",
    videoId: "dQw4w9WgXcQ",
    haveUpvoted: true, // Boolean value
  },
];

export default function Dashboard() {
  // Declare creatorId
  const creatorId = "yourCreatorId"; // Replace with actual creator ID

  return (
    <StreamView creatorId={creatorId} />
  );
}
