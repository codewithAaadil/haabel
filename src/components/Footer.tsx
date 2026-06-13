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
          <a href="#" className="font-gtexpbd text-[10px] tracking-widest text-gray-500 hover:text-white transition-colors uppercase">IG</a>
          <a href="#" className="font-gtexpbd text-[10px] tracking-widest text-gray-500 hover:text-white transition-colors uppercase">TW</a>
          <a href="#" className="font-gtexpbd text-[10px] tracking-widest text-gray-500 hover:text-white transition-colors uppercase">IN</a>
        </div>
      </div>
    </footer>
  );
}
