import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { ExperienceSection } from '@/components/experience-section';
import { SkillsSection } from '@/components/skills-section';
import { ProjectsSection } from '@/components/projects-section';
import { Footer } from '@/components/footer';
import {ScrollProgress} from "@/components/scroll-progress";

export default function Home() {
    return (
        <>
            <ScrollProgress />
            <Navigation />
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <SkillsSection />
            <ProjectsSection />
            <Footer />
        </>
    );
}
