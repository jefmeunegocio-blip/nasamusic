import { SchoolConfig, Course, Plan, Teacher, GalleryItem, BlogPost, FAQItem, StudyMaterial, Announcement, ClassCalendarEvent } from '../types';
const professorSabinoImg = '';
import { 
  defaultSchoolConfig, 
  defaultCourses, 
  defaultPlans, 
  defaultTeachers, 
  defaultGallery, 
  defaultBlogPosts, 
  defaultFAQs, 
  defaultStudyMaterials, 
  defaultAnnouncements, 
  defaultClassCalendar 
} from '../data/defaultData';

// LOCALSTORAGE KEYS
const KEYS = {
  CONFIG: 'nasa_school_config',
  COURSES: 'nasa_courses',
  PLANS: 'nasa_plans',
  TEACHERS: 'nasa_teachers',
  GALLERY: 'nasa_gallery',
  BLOG: 'nasa_blog',
  FAQ: 'nasa_faq',
  MATERIALS: 'nasa_materials',
  ANNOUNCEMENTS: 'nasa_announcements',
  CALENDAR: 'nasa_calendar',
  USER_LOGGED: 'nasa_student_logged',
  ADMIN_LOGGED: 'nasa_admin_logged'
};

// Initializer helper
const getOrSetDefault = <T>(key: string, defaultValue: T): T => {
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved) as T;
    }
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  } catch (error) {
    console.error(`Error loading key ${key} from localStorage`, error);
    return defaultValue;
  }
};

