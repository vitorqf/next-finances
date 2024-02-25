import { FcGoogle } from "react-icons/fc";

export function GoogleButton() {
  return (
    <button className="btn bg-gray-100 text-gray-900">
      <FcGoogle size={24} />
      <span className="font-semibold leading-none">Continuar com Google</span>
    </button>
  );
}
