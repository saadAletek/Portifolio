import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Work, Skill, personalData, Blog } from '../interface/pageInterface.dto';
import { collection, collectionData, doc, docData, Firestore } from '@angular/fire/firestore';

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
    const worksRef = collection(this.firestore, '/PageContent/Blogs/Blogs');
    return collectionData(worksRef, { idField: 'id' }) as Observable<Blog[]>;
  }

  getBlogById(id:String): Observable<Blog> {
    const workRef = doc(this.firestore, `/PageContent/Blogs/Blogs/${id}`);
    return docData(workRef, { idField: 'id' }) as Observable<Blog>;
  }

  getSkills(): Observable<Skill[]> {
    const worksRef = collection(this.firestore, '/PageContent/aboutMe/skills');
    return collectionData(worksRef, { idField: 'id' }) as Observable<Skill[]>;
  }

  personelData():Observable<personalData> {
    const worksRef = doc(this.firestore, 'PageContent/personalDetails');
    return docData(worksRef, { idField: 'id' }) as Observable<personalData>;
  }

}


