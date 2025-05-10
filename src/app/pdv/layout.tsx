import Navbar from "@/component/NavBar";

export default function RootLayoutPdv({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Navbar />
        {children}
     
    </div>
  );
}