// Firebase Auth functions with real implementation
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
  GithubAuthProvider,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "./firebase"

const githubProvider = new GithubAuthProvider()
githubProvider.addScope("user:email")
githubProvider.addScope("read:user")

export async function signUp(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date().toISOString(),
      plan: "free",
      resumes: [],
      portfolios: [],
    })

    return { user }
  } catch (error: any) {
    console.error("Sign up error:", error)
    throw new Error(error.message || "Failed to create account")
  }
}

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { user: userCredential.user }
  } catch (error: any) {
    console.error("Sign in error:", error)
    throw new Error(error.message || "Failed to sign in")
  }
}

export async function signInWithGithub() {
  try {
    const result = await signInWithPopup(auth, githubProvider)
    const user = result.user
    const credential = GithubAuthProvider.credentialFromResult(result)
    const githubToken = credential?.accessToken

    // Check if user document exists, if not create it
    const userDoc = await getDoc(doc(db, "users", user.uid))
    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: user.displayName,
        avatar: user.photoURL,
        githubToken: githubToken, // Store for GitHub API access
        createdAt: new Date().toISOString(),
        plan: "free",
        resumes: [],
        portfolios: [],
      })
    }

    return { user, githubToken }
  } catch (error: any) {
    console.error("GitHub sign in error:", error)
    throw new Error(error.message || "Failed to sign in with GitHub")
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth)
    return true
  } catch (error: any) {
    console.error("Sign out error:", error)
    throw new Error("Failed to sign out")
  }
}

export function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}
