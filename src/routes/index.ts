import { createRouter, createWebHistory } from "vue-router";

import Mangas from '@/page/Mangas.vue';

// Muti page: {List chapter}
import WrapListChapter from '@/page/ListChapter/index.vue';
import ListChapter from '@/page/ListChapter/ListChapter.vue';
import EditInfo from '@/page/ListChapter/EditInfo.vue';
import UpdateImage from '@/page/ListChapter/UpdateImage.vue';

import NewChapter from '@/page/NewChapter.vue';
import UploadManga from '@/page/UploadManga.vue';
import ReportError from '@/page/ReportError.vue';
import CreatePost from '@/page/CreatePost.vue';
import LoudSpeaker from '@/page/LoudSpeaker.vue';
import BadPage from '@/page/BadPage.vue';

const routes = [
  { path: "/", name: 'mangas', component: Mangas },
  { path: "/upload-manga", name: 'upload-manga', component: UploadManga },
  { path: "/new-chapter/:id", name: 'create-chapter', component: NewChapter },
  {
    path: "/list-chapter/:id", component: WrapListChapter, children: [
      {
        path: '',
        name: 'list-chapter',
        component: ListChapter,
      },
      {
        path: 'edit/:idChapter',
        name: 'edit-info',
        component: EditInfo,
      },
      {
        path: 'update/:idChapter',
        name: 'update-image',
        component: UpdateImage,
      },
    ]
  },
  { path: "/report-error", name: 'report-error', component: ReportError },
  { path: "/create-post", name: 'create-post', component: CreatePost },
  { path: "/loud-speaker", name: 'loud-speaker', component: LoudSpeaker },
  { path: '/:pathMatch(.*)*', name: 'badpage', component: BadPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {});

export default router;