// Database operations using Firestore
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Resume {
  id: string;
  userId: string;
  title: string;
  content: any;
  createdAt: string;
  updatedAt: string;
  views: number;
  downloads: number;
  isPublic: boolean;
  githubUsername?: string;
}

export interface Portfolio {
  id: string;
  userId: string;
  title: string;
  content: any;
  createdAt: string;
  updatedAt: string;
  views: number;
  isPublic: boolean;
  githubUsername?: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  isActive: boolean;
  source: string;
}

// Resume operations
export async function createResume(
  userId: string,
  resumeData: Partial<Resume>
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "resumes"), {
      ...resumeData,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      downloads: 0,
      isPublic: true,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating resume:", error);
    throw new Error("Failed to create resume");
  }
}
// use the id field againt where the document id is used

export async function getUserResumes(userId: string): Promise<Resume[]> {
  try {
    const q = query(
      collection(db, "resumes"),
      where("userId", "==", userId),
      orderBy("updatedAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Resume
    );
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return [];
  }
}

export async function getResume(id: string): Promise<Resume | null> {
  try {
    const q = query(collection(db, "resumes"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const docSnap = querySnapshot.docs[0];

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Resume;
    }
    return null;
  } catch (error) {
    console.error("Error fetching resume:", error);
    return null;
  }
}

export async function updateResume(
  id: string,
  updates: Partial<Resume>
): Promise<void> {
  try {
    const q = query(collection(db, "resumes"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const docSnap = querySnapshot.docs[0];
    await updateDoc(docSnap.ref, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating resume:", error);
    throw new Error("Failed to update resume");
  }
}

export async function deleteResume(id: string): Promise<void> {
  try {
    const q = query(collection(db, "resumes"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const docSnap = querySnapshot.docs[0];
    await deleteDoc(docSnap.ref);
  } catch (error) {
    console.error("Error deleting resume:", error);
    throw new Error("Failed to delete resume");
  }
}

export async function incrementResumeViews(id: string): Promise<void> {
  try {
    const q = query(collection(db, "resumes"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const docSnap = querySnapshot.docs[0];

    if (docSnap.exists()) {
      const currentViews = docSnap.data().views || 0;
      await updateDoc(docSnap.ref, {
        views: currentViews + 1,
      });
    }
  } catch (error) {
    console.error("Error incrementing views:", error);
  }
}

export async function incrementResumeDownloads(id: string): Promise<void> {
  try {
    const q = query(collection(db, "resumes"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const docSnap = querySnapshot.docs[0];

    if (docSnap.exists()) {
      const currentDownloads = docSnap.data().downloads || 0;
      await updateDoc(docSnap.ref, {
        downloads: currentDownloads + 1,
      });
    }
  } catch (error) {
    console.error("Error incrementing downloads:", error);
  }
}

// Portfolio operations
export async function createPortfolio(
  userId: string,
  portfolioData: Partial<Portfolio>
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "portfolios"), {
      ...portfolioData,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      isPublic: true,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating portfolio:", error);
    throw new Error("Failed to create portfolio");
  }
}

export async function getUserPortfolios(userId: string): Promise<Portfolio[]> {
  try {
    const q = query(
      collection(db, "portfolios"),
      where("userId", "==", userId),
      orderBy("updatedAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Portfolio
    );
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    return [];
  }
}

export async function getPortfolio(id: string): Promise<Portfolio | null> {
  try {
    // get portfolio by id field
    const q = query(collection(db, "portfolios"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const docSnap = querySnapshot.docs[0];
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Portfolio;
    }
    return null;
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }
}

export async function deletePortfolio(id: string): Promise<void> {
  try {
    const q = query(collection(db, "portfolios"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const docSnap = querySnapshot.docs[0];
    await deleteDoc(docSnap.ref);
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    throw new Error("Failed to delete portfolio");
  }
}

// Newsletter operations
export async function addNewsletterSubscriber(
  email: string,
  source = "website"
): Promise<void> {
  try {
    // Check if email already exists
    const q = query(collection(db, "newsletter"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await addDoc(collection(db, "newsletter"), {
        email,
        subscribedAt: new Date().toISOString(),
        isActive: true,
        source,
      });
    }
  } catch (error) {
    console.error("Error adding newsletter subscriber:", error);
    throw new Error("Failed to subscribe to newsletter");
  }
}

export async function getNewsletterSubscribers(): Promise<
  NewsletterSubscriber[]
> {
  try {
    const q = query(
      collection(db, "newsletter"),
      where("isActive", "==", true),
      orderBy("subscribedAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as NewsletterSubscriber
    );
  } catch (error) {
    console.error("Error fetching newsletter subscribers:", error);
    return [];
  }
}

// Analytics operations
export async function getAnalytics(userId: string) {
  try {
    const resumes = await getUserResumes(userId);
    const portfolios = await getUserPortfolios(userId);

    const totalViews =
      resumes.reduce((sum, resume) => sum + (resume.views || 0), 0) +
      portfolios.reduce((sum, portfolio) => sum + (portfolio.views || 0), 0);

    const totalDownloads = resumes.reduce(
      (sum, resume) => sum + (resume.downloads || 0),
      0
    );

    return {
      totalResumes: resumes.length,
      totalPortfolios: portfolios.length,
      totalViews,
      totalDownloads,
      conversionRate:
        totalViews > 0 ? ((totalDownloads / totalViews) * 100).toFixed(1) : "0",
      resumes,
      portfolios,
    };
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return {
      totalResumes: 0,
      totalPortfolios: 0,
      totalViews: 0,
      totalDownloads: 0,
      conversionRate: "0",
      resumes: [],
      portfolios: [],
    };
  }
}
