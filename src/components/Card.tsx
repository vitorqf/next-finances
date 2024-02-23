import Image from "next/image";

export function Card({
  type,
  flag,
  title,
  digits,
}: {
  type: string;
  flag: string;
  title: string;
  digits: number;
}) {
  return (
    <div className="bg-gradient-to-r from-[#042843] to-[#726E9E] w-[348px] h-48 p-6 rounded-3xl flex flex-col justify-between gap-2">
      <div className="flex justify-between">
        <span className="text-slate-100">{type}</span>
        <Image
          src={`/flags/logo/${flag}.svg`}
          width={64}
          height={64}
          alt={`Bandeira do cartão ${flag}`}
        />
      </div>
      <div>
        <h3 className="text-white text-lg font-bold">{title}</h3>
        <span className="text-slate-300 flex items-center gap-5">
          <span className="tracking-widest">****</span>
          <span className="tracking-widest">****</span>
          <span className="tracking-widest">****</span>
          <span className="tracking-widest">{digits}</span>
        </span>
      </div>
    </div>
  );
}
