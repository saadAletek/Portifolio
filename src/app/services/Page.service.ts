import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Work, Skill, personalData, Blog, Landing, Lang, Message } from '../interface/pageInterface.dto';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, orderBy, query, serverTimestamp, setDoc, updateDoc } from '@angular/fire/firestore';

/** Editable collection types and their Firestore paths. */
export type CollectionType = 'works' | 'blogs' | 'skills' | 'languages';

const COLLECTION_PATHS: Record<CollectionType, string> = {
  works: 'PageContent/Works/Works',
  blogs: 'PageContent/Blogs/Blogs',
  skills: 'PageContent/aboutMe/skills',
  languages: 'PageContent/aboutMe/languages',
};

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private firestore: Firestore) {}
  
  getWorks(): Observable<Work[]> {
    const worksRef = collection(this.firestore, 'PageContent/Works/Works');
    return collectionData(worksRef, { idField: 'id' }) as Observable<Work[]>;
  }

  getWorkById(id:String): Observable<Work> {
    const workRef = doc(this.firestore, `PageContent/Works/Works/${id}`);
    return docData(workRef, { idField: 'id' }) as Observable<Work>;
  }

  getBlogs(): Observable<Blog[]> {
    const BlogsRef = collection(this.firestore, '/PageContent/Blogs/Blogs');
    return collectionData(BlogsRef, { idField: 'id' }) as Observable<Blog[]>;
  }

  getBlogById(id:String): Observable<Blog> {
    const BlogRef = doc(this.firestore, `/PageContent/Blogs/Blogs/${id}`);
    return docData(BlogRef, { idField: 'id' }) as Observable<Blog>;
  }

  getSkills(): Observable<Skill[]> {
    const SkillsRef = collection(this.firestore, '/PageContent/aboutMe/skills');
    return collectionData(SkillsRef, { idField: 'id' }) as Observable<Skill[]>;
  }
  getLangs(): Observable<Lang[]> {
    const LangsRef = collection(this.firestore, '/PageContent/aboutMe/languages');
    return collectionData(LangsRef, { idField: 'id' }) as Observable<Lang[]>;
  }

  personalData():Observable<personalData> {
    const pdRef = doc(this.firestore, 'PageContent/personalDetails');
    return docData(pdRef, { idField: 'id' }) as Observable<personalData>;
  }
  LandingData():Observable<Landing>{
    const landingRef = doc(this.firestore, '/PageContent/Landing');
    return docData(landingRef) as Observable<Landing>;
  }

  // ---- Admin writes (gated by Firestore security rules: isAdmin()) ----------

  /** Create a new document in the given collection. Returns the new id. */
  async addItem(type: CollectionType, data: Record<string, any>): Promise<string> {
    const ref = await addDoc(collection(this.firestore, COLLECTION_PATHS[type]), this.clean(data));
    return ref.id;
  }

  /** Update an existing document by id. */
  updateItem(type: CollectionType, id: string, data: Record<string, any>): Promise<void> {
    return updateDoc(doc(this.firestore, `${COLLECTION_PATHS[type]}/${id}`), this.clean(data));
  }

  /** Delete a document by id. */
  deleteItem(type: CollectionType, id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, `${COLLECTION_PATHS[type]}/${id}`));
  }

  /** Update the single personal-details document (merges fields). */
  updatePersonalData(data: personalData): Promise<void> {
    return setDoc(doc(this.firestore, 'PageContent/personalDetails'), this.clean(data), { merge: true });
  }

  // ---- Contact messages -----------------------------------------------------
  // Public visitors may CREATE a message (contact form); only the admin may
  // read/update/delete them. Enforced in firestore.rules under /messages.

  /** Submit a contact-form message. createdAt/read are set server-side/here. */
  addMessage(data: { name: string; email: string; message: string }) {
    return addDoc(collection(this.firestore, 'messages'), {
      name: data.name,
      email: data.email,
      message: data.message,
      read: false,
      createdAt: serverTimestamp(),
    });
  }

  /** Admin: list messages, newest first. */
  getMessages(): Observable<Message[]> {
    const ref = query(collection(this.firestore, 'messages'), orderBy('createdAt', 'desc'));
    return collectionData(ref, { idField: 'id' }) as Observable<Message[]>;
  }

  /** Admin: flag a message read/unread. */
  setMessageRead(id: string, read: boolean): Promise<void> {
    return updateDoc(doc(this.firestore, `messages/${id}`), { read });
  }

  /** Admin: delete a message. */
  deleteMessage(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, `messages/${id}`));
  }

  /** Strip the synthetic id field and any undefined values before writing. */
  private clean(data: Record<string, any>): Record<string, any> {
    const out: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      if (key === 'id' || value === undefined) continue;
      out[key] = value;
    }
    return out;
  }

}


