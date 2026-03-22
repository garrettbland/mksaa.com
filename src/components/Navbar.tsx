import { useState, useRef, useEffect } from "react";
import { ARBITRATION_REQUEST_URL, DEALER_LOGIN_URL } from "../constants";
import data from "../data.json";
import { Image } from "astro:assets";
import logo from "../assets/images/mid-kansas-auto-auction-logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <>
      {/* Banner with links */}
      <div className="bg-white">
        <div className="px-5 py-3 flex justify-end max-w-6xl mx-auto gap-6">
          <a
            href={DEALER_LOGIN_URL}
            className="rounded-lg text-white bg-brand-primary px-8 py-2 hover:brightness-120 transition text-sm font-semibold"
          >
            Dealer Login
          </a>
          <a
            href={ARBITRATION_REQUEST_URL}
            className="rounded-lg text-white bg-brand-primary px-8 py-2 hover:brightness-120 transition text-sm font-semibold"
          >
            Arbitration Request
          </a>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-brand-gray">
        <div className="max-w-6xl mx-auto px-5 py-10 flex items-center justify-between">
          <div>
            <img src={logo.src} alt="MKSAA Logo" className="max-w-[10rem]" />
          </div>

          <div className="flex flex-row gap-4">
            {data.navlinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-white hover:text-gray-300 transition font-light"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
