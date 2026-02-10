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
  },

  {
    kind: 'TXT_AD',
    head: 'json TA title',
    body: 'json TA content',
    adClient: 'json TA client',
  },

  {
    kind: 'VID',
    head: 'json V title',
    body: 'json V content',
    vidLink: 'json V video_link',
  },
  {
    kind: 'VID_AD',
    head: 'json VA title',
    body: 'json VA content',
    vidLink: 'json VA video_link',
    adClient: 'json VA client',
  },
  {
    kind: '',
    head: 'json T invalid type title',
    body: 'json T content',
    refs: ['json T source'],
  },

  {
    kind: 'TXT_AD',
    head: 'json TA no client title',
    body: 'json TA content',
  },

  {
    kind: 'VID',
    head: 'json V no link title',
    body: 'json V content',
  },
  {
    kind: 'VID_AD',
    head: 'json VA no client title',
    body: 'json VA content',
    vidLink: 'json V video_link',
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
    ],
  },
  {
    tag: 'news',
    children: [
      { tag: 'category', value: 'Text_Advert' },
      { tag: 'headline', value: 'xml TA title' },
      { tag: 'text', value: 'xml TA content' },
      { tag: 'sponsor', value: 'xml TA client' },
    ],
  },
  {
    tag: 'news',
    children: [
      { tag: 'category', value: 'Video' },
      { tag: 'headline', value: 'xml V title' },
      { tag: 'text', value: 'xml V content' },
      { tag: 'mediaLink', value: 'xml V video_link' },
    ],
  },

  {
    tag: 'news',
    children: [
      { tag: 'category', value: 'Video_Advert' },
      { tag: 'headline', value: 'XML VA title' },
      { tag: 'text', value: 'XML VA content' },
      { tag: 'mediaLink', value: 'xml VA video_link' },
      { tag: 'sponsor', value: 'xml VA client' },
    ],
  },
];
