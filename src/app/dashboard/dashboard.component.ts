import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LanguageService } from '../services/language.service';
import { CollectionType, PageService } from '../services/Page.service';
import { Message, personalData } from '../interface/pageInterface.dto';

interface FieldDef {
  key: string;
  labelKey: string;
  type: 'text' | 'url' | 'textarea' | 'checkbox';
}

type Tab = CollectionType | 'overview' | 'messages' | 'profile';

const PROFILE_FIELDS: { key: keyof personalData; labelKey: string }[] = [
  { key: 'gmail', labelKey: 'dashboard.pGmail' },
  { key: 'phone', labelKey: 'dashboard.pPhone' },
  { key: 'github', labelKey: 'dashboard.pGithub' },
  { key: 'linkedin', labelKey: 'dashboard.pLinkedin' },
  { key: 'twitter', labelKey: 'dashboard.pTwitter' },
];

const FIELD_DEFS: Record<CollectionType, FieldDef[]> = {
  works: [
    { key: 'name', labelKey: 'dashboard.fName', type: 'text' },
    { key: 'link', labelKey: 'dashboard.fLink', type: 'url' },
    { key: 'image', labelKey: 'dashboard.fImage', type: 'url' },
    { key: 'details', labelKey: 'dashboard.fDetails', type: 'textarea' },
  ],
  blogs: [
    { key: 'name', labelKey: 'dashboard.fTitle', type: 'text' },
    { key: 'image', labelKey: 'dashboard.fImage', type: 'url' },
    { key: 'details', labelKey: 'dashboard.fDetails', type: 'textarea' },
  ],
  skills: [
    { key: 'name', labelKey: 'dashboard.fName', type: 'text' },
    { key: 'image', labelKey: 'dashboard.fImage', type: 'url' },
    { key: 'value', labelKey: 'dashboard.fValue', type: 'text' },
    { key: 'main', labelKey: 'dashboard.fMain', type: 'checkbox' },
  ],
  languages: [
    { key: 'name', labelKey: 'dashboard.fName', type: 'text' },
    { key: 'image', labelKey: 'dashboard.fImage', type: 'url' },
    { key: 'value', labelKey: 'dashboard.fValue', type: 'text' },
  ],
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private auth = inject(AuthService);
  private router = inject(Router);
  private i18n = inject(LanguageService);
  private page = inject(PageService);
  private translate = inject(TranslateService);

  activeTab: Tab = 'overview';

  // Live data (Firestore listeners keep these in sync after every write).
  data: Record<CollectionType, any[]> = { works: [], blogs: [], skills: [], languages: [] };
  messages: Message[] = [];
  private subs: Subscription[] = [];

  // Profile (single personalDetails document).
  readonly profileFields = PROFILE_FIELDS;
  profileModel: personalData = {};
  profileSaving = false;
  profileSaved = false;

  // Editor modal state.
  editorOpen = false;
  editorType: CollectionType = 'works';
  editorModel: Record<string, any> = {};
  editorId: string | null = null;
  saving = false;
  error = '';

  readonly collections: CollectionType[] = ['works', 'blogs', 'skills', 'languages'];

  ngOnInit() {
    this.subs.push(
      this.page.getWorks().subscribe(d => (this.data.works = d)),
      this.page.getBlogs().subscribe(d => (this.data.blogs = d)),
      this.page.getSkills().subscribe(d => (this.data.skills = d)),
      this.page.getLangs().subscribe(d => (this.data.languages = d)),
      this.page.getMessages().subscribe(d => (this.messages = d)),
      this.page.personalData().subscribe(pd => (this.profileModel = pd ?? {})),
    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  setActiveTab(tab: Tab) {
    this.activeTab = tab;
  }

  get unreadCount(): number {
    return this.messages.filter(m => !m.read).length;
  }

  get fields(): FieldDef[] {
    return FIELD_DEFS[this.editorType];
  }

  openCreate(type: CollectionType) {
    this.editorType = type;
    this.editorModel = {};
    this.editorId = null;
    this.error = '';
    this.editorOpen = true;
  }

  openEdit(type: CollectionType, item: any) {
    this.editorType = type;
    this.editorModel = { ...item };
    this.editorId = item.id;
    this.error = '';
    this.editorOpen = true;
  }

  closeEditor() {
    this.editorOpen = false;
  }

  async save() {
    if (this.saving) return;
    this.saving = true;
    this.error = '';
    try {
      if (this.editorId) {
        await this.page.updateItem(this.editorType, this.editorId, this.editorModel);
      } else {
        await this.page.addItem(this.editorType, this.editorModel);
      }
      this.editorOpen = false;
    } catch (e: any) {
      this.error = e?.message ?? 'Save failed';
    } finally {
      this.saving = false;
    }
  }

  async remove(type: CollectionType, item: any) {
    if (!confirm(this.translate.instant('dashboard.confirmDelete'))) return;
    try {
      await this.page.deleteItem(type, item.id);
    } catch (e: any) {
      this.error = e?.message ?? 'Delete failed';
    }
  }

  // ---- Messages -------------------------------------------------------------

  toggleRead(msg: Message) {
    if (!msg.id) return;
    this.page.setMessageRead(msg.id, !msg.read);
  }

  async removeMessage(msg: Message) {
    if (!msg.id) return;
    if (!confirm(this.translate.instant('dashboard.confirmDelete'))) return;
    await this.page.deleteMessage(msg.id);
  }

  // ---- Profile --------------------------------------------------------------

  async saveProfile() {
    if (this.profileSaving) return;
    this.profileSaving = true;
    this.profileSaved = false;
    this.error = '';
    try {
      await this.page.updatePersonalData(this.profileModel);
      this.profileSaved = true;
    } catch (e: any) {
      this.error = e?.message ?? 'Save failed';
    } finally {
      this.profileSaving = false;
    }
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/', this.i18n.current, 'admin-login']);
  }
}
