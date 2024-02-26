import React from 'react';
import DefaultButton from '../interactives/DefaultButton';
import Image from 'next/image';
import "@/resources/styling/components/statics/infoCards.scss";

type CardTypes = "default" | "imageCard" | "pricing" | "info";

type cardProps = {
  type: CardTypes;
  header?: string;
  text?: string;
  imgSrc?: string;
}

const variants = {
  "default": "defaultCard",
  "imageCard": "imageCard",
  "pricing": "pricingCard",
  "info": "infoCard"
}

function InfoCard({ header, text, type, imgSrc }: cardProps) {
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
          <h3 className='imageHeader'>{header}</h3>
          <Image src={imgSrc ?? ""} height={320} width={300} alt={"ImageCard"} priority/>
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
