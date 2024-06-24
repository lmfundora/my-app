import NevBar from "@/components/navbar/navbar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative">
      {children}
      <NevBar />
    </section>
  );
}
