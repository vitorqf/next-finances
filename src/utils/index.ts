export function formatTime(timestamp: string) {
  const date = new Date(timestamp);

  const weekDays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const weekDay = weekDays[date.getDay()];

  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  const formattedTime = `${weekDay} ${hours}:${minutes}`;

  return formattedTime;
}

export function formatAmout(amount: number) {
  const dividedAmount = amount / 100;

  return dividedAmount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
