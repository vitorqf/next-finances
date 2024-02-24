export function formatTime(timestamp: string) {
  const date = new Date(timestamp);

  const weekDays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  const weekDay = weekDays[date.getDay()];

  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  const formattedTime = `${weekDay}\n${day}/${month}`;

  return formattedTime;
}

export function formatAmout(amount: number) {
  const dividedAmount = amount / 100;

  return dividedAmount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
