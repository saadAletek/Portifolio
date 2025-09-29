import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Work, Skill, personalData, Blog, Landing, Lang } from '../interface/pageInterface.dto';
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
  

}