// Self-executing migration to clean up old defaults from user's localStorage
try {
  const savedConfig = localStorage.getItem(KEYS.CONFIG);
  if (savedConfig) {
    try {
      const config = JSON.parse(savedConfig) as SchoolConfig;
      if (
        config.phone === "(11) 99999-9999" || 
        config.whatsapp === "5511999999999" || 
        config.address?.includes("Anapurus") || 
        config.address?.includes("Moema")
      ) {
        config.phone = "(11) 96280-3599";
        config.whatsapp = "5511962803599";
        config.address = "Rua Tupiniquins, 357 - Serraria, Diadema - SP";
        config.mapsEmbedUrl = "https://maps.google.com/maps?q=Rua%20Tupiniquins,%20357%20-%20Serraria,%20Diadema%20-%20SP&t=&z=15&ie=UTF8&iwloc=&output=embed";
        localStorage.setItem(KEYS.CONFIG, JSON.stringify(config));
      }
    } catch (e) {
      console.error("Config parsing/migrating error", e);
    }
  }

  const savedCourses = localStorage.getItem(KEYS.COURSES);
  if (savedCourses) {
    let courses = JSON.parse(savedCourses) as Course[];
    courses = courses.filter(c => c.id !== 'baixo');
    courses = courses.map(c => {
      if (c.id === 'guitarra' && c.image === 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800') {
        return { ...c, image: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&q=80&w=800' };
      }
      if (c.id === 'violao' && (c.image === 'https://images.unsplash.com/photo-1550985543-f47f38aeee65?auto=format&fit=crop&q=80&w=800' || !c.image)) {
        return { ...c, image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=800' };
      }
      return c;
    });
    localStorage.setItem(KEYS.COURSES, JSON.stringify(courses));
  }

  const savedTeachers = localStorage.getItem(KEYS.TEACHERS);
  if (savedTeachers) {
    try {
      let teachers = JSON.parse(savedTeachers) as Teacher[];
      teachers = teachers.map(t => {
        if (t.id === 'sabino') {
          return { ...t, image: '' };
        }
        return t;
      });
      localStorage.setItem(KEYS.TEACHERS, JSON.stringify(teachers));
    } catch (e) {
      console.error(e);
    }
  }

  const savedGallery = localStorage.getItem(KEYS.GALLERY);
  if (savedGallery) {
    let gallery = JSON.parse(savedGallery) as GalleryItem[];
    gallery = gallery.map(item => {
      if (item.id === 'gal2' && item.url === 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800') {
        return { ...item, url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800' };
      }
      if (item.id === 'gal4' && item.url === 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800') {
        return { ...item, url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800' };
      }
      return item;
    });
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(gallery));
  }
} catch (e) {
  console.error("Migration error", e);
}

export const dbService = {
  // CONFIG
  getConfig(): SchoolConfig {
    return getOrSetDefault(KEYS.CONFIG, defaultSchoolConfig);
  },
  saveConfig(config: SchoolConfig): void {
    localStorage.setItem(KEYS.CONFIG, JSON.stringify(config));
  },

  // COURSES
  getCourses(): Course[] {
    return getOrSetDefault(KEYS.COURSES, defaultCourses);
  },
  saveCourse(course: Course): void {
    const current = this.getCourses();
    const index = current.findIndex(c => c.id === course.id);
    if (index >= 0) {
      current[index] = course;
    } else {
      current.push(course);
    }
    localStorage.setItem(KEYS.COURSES, JSON.stringify(current));
  },
  deleteCourse(id: string): void {
    const filtered = this.getCourses().filter(c => c.id !== id);
    localStorage.setItem(KEYS.COURSES, JSON.stringify(filtered));
  },

  // PLANS
  getPlans(): Plan[] {
    return getOrSetDefault(KEYS.PLANS, defaultPlans);
  },
  savePlan(plan: Plan): void {
    const current = this.getPlans();
    const index = current.findIndex(p => p.id === plan.id);
    if (index >= 0) {
      current[index] = plan;
    } else {
      current.push(plan);
    }
    localStorage.setItem(KEYS.PLANS, JSON.stringify(current));
  },
  deletePlan(id: string): void {
    const filtered = this.getPlans().filter(p => p.id !== id);
    localStorage.setItem(KEYS.PLANS, JSON.stringify(filtered));
  },

  // TEACHERS
  getTeachers(): Teacher[] {
    return getOrSetDefault(KEYS.TEACHERS, defaultTeachers);
  },
  saveTeacher(teacher: Teacher): void {
    const current = this.getTeachers();
    const index = current.findIndex(t => t.id === teacher.id);
    if (index >= 0) {
      current[index] = teacher;
    } else {
      current.push(teacher);
    }
    localStorage.setItem(KEYS.TEACHERS, JSON.stringify(current));
  },
  deleteTeacher(id: string): void {
    const filtered = this.getTeachers().filter(t => t.id !== id);
    localStorage.setItem(KEYS.TEACHERS, JSON.stringify(filtered));
  },

  // GALLERY
  getGallery(): GalleryItem[] {
    return getOrSetDefault(KEYS.GALLERY, defaultGallery);
  },
  saveGalleryItem(item: GalleryItem): void {
    const current = this.getGallery();
    const index = current.findIndex(g => g.id === item.id);
    if (index >= 0) {
      current[index] = item;
    } else {
      current.push(item);
    }
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(current));
  },
  deleteGalleryItem(id: string): void {
    const filtered = this.getGallery().filter(g => g.id !== id);
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(filtered));
  },

  // BLOG
  getBlogPosts(): BlogPost[] {
    return getOrSetDefault(KEYS.BLOG, defaultBlogPosts);
  },
  saveBlogPost(post: BlogPost): void {
    const current = this.getBlogPosts();
    const index = current.findIndex(p => p.id === post.id);
    if (index >= 0) {
      current[index] = post;
    } else {
      current.push(post);
    }
    localStorage.setItem(KEYS.BLOG, JSON.stringify(current));
  },
  deleteBlogPost(id: string): void {
    const filtered = this.getBlogPosts().filter(p => p.id !== id);
    localStorage.setItem(KEYS.BLOG, JSON.stringify(filtered));
  },

  // FAQ
  getFAQs(): FAQItem[] {
    return getOrSetDefault(KEYS.FAQ, defaultFAQs);
  },
  saveFAQ(faq: FAQItem): void {
    const current = this.getFAQs();
    const index = current.findIndex(f => f.id === faq.id);
    if (index >= 0) {
      current[index] = faq;
    } else {
      current.push(faq);
    }
    localStorage.setItem(KEYS.FAQ, JSON.stringify(current));
  },
  deleteFAQ(id: string): void {
    const filtered = this.getFAQs().filter(f => f.id !== id);
    localStorage.setItem(KEYS.FAQ, JSON.stringify(filtered));
  },

  // STUDY MATERIALS
  getStudyMaterials(): StudyMaterial[] {
    return getOrSetDefault(KEYS.MATERIALS, defaultStudyMaterials);
  },
  saveStudyMaterial(mat: StudyMaterial): void {
    const current = this.getStudyMaterials();
    const index = current.findIndex(m => m.id === mat.id);
    if (index >= 0) {
      current[index] = mat;
    } else {
      current.push(mat);
    }
    localStorage.setItem(KEYS.MATERIALS, JSON.stringify(current));
  },
  deleteStudyMaterial(id: string): void {
    const filtered = this.getStudyMaterials().filter(m => m.id !== id);
    localStorage.setItem(KEYS.MATERIALS, JSON.stringify(filtered));
  },

  // ANNOUNCEMENTS
  getAnnouncements(): Announcement[] {
    return getOrSetDefault(KEYS.ANNOUNCEMENTS, defaultAnnouncements);
  },
  saveAnnouncement(ann: Announcement): void {
    const current = this.getAnnouncements();
    const index = current.findIndex(a => a.id === ann.id);
    if (index >= 0) {
      current[index] = ann;
    } else {
      current.push(ann);
    }
    localStorage.setItem(KEYS.ANNOUNCEMENTS, JSON.stringify(current));
  },
  deleteAnnouncement(id: string): void {
    const filtered = this.getAnnouncements().filter(a => a.id !== id);
    localStorage.setItem(KEYS.ANNOUNCEMENTS, JSON.stringify(filtered));
  },

  // CALENDAR
  getCalendarEvents(): ClassCalendarEvent[] {
    return getOrSetDefault(KEYS.CALENDAR, defaultClassCalendar);
  },
  saveCalendarEvent(event: ClassCalendarEvent): void {
    const current = this.getCalendarEvents();
    const index = current.findIndex(e => e.id === event.id);
    if (index >= 0) {
      current[index] = event;
    } else {
      current.push(event);
    }
    localStorage.setItem(KEYS.CALENDAR, JSON.stringify(current));
  },
  deleteCalendarEvent(id: string): void {
    const filtered = this.getCalendarEvents().filter(e => e.id !== id);
    localStorage.setItem(KEYS.CALENDAR, JSON.stringify(filtered));
  },

  // RESET TO DEFAULT
  resetAll(): void {
    localStorage.setItem(KEYS.CONFIG, JSON.stringify(defaultSchoolConfig));
    localStorage.setItem(KEYS.COURSES, JSON.stringify(defaultCourses));
    localStorage.setItem(KEYS.PLANS, JSON.stringify(defaultPlans));
    localStorage.setItem(KEYS.TEACHERS, JSON.stringify(defaultTeachers));
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(defaultGallery));
    localStorage.setItem(KEYS.BLOG, JSON.stringify(defaultBlogPosts));
    localStorage.setItem(KEYS.FAQ, JSON.stringify(defaultFAQs));
    localStorage.setItem(KEYS.MATERIALS, JSON.stringify(defaultStudyMaterials));
    localStorage.setItem(KEYS.ANNOUNCEMENTS, JSON.stringify(defaultAnnouncements));
    localStorage.setItem(KEYS.CALENDAR, JSON.stringify(defaultClassCalendar));
  }
};

