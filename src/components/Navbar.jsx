import { useEffect, useState } from "react";

import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";

const Navbar = () => {
    const [active, setActive] = useState("Home");
    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Close mobile menu when pressing Escape and lock body scroll when open
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === "Escape") setToggle(false);
        };
        if (toggle) {
            document.body.classList.add("overflow-hidden");
            window.addEventListener("keydown", onKeyDown);
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [toggle]);

    // Sync active item with hash and on scroll (scroll spy)
    useEffect(() => {
        const setActiveFromHash = () => {
            const hash = window.location.hash.replace("#", "");
            const found = navLinks.find((n) => n.id === hash);
            if (found) setActive(found.title);
        };
        setActiveFromHash();
        window.addEventListener("hashchange", setActiveFromHash);

        const sections = navLinks
            .map((n) => document.getElementById(n.id))
            .filter(Boolean);
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        const match = navLinks.find((n) => n.id === id);
                        if (match) setActive(match.title);
                    }
                });
            },
            { root: null, threshold: 0.5 }
        );
        sections.forEach((sec) => observer.observe(sec));
        return () => {
            window.removeEventListener("hashchange", setActiveFromHash);
            observer.disconnect();
        };
    }, []);

    // Add subtle shadow when page is scrolled
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 4);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleSmoothNav = (e, id, title, closeMenu = false) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            history.pushState(null, "", `#${id}`);
        } else {
            // fallback to hash navigation
            window.location.hash = `#${id}`;
        }
        setActive(title);
        if (closeMenu) setToggle(false);
    };

    return (
        <nav
            className={`w-full flex py-3 sm:py-4 px-4 sm:px-0 justify-between items-center navbar sticky top-0 z-50 bg-primary/60 backdrop-blur supports-[backdrop-filter]:bg-primary/50 motion-safe:transition-shadow ${
                scrolled ? "shadow-[0_8px_24px_rgba(0,0,0,0.25)]" : "shadow-none"
            }`}
            aria-label="Primary Navigation"
        >
            <a href="#home" aria-label="Go to homepage" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded">
                <img src={logo} alt="HooBank logo" className="h-8 sm:h-9 w-auto" decoding="async" />
            </a>

            <ul className="list-none sm:flex hidden justify-end items-center flex-1" role="menubar">
                {navLinks.map((nav, index) => (
                    <li
                        key={nav.id}
                        className={`group relative font-poppins font-medium cursor-pointer text-[16px] motion-safe:transition-colors ${
                            active === nav.title ? "text-white" : "text-dimWhite hover:text-white"
                        } ${index === navLinks.length - 1 ? "mr-0" : "mr-6"}`}
                        onClick={() => setActive(nav.title)}
                    >
                        <a
                            href={`#${nav.id}`}
                            className="inline-flex items-center justify-center px-3 py-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 min-h-[44px]"
                            aria-current={active === nav.title ? "page" : undefined}
                            onClick={(e) => handleSmoothNav(e, nav.id, nav.title)}
                        >
                            {nav.title}
                        </a>
                        {/* active/hover indicator */}
                        <span
                            aria-hidden
                            className={`pointer-events-none absolute left-0 right-0 -bottom-1 h-[2px] origin-left motion-safe:transition-transform motion-safe:duration-200 ${
                                active === nav.title
                                    ? "bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 scale-x-100"
                                    : "bg-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-cyan-300 group-hover:to-cyan-400 group-hover:scale-x-100 scale-x-0"
                            }`}
                        />
                    </li>
                ))}
            </ul>

            <div className="sm:hidden flex flex-1 justify-end items-center">
                <button
                    type="button"
                    className="p-3 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 min-h-[44px] min-w-[44px]"
                    aria-controls="mobile-menu"
                    aria-expanded={toggle}
                    aria-label={toggle ? "Close menu" : "Open menu"}
                    onClick={() => setToggle((t) => !t)}
                >
                    <img src={toggle ? close : menu} alt="Menu" className="w-[28px] h-[28px] object-contain" />
                </button>

                {/* Backdrop overlay */}
                <button
                    aria-hidden={!toggle}
                    tabIndex={-1}
                    className={`fixed inset-0 bg-black/40 transition-opacity motion-safe:duration-200 ${
                        toggle ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                    onClick={() => setToggle(false)}
                />

                <div
                    id="mobile-menu"
                    aria-hidden={!toggle}
                    className={`p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[240px] rounded-2xl sidebar motion-safe:transition-all motion-safe:duration-200 ${
                        toggle ? "opacity-100 translate-y-0 pointer-events-auto flex" : "opacity-0 -translate-y-2 pointer-events-none flex"
                    } shadow-[0_12px_32px_rgba(0,0,0,0.45)]`}
                >
                    <ul className="list-none flex justify-end items-start flex-1 flex-col">
                        {navLinks.map((nav, index) => (
                            <li
                                key={nav.id}
                                className={`font-poppins font-medium cursor-pointer text-[16px] motion-safe:transition-colors ${
                                    active === nav.title ? "text-white" : "text-dimWhite hover:text-white"
                                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                                onClick={(e) => {
                                    // handle on anchor instead for smooth scroll
                                }}
                            >
                                <a
                                    href={`#${nav.id}`}
                                    className="block w-full px-2 py-3 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 min-h-[44px]"
                                    aria-current={active === nav.title ? "page" : undefined}
                                    onClick={(e) => handleSmoothNav(e, nav.id, nav.title, true)}
                                >
                                    {nav.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;