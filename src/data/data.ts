export const jsonDataset = [
  {
    kind: 'TXT',
    head: 'json T title',
    body: 'json T content',
    refs: ['json T source'],

  },

  {
    kind: 'TXT',
    head: 'json T rumor title',
    body: 'json T content',
    // refs: ['json T source'],

  },

  {
    kind: 'TXT_AD',
    head: 'json TA title',
    body: 'json TA content',
    // refs: ['json TA source'],
    adClient: 'json TA client',
  },

  {
    kind: 'VID',
    head: 'json V title',
    body: 'json V content',
    // refs: ['json V source'],
    vidLink: 'json V video_link',
  },
  {
    kind: 'VID_AD',
    head: 'json VA title',
    body: 'json VA content',
    refs: ['json VA source'],
    vidLink: 'json VA video_link',
    adClient: 'json VA client',
  },
];

export const xmlDataset = [
  {
    tag: 'news',
    children: [
      { tag: 'category', value: 'Text' },
      { tag: 'headline', value: 'xml T title' },
      { tag: 'text', value: 'xml T content' },
      { tag: 'insight', value: 'xml T source 1' },
      { tag: 'insight', value: 'xml T source 2' },
    ],
  },
  {
    tag: 'news',
    children: [
      { tag: 'category', value: 'Text' },
      { tag: 'headline', value: 'xml T rumor title' },
      { tag: 'text', value: 'xml T content' },
      // { tag: 'insight', value: 'xml T source 1' },
      // { tag: 'insight', value: 'xml T source 2' },
    ],
  },
  {
    tag: 'news',
    children: [
      { tag: 'category', value: 'Text_Advert' },
      { tag: 'headline', value: 'xml TA title' },
      { tag: 'text', value: 'xml TA content' },
      // { tag: 'insight', value: 'xml TA source 1' },
      // { tag: 'insight', value: 'xml TA source 2' },
      { tag: 'sponsor', value: 'xml TA client' },
    ],
  },
  {
    tag: 'news',
    children: [
      { tag: 'category', value: 'Video' },
      { tag: 'headline', value: 'xml V title' },
      { tag: 'text', value: 'xml V content' },
      // { tag: 'insight', value: 'xml V source 1' },
      // { tag: 'insight', value: 'xml V source 2' },
      { tag: 'mediaLink', value: 'xml V video_link' },
    ],
  },

  {
    tag: 'news',
    children: [
      { tag: 'category', value: 'Video_Advert' },
      { tag: 'headline', value: 'XML VA title' },
      { tag: 'text', value: 'XML VA content' },
      // { tag: 'insight', value: 'xml VA source 1' },
      // { tag: 'insight', value: 'xml VA source 2' },
      { tag: 'mediaLink', value: 'xml VA video_link' },
      { tag: 'sponsor', value: 'xml VA client' },
    ],
  },
];
