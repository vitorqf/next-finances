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
    <div className="flex h-48 w-[348px] flex-col justify-between gap-2 rounded-3xl bg-gradient-to-r from-[#042843] to-[#726E9E] p-6">
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
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <span className="flex items-center gap-5 text-slate-300">
          <span className="tracking-widest">****</span>
          <span className="tracking-widest">****</span>
          <span className="tracking-widest">****</span>
          <span className="tracking-widest">{digits}</span>
        </span>
      </div>
    </div>
  );
}
