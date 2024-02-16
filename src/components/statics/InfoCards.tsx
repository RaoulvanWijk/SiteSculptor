import React from 'react'
import "@/resources/styling/components/statics/infoCards.scss"
import DefaultButton from '../interactives/DefaultButton';

type CardTypes = "default" | "imageCard" | "pricing" | "info";

type cardProps = {
  header: string;
  text: string;
  type: CardTypes;
}

const variants = {
  "default": "defaultCard",
  "imageCard": "imageCard",
  "pricing": "pricingCard",
  "info": "infoCard"
}

function InfoCard({ header, text, type }: cardProps) {
  let cardContent;

  switch (type) {
    case "default":
      cardContent = (
        <div className={"defaultCard " + (variants[type ?? "default"])}>
          <h3>{header}</h3>
          <p>{text}</p>
        </div>
      );
      break;
    case "imageCard":
      cardContent = (
        <div className={"defaultCard " + (variants[type ?? "default"])}>
          <h3>{header}</h3>
          <p>{text}</p>
        </div>
      );
      break;
    case "pricing":
      cardContent = (
        <div className={"defaultCard " + (variants[type ?? "default"])}>
          <div className="packageHeader">
            <h3>{header}</h3>
          </div>
          <p>
            {text}
          </p>
          <div className="packageFooter">
            <DefaultButton buttonName='Select Package' type='primary' />
          </div>
        </div>
      );
      break;
    case "info":
      cardContent = (
        <div className={"defaultCard " + (variants[type ?? "default"])}>
          <h3>{header}</h3>
          <p>{text}</p>
          <h3>{header}</h3>
          <p>{text}</p>
        </div>
      );
      break;

    default:
      cardContent = (
        <div className="defaultCard">
          <h3>{header}</h3>
          <p>{text}</p>
        </div>
      );
  }

  return cardContent;
}

export default InfoCard;
