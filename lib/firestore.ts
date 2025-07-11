import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  serverTimestamp,
  increment 
} from 'firebase/firestore';
import { db } from './firebase';

export interface User {
  id: string;
  email: string;
  credits: number;
  subscriptionId?: string;
  customerId?: string;
  plan?: string;
  createdAt: any;
  updatedAt: any;
}

export interface ContentHistory {
  id?: string;
  userId: string;
  input: {
    businessType: string;
    tone: string;
    platform: string;
    description?: string;
  };
  output: {
    caption: string;
    hashtags: string[];
    postIdeas: string[];
  };
  createdAt: any;
}

// User Management
export async function createUser(userId: string, email: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      email,
      credits: 3, // Free trial credits
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

export async function getUser(userId: string): Promise<User | null> {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() } as User;
    }
    return null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw new Error('Failed to get user');
  }
}

export async function updateUserCredits(userId: string, creditsToAdd: number): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      credits: increment(creditsToAdd),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating user credits:', error);
    throw new Error('Failed to update user credits');
  }
}

export async function deductUserCredit(userId: string): Promise<boolean> {
  try {
    const user = await getUser(userId);
    if (!user || user.credits <= 0) {
      return false;
    }

    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      credits: increment(-1),
      updatedAt: serverTimestamp(),
    });
    
    return true;
  } catch (error) {
    console.error('Error deducting user credit:', error);
    throw new Error('Failed to deduct user credit');
  }
}

export async function updateUserSubscription(
  userId: string, 
  subscriptionId: string, 
  customerId: string, 
  plan: string,
  credits: number
): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      subscriptionId,
      customerId,
      plan,
      credits,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating user subscription:', error);
    throw new Error('Failed to update user subscription');
  }
}

// Content History Management
export async function saveContentHistory(contentHistory: Omit<ContentHistory, 'id'>): Promise<string> {
  try {
    const historyRef = collection(db, 'contentHistory');
    const docRef = await addDoc(historyRef, {
      ...contentHistory,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving content history:', error);
    throw new Error('Failed to save content history');
  }
}

export async function getUserContentHistory(userId: string, limitCount: number = 10): Promise<ContentHistory[]> {
  try {
    const historyRef = collection(db, 'contentHistory');
    const q = query(
      historyRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const history: ContentHistory[] = [];
    
    querySnapshot.forEach((doc) => {
      history.push({ id: doc.id, ...doc.data() } as ContentHistory);
    });
    
    return history;
  } catch (error) {
    console.error('Error getting user content history:', error);
    throw new Error('Failed to get user content history');
  }
}