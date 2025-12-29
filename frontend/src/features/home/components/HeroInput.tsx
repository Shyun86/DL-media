import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function HeroInput() {
  const [url, setUrl] = useState("");

  const handleDownload = () => {
    if (!url) {
        alert("Please enter a URL");
        return;
    }
    console.log(`Downloading URL: ${url}`);
    alert(`Downloading URL: ${url}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleDownload();
    }
  };

  return (
    <div className="flex w-full max-w-2xl items-center space-x-2">
      <Input
        type="url"
        placeholder="Enter a video URL (YouTube, TikTok, etc.)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyDown}
        className="h-14 text-lg bg-black/30 border-white/20 placeholder:text-white/40 rounded-xl focus:ring-violet-500 focus:ring-offset-black"
      />
      <Button 
        type="submit" 
        onClick={handleDownload}
        className="h-14 px-8 text-lg bg-violet-600 hover:bg-violet-700 rounded-xl"
      >
        <Download className="mr-2 h-5 w-5" />
        Download
      </Button>
    </div>
  );
}
