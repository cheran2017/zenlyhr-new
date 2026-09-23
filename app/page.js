import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Solutions from "@/components/Solutions";
import Growth from "@/components/Growth";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import BookDemoModal from "@/components/BookDemoModal";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Solutions />
      <Growth />
      <WhyChooseUs />
      <Footer />
      <ScrollToTop />
      <BookDemoModal />
    </>
  );
}
