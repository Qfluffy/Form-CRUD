import Link from "next/link";

export default function Navbar() {
  const navLinks = [
    { name: "หน้าหลัก", href: "/" },
    { name: "รายวิชา", href: "/courses" },
    { name: "เกี่ยวกับเรา", href: "/about" },
    { name: "เกม", href: "/games" }, // แก้ไขจาก "วงดนตรี" (/bands) เป็น "เกม" (/games)
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* โลโก้ / ชื่อระบบ */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-gray-900 text-lg hover:text-green-600 transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
              CS
            </span>
            <span>CSMJU</span>
          </Link>

          {/* เมนูนำทาง */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all duration-150"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}