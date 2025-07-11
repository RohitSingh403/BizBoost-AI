import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth } from './firebase';

export async function getUserSubscription(userId: string) {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists()) {
    return null;
  }

  const userData = userDoc.data();
  return {
    stripeCustomerId: userData.stripeCustomerId,
    stripeSubscriptionId: userData.stripeSubscriptionId,
    stripePriceId: userData.stripePriceId,
    stripeCurrentPeriodEnd: userData.stripeCurrentPeriodEnd?.toDate(),
  };
}

export async function updateUserSubscription(
  userId: string, 
  subscription: any
) {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, {
    stripeCustomerId: subscription.customer,
    stripeSubscriptionId: subscription.id,
    stripePriceId: subscription.items.data[0].price.id,
    stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
  }, { merge: true });
}

export async function createCheckoutSession(priceId: string) {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const session = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId,
      userId: user.uid,
      userEmail: user.email,
    }),
  });

  return session.json();
}
