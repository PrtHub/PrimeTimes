import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full px-4 py-5 rounded-b flex flex-col items-center justify-center gap-4">
      <Link to='/' className="text-4xl font-semibold text-red-600">PrimeTimes</Link>
      <p className="text-gray-600 text-center text-sm">
        PrimeTimes is your go-to source for timely and trustworthy news. Our app
        brings you the latest headlines, in-depth articles, and live updates
        from around the globe. Whether it's breaking news, sports,
        entertainment, or business, our comprehensive coverage keeps you
        connected to the stories that matter most.
      </p>
    </nav>
  );
};

export default Navbar;
