import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="bg-gray-950 h-full flex-1 p-8 box-border">
      <Header
        title="Seus cartões"
        subtitle="Bem-vindo(a) de volta, Vitor!"
        actions={<button>Click me</button>}
      />
    </div>
  );
}