/*
================================================================================
FIREBASE CODE PREPARATION:
================================================================================
To switch from localStorage mock persistence to real Firebase Firestore, 
use the following boilerplate setup inside the app:

1. Create a `firebase-applet-config.json` file in your root containing your credentials:
{
  "apiKey": "YOUR_API_KEY",
  "authDomain": "YOUR_PROJECT_ID.firebaseapp.com",
  "projectId": "YOUR_PROJECT_ID",
  "storageBucket": "YOUR_PROJECT_ID.appspot.com",
  "messagingSenderId": "YOUR_MESSAGING_SENDER_ID",
  "appId": "YOUR_APP_ID"
}

2. Initialize in a file:
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

3. Example Firebase operations instead of localStorage:

export const firebaseDbService = {
  async getConfig(): Promise<SchoolConfig> {
    const docRef = doc(db, "config", "school");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as SchoolConfig;
    }
    return defaultSchoolConfig;
  },
  async saveConfig(config: SchoolConfig): Promise<void> {
    await setDoc(doc(db, "config", "school"), config);
  },
  async getCourses(): Promise<Course[]> {
    const querySnapshot = await getDocs(collection(db, "courses"));
    const courses: Course[] = [];
    querySnapshot.forEach((doc) => {
      courses.push({ id: doc.id, ...doc.data() } as Course);
    });
    return courses.length ? courses : defaultCourses;
  },
  async saveCourse(course: Course): Promise<void> {
    await setDoc(doc(db, "courses", course.id), course);
  }
  // Continue with other entities...
};
================================================================================
*/
