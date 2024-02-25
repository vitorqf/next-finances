import { FaFacebook } from "react-icons/fa";

export function FacebookButton() {
  return (
    <button className="btn bg-[#006AFF]">
      <FaFacebook size={24} color="#fff" />
      <span className="font-semibold leading-none">Continuar com Facebook</span>
    </button>
  );
}
