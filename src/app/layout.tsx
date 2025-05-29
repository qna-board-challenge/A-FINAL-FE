import Header from "@/components/Header";
import "./globals.css";
import SideBar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="flex">
          <aside className="w-[20%] min-w-[150px] max-w-[250px] h-[100vh] border-r ">
            <SideBar />
          </aside>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
