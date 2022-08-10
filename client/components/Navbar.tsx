import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="text-white flex text-3xl py-8 px-16">
      <div
        onClick={() => router.push("/")}
        className={`cursor-pointer ${
          router.pathname === "/" ? "font-extrabold" : ""
        }`}
      >
        Home
      </div>
      <div
        onClick={() => router.push("/que")}
        className={`ml-8 cursor-pointer ${
          router.pathname === "/que" ? "font-extrabold" : ""
        }`}
      >
        Que
      </div>
      <div
        onClick={() => router.push("/workers")}
        className={`ml-8 cursor-pointer ${
          router.pathname === "/workers" ? "font-extrabold" : ""
        }`}
      >
        Workers
      </div>
    </div>
  );
};

export default Navbar;
