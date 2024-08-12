"use client"

import { Facebook, Linkedin, MessageCircleHeart, Twitter } from "lucide-react"
import { FacebookShareButton, LinkedinShareButton, PinterestShareButton, TwitterShareButton } from "react-share"

export const Share = ({ shareText, shareTitle }: { shareText: string; shareTitle: string }) => {
  return (
    <div className="flex flex-wrap gap-5 justify-center">
      <TwitterShareButton
        url="https://taskequalizer.vercel.app"
        title={shareTitle}
        className="px-8 py-6 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium"
      >
        <Twitter size={32} />
        <span className="ml-2 ">{shareText} Twitter</span>
      </TwitterShareButton>
      <FacebookShareButton
        url="https://taskequalizer.vercel.app"
        title={shareTitle}
        className="px-8 py-6 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium"
      >
        <Facebook size={32} />
        <span className="ml-2 ">{shareText} Facebook</span>
      </FacebookShareButton>
      <PinterestShareButton
        url="https://taskequalizer.vercel.app"
        title={shareTitle}
        className="px-8 py-6 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium"
        media="https://taskequalizer.vercel.app/images/couple_landing_page.png"
      >
        <MessageCircleHeart size={32} />
        <span className="ml-2 ">{shareText} Pinterest</span>
      </PinterestShareButton>
      <LinkedinShareButton
        url="https://taskequalizer.vercel.app"
        title={shareTitle}
        className="px-8 py-6 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium"
      >
        <Linkedin size={32} />
        <span className="ml-2 ">{shareText} Linkedin</span>
      </LinkedinShareButton>
    </div>
  )
}
