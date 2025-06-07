'use client';
import logo from '../assets/logo.png';
import { useState, useEffect } from 'react';
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/react';
import {
  ChevronDownIcon,
} from '@heroicons/react/20/solid';
import {
  Bars3Icon,

  XMarkIcon
} from '@heroicons/react/24/outline';
import { apiHelper } from '../lib/apiHelper';
import { useNavigate } from 'react-router-dom';



export default function NavBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await apiHelper.getProfile();
      if (!res.error) {
        setUser(res.data);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await apiHelper.logout();
    setUser(null);
  };

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-full items-left justify-left px-6 pt-4 pb-0 lg:px-8 bg-[#0A1428]">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only text-white">TripTactix</span>
            <img alt="logo" src={logo} className="h-8 w-auto" />
          </a>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="size-6" />
          </button>
        </div>

        

          

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="inline-flex justify-center items-center text-sm font-semibold text-white hover:underline">
                Hello, {user.fullName}
                <ChevronDownIcon className="ml-1 size-5 text-white" />
              </MenuButton>
              <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`w-full px-4 py-2 text-sm text-left ${active ? 'bg-gray-100' : ''}`}
                    >
                      Logout
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-semibold text-white cursor-pointer"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">TripTactix</span>
              <img alt="logo" src={logo} className="h-8 w-auto" />
            </a>
            <button onClick={() => setMobileMenuOpen(false)} className="-m-2.5 p-2.5 text-white">
              <XMarkIcon className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure>
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base font-semibold text-white hover:bg-gray-800">
                    Product
                    <ChevronDownIcon className="size-5 group-data-open:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pr-3 pl-6 text-sm font-semibold text-white hover:bg-gray-700"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <a href="#" className="block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-gray-700">
                  Features
                </a>
                <a href="#" className="block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-gray-700">
                  Marketplace
                </a>
                <a href="#" className="block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-gray-700">
                  Company
                </a>
              </div>
              <div className="py-6">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="block w-full rounded-lg px-3 py-2.5 text-base font-semibold text-white hover:bg-gray-700"
                  >
                    Logout ({user.fullName})
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/login");
                    }}
                    className="block w-full text-left rounded-lg px-3 py-2.5 text-base font-semibold text-white hover:bg-gray-700"
                  >
                    Log in
                  </button>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
