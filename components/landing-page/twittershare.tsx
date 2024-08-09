"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Linkedin, MessageCircleHeart, Twitter } from "lucide-react"
import { FacebookShareButton, LinkedinShareButton, PinterestShareButton, TwitterShareButton } from "react-share"

export const Share = ({ shareText, shareTitle }: { shareText: string; shareTitle: string }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <TwitterShareButton url="https://taskequalizer.vercel.app" title={shareTitle} className="text-primary-foreground">
        <Button className="px-8 py-6">
          <Twitter size={32} />
          <span className="ml-2 ">{shareText} Twitter</span>
        </Button>
      </TwitterShareButton>
      <FacebookShareButton url="https://taskequalizer.vercel.app" title={shareTitle} className="text-primary-foreground">
        <Button className="px-8 py-6">
          <Facebook size={32} />
          <span className="ml-2 ">{shareText} Facebook</span>
        </Button>
      </FacebookShareButton>
      <PinterestShareButton
        url="https://taskequalizer.vercel.app"
        title={shareTitle}
        className="text-primary-foreground"
        media="https://taskequalizer.vercel.app/images/couple_landing_page.png"
      >
        <Button className="px-8 py-6">
          <MessageCircleHeart size={32} />
          <span className="ml-2 ">{shareText} Pinterest</span>
        </Button>
      </PinterestShareButton>
      <LinkedinShareButton url="https://taskequalizer.vercel.app" title={shareTitle} className="text-primary-foreground">
        <Button className="px-8 py-6">
          <Linkedin size={32} />
          <span className="ml-2 ">{shareText} Linkedin</span>
        </Button>
      </LinkedinShareButton>
    </div>
  )
}
