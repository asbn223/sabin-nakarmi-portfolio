import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ProjectsPage } from '@/components/projects-page';

export const metadata = {
  title: 'Projects | Sabin Nakarmi',
  description: 'Explore my portfolio of Flutter apps, full-stack projects, and technical achievements.',
};

export default function Page() {
  return (
    <>
      <Navigation />
      <ProjectsPage />
      <Footer />
    </>
  );
}
