"use client";

import { useState, useEffect } from "react";
import { FiShare2 } from "react-icons/fi";
import Appbar from "./Appbar";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const REFRESH_INTERVAL_MS = 10 * 1000;

// Mock data for demonstration
const mockQueue = [
  {
    id: 1,
    title: "Awesome video 1",
    likes: 5,
    dislikes: 2,
    thumbnail: "/placeholder.svg?height=90&width=120",
    videoId: "dQw4w9WgXcQ",
    haveUpvoted: true,
  },
];

export default function StreamView({
  creatorId,
}: {
  creatorId: string;
}) {
  const [videoLink, setVideoLink] = useState("");
  const [previewVideoId, setPreviewVideoId] = useState("");
  const [queue, setQueue] = useState(mockQueue);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(mockQueue[0]);

  async function refreshStreams() {
    const res = await fetch(`/api/streams/?creatorId=${creatorId}`, {
      credentials: "include",
    });
    console.log(res);
  }

  useEffect(() => {
    refreshStreams();
    const interval = setInterval(() => {
      refreshStreams();
    }, REFRESH_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const extractVideoId = (url: string) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = extractVideoId(videoLink);
    if (videoId) {
      const newSong = {
        id: queue.length + 1,
        title: `New video ${queue.length + 1}`,
        likes: 0,
        dislikes: 0,
        thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg`,
        videoId,
        haveUpvoted: false,
      };
      setQueue([...queue, newSong]);
      setVideoLink("");
      setPreviewVideoId("");
    }
  };

  const handleVote = (id: number, isLike: boolean) => {
    setQueue(
      queue
        .map((video) =>
          video.id === id
            ? {
                ...video,
                likes: isLike ? video.likes + 1 : video.likes,
                dislikes: !isLike ? video.dislikes + 1 : video.dislikes,
                haveUpvoted: isLike,
              }
            : video
        )
        .sort((a, b) => b.likes - a.likes)
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Mousikos",
          text: "Check out this awesome video queue!",
          url: window.location.href,
        })
        .then(() => console.log("Thanks for sharing!"))
        .catch(console.error);
    } else {
      alert("Your browser doesn't support the Web Share API.");
    }
  };

  const playNext = () => {
    if (queue.length > 0) {
      setCurrentlyPlaying(queue[0]);
      setQueue(queue.slice(1));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <Appbar />
      <div className="container mx-auto p-4 space-y-6 flex-grow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Song Voting Queue</h1>
          <button
            onClick={handleShare}
            className="flex items-center p-2 bg-purple-600 hover:bg-purple-700 rounded text-gray-100"
          >
            <FiShare2 className="h-6 w-6 mr-2" /> Share
          </button>
        </div>
        
        {/* Add flexbox layout for two columns */}
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {/* Left side: Add a Song */}
          <section className="w-full md:w-1/3 space-y-4">
            <h2 className="text-2xl font-semibold mb-2">Add a Song</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="text"
                placeholder="Paste YouTube video link here"
                value={videoLink}
                onChange={(e) => {
                  setVideoLink(e.target.value);
                  const videoId = extractVideoId(e.target.value);
                  setPreviewVideoId(videoId || "");
                }}
                className="w-full p-2 bg-gray-800 text-gray-100 border border-gray-700 rounded"
              />
              <button
                type="submit"
                className="w-full p-2 bg-purple-600 hover:bg-purple-700 rounded"
              >
                Add to Queue
              </button>
            </form>
            {previewVideoId && (
              <div className="mt-2 aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${previewVideoId}`}
                  title="YouTube video preview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </section>

          {/* Right side: Upcoming Songs + Now Playing */}
          <section className="w-full md:w-2/3 space-y-6">
            {/* Upcoming Songs */}
            <div>
              <h2 className="text-2xl font-semibold mb-2">Upcoming Songs</h2>
              <div className="space-y-2">
                {queue.map((video) => (
                  <div
                    key={video.id}
                    className="bg-gray-800 border border-gray-700 rounded p-4 flex items-center space-x-4"
                  >
                    <img
                      src={video.thumbnail}
                      alt="video thumbnail"
                      className="w-24 h-18 object-cover rounded"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold">{video.title}</h3>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleVote(video.id, !video.haveUpvoted)}
                        className="flex items-center space-x-1 p-2 border border-gray-600 rounded hover:bg-gray-700"
                      >
                        {video.haveUpvoted ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronUp className="h-4 w-4" />
                        )}
                        <span>{video.likes}</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Now Playing */}
            <div>
              <h2 className="text-2xl font-semibold mb-2">Now Playing</h2>
              <div className="space-y-2">
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${currentlyPlaying.videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <button
                  onClick={playNext}
                  className="w-full p-2 bg-purple-600 hover:bg-purple-700 rounded"
                >
                  Play Next
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}