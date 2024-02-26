interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  errors?: string | boolean;
}

export function Input({ icon, errors, ...others }: InputProps) {
  return (
    <div>
      <div
        className={`flex items-center gap-2 rounded-lg border-2 border-white border-opacity-20 px-3 py-2 text-slate-400 focus-within:ring-2 focus-within:ring-indigo-500 ${
          errors ? "text-red-500 ring-2 ring-red-500" : ""
        }`}
      >
        {icon}
        <input
          className={`] border-none bg-gray-900 text-slate-100 placeholder-[#646A74] outline-none
          ${errors ? "text-red-500 placeholder-red-500" : ""}`}
          {...others}
        />
      </div>
      {errors && <p className="mt-1 text-sm text-red-500">{errors}</p>}
    </div>
  );
}
