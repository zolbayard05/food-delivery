import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 lg:px-20 xl:px-28">
        <Link href="/" className="mb-10 flex items-center gap-2 w-fit">
          <span className="text-2xl font-extrabold tracking-tight">
            Nom<span className="text-red-500">Nom</span>
          </span>
        </Link>
        <div className="mx-auto w-full max-w-sm">{children}</div>
      </div>
      <div className="relative hidden lg:block lg:w-1/2">
        <Image
          src="/food-delivery-hero.jpg"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/10" />
      </div>
    </div>
  );
}
