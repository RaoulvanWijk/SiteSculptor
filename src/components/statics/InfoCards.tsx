import React from 'react'
import "@/resources/styling/components/statics/infoCards.scss"

type CardTypes = "default" | "imageCard" | "pricing" | "infoLeft" | "infoRight" | "infoTop" | "infoBottom";

type cardProps = {
  text: string;
  type: CardTypes;
}

const variants = {
  "default": "defaultCard",
  "imageCard": "imageCard",
  "pricing": "pricingCard",
  "infoLeft": "infoCard left",
  "infoRight": "infoCard right",
  "infoTop": "infoCard top",
  "infoBottom": "infoCard bottom",
}

export default function InfoCard({ text, type} : cardProps) {
  return (
    <div className={(variants[type ?? "default"])}>
      
      {text}
    </div>
  )
}
