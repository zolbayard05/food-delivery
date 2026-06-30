import { Header } from "@/components/main/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center">
        <h2>Home page</h2>
      </div>
    </div>
  );
}
