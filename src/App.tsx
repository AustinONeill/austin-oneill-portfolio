import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import HybridProfile from '@/components/HybridProfile'
import ExperienceTimeline from '@/components/ExperienceTimeline'
import SkillsStack from '@/components/SkillsStack'
import Projects from '@/components/Projects'
import CannabisDomain from '@/components/CannabisDomain'
import EducationCerts from '@/components/EducationCerts'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HybridProfile />
        <ExperienceTimeline />
        <SkillsStack />
        <Projects />
        <CannabisDomain />
        <EducationCerts />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
