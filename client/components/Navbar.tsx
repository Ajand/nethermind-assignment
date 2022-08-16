import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="text-white flex text-2xl py-8 px-16">
      <div
        onClick={() => router.push("/")}
        className={`cursor-pointer ${
          router.pathname === "/" ? "font-bold" : ""
        }`}
      >
        Home
      </div>
      <div
        onClick={() => router.push("/que")}
        className={`ml-8 cursor-pointer ${
          router.pathname === "/que" ? "font-bold" : ""
        }`}
      >
        Que
      </div>
      <div
        onClick={() => router.push("/workers")}
        className={`ml-8 cursor-pointer ${
          router.pathname === "/workers" ? "font-bold" : ""
        }`}
      >
        Workers
      </div>
    </div>
  );
};

export default Navbar;
