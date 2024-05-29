
import Image from "next/image";

export const Logo = () => {
  return (
    <div>
      <div className="flex text-vermelho-vinho text-xl font-bold items-center dark:hidden" >
        <Image
          className=""
          height={40}
          width={40}
          alt="logo"
          src={"/logo.svg"}
        ></ Image>
        <p className="">Seven</p>
      </div >

      <div className="hidden dark:flex text-white text-xl font-bold content-center" >
        <Image
          className=""
          height={40}
          width={40}
          alt="logo"
          src={"/logo-light.svg"}
        ></ Image>
        <p className="">Seven</p>
      </div >

    </div>

  );
};
