import { ReactNode, useEffect, useRef, useState } from 'react';
export interface MenuItem {
  key: string;
  label: ReactNode;
}

interface DropdownNavProps {
  title: string;
  items: MenuItem[];
}

export const DropdownNav = ({ title, items }: DropdownNavProps) => {
  const [navOpen, setNavOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setNavOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setNavOpen(!navOpen)}>
        {title}
      </button>

      {navOpen && (
        <div
          className="fixed top-[5vh] left-0 w-[235px] bg-cBlue"
          style={{ zIndex: 200 }}
        >
          {items.map(item => (
            <div
              key={item.key}
              className="px-2 py-2 hover:bg-cBlueDark cursor-pointer"
              onClick={() => {
                if (item.key !== '0') {
                  setNavOpen(false);
                }
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
