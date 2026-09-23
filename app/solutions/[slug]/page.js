import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import BookDemoModal from "@/components/BookDemoModal";
import ServiceDetail from "@/components/ServiceDetail";
import { SOLUTIONS, getSolutionBySlug } from "@/components/solutionsData";

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getSolutionBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} — ZenlyHR`,
    description: service.summary,
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getSolutionBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <Nav />
      <ServiceDetail service={service} />
      <Footer />
      <ScrollToTop />
      <BookDemoModal />
    </>
  );
}
