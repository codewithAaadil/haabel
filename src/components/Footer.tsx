const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-900 py-12 px-6 md:px-10 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-gtextbd text-lg tracking-wide text-white">
          HAABEL
        </div>
        <div className="font-gtexprg text-[10px] tracking-widest text-gray-600 uppercase">
          © {new Date().getFullYear()} All Rights Reserved
        </div>
        <div className="flex gap-6">
          <a 
            href="https://www.instagram.com/haaabbel/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-500 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
