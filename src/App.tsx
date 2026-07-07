import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsapp from './components/FloatingWhatsapp';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Metodologia from './pages/Metodologia';
import Teachers from './pages/Professores';
import Gallery from './pages/Galeria';
import PlansPage from './pages/Planos';
import Contact from './pages/Contato';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Quiz from './pages/Quiz';
import { dbService } from './services/db';
import { 
  SchoolConfig, Course, Plan, Teacher, GalleryItem, BlogPost, FAQItem, StudyMaterial, Announcement, ClassCalendarEvent 
} from './types';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  // Setup reactive state for full synchronization across components
  const [config, setConfig] = useState<SchoolConfig>(dbService.getConfig());
  const [courses, setCourses] = useState<Course[]>(dbService.getCourses());
  const [plans, setPlans] = useState<Plan[]>(dbService.getPlans());
  const [teachers, setTeachers] = useState<Teacher[]>(dbService.getTeachers());
  const [gallery, setGallery] = useState<GalleryItem[]>(dbService.getGallery());
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(dbService.getBlogPosts());
  const [faqs, setFaqs] = useState<FAQItem[]>(dbService.getFAQs());
  const [materials, setMaterials] = useState<StudyMaterial[]>(dbService.getStudyMaterials());
  const [announcements, setAnnouncements] = useState<Announcement[]>(dbService.getAnnouncements());
  const [calendarEvents, setCalendarEvents] = useState<ClassCalendarEvent[]>(dbService.getCalendarEvents());

  // Listen for local storage updates to sync pages automatically
  useEffect(() => {
    const handleSync = () => {
      setConfig(dbService.getConfig());
      setCourses(dbService.getCourses());
      setPlans(dbService.getPlans());
      setTeachers(dbService.getTeachers());
      setGallery(dbService.getGallery());
      setBlogPosts(dbService.getBlogPosts());
      setFaqs(dbService.getFAQs());
      setMaterials(dbService.getStudyMaterials());
      setAnnouncements(dbService.getAnnouncements());
      setCalendarEvents(dbService.getCalendarEvents());
    };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-between selection:bg-brand-primary selection:text-white">
        
        {/* Responsive Navbar */}
        <Navbar config={config} />

        {/* View Pages Router viewport */}
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  config={config} 
                  courses={courses} 
                  teachers={teachers} 
                  plans={plans} 
                  gallery={gallery}
                  blogPosts={blogPosts}
                />
              } 
            />
            <Route path="/sobre" element={<About config={config} />} />
            <Route 
              path="/cursos" 
              element={<Courses config={config} courses={courses} />} 
            />
            <Route path="/metodologia" element={<Metodologia config={config} />} />
            <Route path="/professores" element={<Teachers teachers={teachers} />} />
            <Route path="/galeria" element={<Gallery gallery={gallery} />} />
            <Route 
              path="/planos" 
              element={<PlansPage config={config} plans={plans} />} 
            />
            <Route path="/contato" element={<Contact config={config} />} />
            <Route 
              path="/admin" 
              element={
                <Admin 
                  config={config}
                  onUpdateConfig={setConfig}
                  courses={courses}
                  onUpdateCourses={setCourses}
                  plans={plans}
                  onUpdatePlans={setPlans}
                  teachers={teachers}
                  onUpdateTeachers={setTeachers}
                  gallery={gallery}
                  onUpdateGallery={setGallery}
                  blogPosts={blogPosts}
                  onUpdateBlogPosts={setBlogPosts}
                  faqs={faqs}
                  onUpdateFAQs={setFaqs}
                  materials={materials}
                  onUpdateMaterials={setMaterials}
                  announcements={announcements}
                  onUpdateAnnouncements={setAnnouncements}
                />
              } 
            />
            <Route 
              path="/quiz" 
              element={
                <Quiz config={config} courses={courses} />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer config={config} />

        {/* Floatings Call to Action elements */}
        <FloatingWhatsapp phone={config.whatsapp} />

      </div>
    </Router>
  );
}
