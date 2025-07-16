import Image from "next/image";
import Link from "next/link";

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex">
        <Image src="/Logo2.png" width={58} height={58} alt="logo" />
        <p className="font-semibold text-white text-2xl ml-2.5"> Personal Finance</p>
      </div>
    </Link>
  );
};
