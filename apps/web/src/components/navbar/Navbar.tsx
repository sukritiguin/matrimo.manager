import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { UserButton } from "./UserButton";

type NavItem = {
  name: string;
  link: string;
};

const NavItems: NavItem[] = [
  { name: "Home", link: "/" },
  { name: "Features", link: "/features" },
  { name: "Pricing", link: "/pricing" },
  { name: "Contact", link: "/contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="h-12 bg-transparent border-b fixed top-0 z-50 backdrop-blur-3xl flex w-full justify-center items-center">
      <div className="w-full flex items-center justify-center">
        <nav className="w-full max-w-7xl z-50 transition-all">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <Link
              to="/"
              className={`text-2xl font-bold capitalize roboto-slab tracking-wider`}
            >
              INVITARIA
            </Link>

            <div className={`hidden md:flex space-x-6`}>
              {NavItems.map((item, index) => (
                <DesktopNavItem key={index} {...item} />
              ))}
            </div>

            <UserButton />

            <Button
              className="md:hidden"
              variant="outline"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </Button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                key="mobile-menu"
                className="md:hidden bg-secondary absolute w-full"
              >
                <div className="flex flex-col w-full items-center gap-3 p-3">
                  {NavItems.map((navItem, index) => (
                    <MobileNavItem
                      key={index}
                      navItem={navItem}
                      index={index}
                      onClick={() => setMenuOpen(false)}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
}

const DesktopNavItem = (navItem: NavItem) => {
  return (
    <Link
      to={navItem.link}
      activeOptions={{ exact: true }}
      className="text-sm font-semibold"
    >
      {({ isActive }) => (
        <div className="group relative">
          <span className={cn(isActive && "font-bold")}>{navItem.name}</span>
          {isActive ? (
            <motion.div
              layoutId="active"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              layout
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 30,
              }}
              style={{
                scaleX: 1,
              }}
            />
          ) : (
            <span className="absolute bottom-0 left-0 right-0 w-0 group-hover:w-full h-0.5 bg-primary transition-all duration-200 ease-in-out" />
          )}
        </div>
      )}
    </Link>
  );
};

const MobileNavItem = ({
  navItem,
  index,
  onClick,
}: {
  navItem: NavItem;
  index: number;
  onClick: () => void;
}) => {
  return (
    <motion.div
      key={navItem.link}
      custom={index}
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { delay: index * 0.1 },
      }}
      exit={{
        opacity: 0,
        x: -20,
        transition: { delay: (NavItems.length - index) * 0.05 },
      }}
      className="w-full"
    >
      <Link
        to={navItem.link}
        onClick={onClick}
        className="block w-full text-center py-2"
        activeOptions={{ exact: false }}
      >
        {({ isActive }) => (
          <motion.span
            animate={{
              color: isActive ? "#3b82f6" : "inherit",
              fontWeight: isActive ? "bold" : "normal",
            }}
          >
            {navItem.name}
          </motion.span>
        )}
      </Link>
    </motion.div>
  );
};
