import { Card as CardModel } from "@/models/Card";
import { Card } from "./Card";

export function Cards(cards: CardModel[]) {
  return (
    <div>
      {cards.map((card) => (
        <Card
          key={card.id}
          type={card.type}
          flag={card.flag}
          title={card.title}
          digits={card.last_digits}
        />
      ))}
    </div>
  );
}
