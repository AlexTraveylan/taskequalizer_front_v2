"use client"

import { Button } from "@/components/ui/button"
import { Facebook, MessageCircleHeart, Twitter } from "lucide-react"
import { FacebookShareButton, PinterestShareButton, TwitterShareButton } from "react-share"

export const Share = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <TwitterShareButton
        url="https://taskequalizer.vercel.app"
        title="Task Equalizer - Une application de gestion de tâches pour les familles"
        className="text-primary-foreground"
      >
        <Button className="px-8 py-6">
          <Twitter size={32} />
          <span className="ml-2 ">Partager sur Twitter</span>
        </Button>
      </TwitterShareButton>
      <FacebookShareButton
        url="https://taskequalizer.vercel.app"
        title="Task Equalizer - Une application de gestion de tâches pour les familles"
        className="text-primary-foreground"
      >
        <Button className="px-8 py-6">
          <Facebook size={32} />
          <span className="ml-2 ">Partager sur Facebook</span>
        </Button>
      </FacebookShareButton>
      <PinterestShareButton
        url="https://taskequalizer.vercel.app"
        title="Task Equalizer - Une application de gestion de tâches pour les familles"
        className="text-primary-foreground"
        media="https://taskequalizer.vercel.app/images/couple_landing_page.png"
      >
        <Button className="px-8 py-6">
          <MessageCircleHeart size={32} />
          <span className="ml-2 ">Partager sur Pinterest</span>
        </Button>
      </PinterestShareButton>
    </div>
  )
}
