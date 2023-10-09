export const context = {
  init: true,
  pageOpts: {
    frontMatter: {
      createDate: '2023-05-22T00:00:00.000Z',
    },
    filePath: 'pages/notes/fe/algorithms.zh-CN.md',
    route: '/notes/fe/algorithms',
    timestamp: 1696658615000,
    title: 'Algorithms',
    headings: [
      {
        depth: 3,
        value: '数组',
        id: '数组',
      },
      {
        depth: 4,
        value: '创建数组',
        id: '创建数组',
      },
      {
        depth: 4,
        value: '添加或删除元素',
        id: '添加或删除元素',
      },
      {
        depth: 4,
        value: '二维数组和多维数组',
        id: '二维数组和多维数组',
      },
      {
        depth: 4,
        value: '常用的数组方法',
        id: '常用的数组方法',
      },
      {
        depth: 3,
        value: '栈',
        id: '栈',
      },
      {
        depth: 4,
        value: '栈的创建',
        id: '栈的创建',
      },
      {
        depth: 4,
        value: '栈的应用',
        id: '栈的应用',
      },
      {
        depth: 3,
        value: '队列',
        id: '队列',
      },
      {
        depth: 4,
        value: '创建队列',
        id: '创建队列',
      },
    ],
    pageMap: [
      {
        kind: 'MdxPage',
        name: '404',
        route: '/404',
      },
      {
        kind: 'Meta',
        locale: 'zh-CN',
        data: {
          index: {
            title: '简介',
            type: 'page',
            display: 'hidden',
          },
          notes: {
            title: '笔记',
            type: 'page',
          },
          stars: {
            title: '收藏',
            type: 'page',
          },
          tool: {
            title: '工具',
            type: 'page',
          },
          about: {
            title: '关于',
            type: 'page',
          },
        },
      },
      {
        kind: 'MdxPage',
        name: 'about',
        route: '/about',
        locale: 'zh-CN',
      },
      {
        kind: 'MdxPage',
        name: 'index',
        route: '/',
        locale: 'zh-CN',
      },
      {
        kind: 'Folder',
        name: 'notes',
        route: '/notes',
        children: [
          {
            kind: 'Meta',
            locale: 'zh-CN',
            data: {
              fe: '前端',
              be: '后端',
              roadmap: '路线图',
              learn: '学习',
              life: '生活',
            },
          },
          {
            kind: 'Folder',
            name: 'be',
            route: '/notes/be',
            children: [
              {
                kind: 'Meta',
                locale: 'zh-CN',
                data: {
                  'nest.js': 'NestJS',
                },
              },
              {
                kind: 'MdxPage',
                name: 'nest.js',
                route: '/notes/be/nest.js',
                locale: 'zh-CN',
              },
            ],
          },
          {
            kind: 'Folder',
            name: 'fe',
            route: '/notes/fe',
            children: [
              {
                kind: 'MdxPage',
                name: 'ES6',
                route: '/notes/fe/ES6',
                locale: 'zh-CN',
                frontMatter: {
                  createDate: '2020-03-21T00:00:00.000Z',
                },
              },
              {
                kind: 'Meta',
                locale: 'zh-CN',
                data: {
                  algorithms: '数据结构与算法',
                  ES6: 'ES6 的特性和用法',
                  regex: '正则表达式',
                  redux: 'Redux 学习笔记',
                  react: 'React 学习笔记',
                  interview: '前端面试题汇总',
                },
              },
              {
                kind: 'MdxPage',
                name: 'algorithms',
                route: '/notes/fe/algorithms',
                locale: 'zh-CN',
                frontMatter: {
                  createDate: '2023-05-22T00:00:00.000Z',
                },
              },
              {
                kind: 'MdxPage',
                name: 'interview',
                route: '/notes/fe/interview',
                locale: 'zh-CN',
              },
              {
                kind: 'MdxPage',
                name: 'react',
                route: '/notes/fe/react',
                locale: 'zh-CN',
                frontMatter: {
                  createDate: '2020-03-27T00:00:00.000Z',
                },
              },
              {
                kind: 'MdxPage',
                name: 'redux',
                route: '/notes/fe/redux',
                locale: 'zh-CN',
                frontMatter: {
                  createDate: '2020-3-27',
                },
              },
              {
                kind: 'MdxPage',
                name: 'regex',
                route: '/notes/fe/regex',
                locale: 'zh-CN',
                frontMatter: {
                  createDate: '2020-03-21T00:00:00.000Z',
                },
              },
            ],
          },
          {
            kind: 'Folder',
            name: 'learn',
            route: '/notes/learn',
            children: [
              {
                kind: 'Meta',
                locale: 'zh-CN',
                data: {
                  unicorn: '如何快速成长',
                },
              },
              {
                kind: 'MdxPage',
                name: 'unicorn',
                route: '/notes/learn/unicorn',
                locale: 'zh-CN',
              },
            ],
          },
          {
            kind: 'Folder',
            name: 'life',
            route: '/notes/life',
            children: [
              {
                kind: 'Meta',
                locale: 'zh-CN',
                data: {},
              },
            ],
          },
          {
            kind: 'Folder',
            name: 'roadmap',
            route: '/notes/roadmap',
            children: [
              {
                kind: 'Meta',
                locale: 'zh-CN',
                data: {
                  'system-design': '系统设计',
                },
              },
              {
                kind: 'MdxPage',
                name: 'system-design',
                route: '/notes/roadmap/system-design',
                locale: 'zh-CN',
              },
            ],
          },
        ],
      },
      {
        kind: 'Folder',
        name: 'stars',
        route: '/stars',
        children: [
          {
            kind: 'Meta',
            locale: 'zh-CN',
            data: {
              blog: '博客',
              tutorial: '教程',
              article: '文章',
              design: '设计',
              extension: '扩展',
              interview: '面试',
              img: '图片',
              lib: '库和框架',
              tool: '工具',
              book: '书单',
            },
          },
          {
            kind: 'MdxPage',
            name: 'article',
            route: '/stars/article',
            locale: 'zh-CN',
          },
          {
            kind: 'MdxPage',
            name: 'blog',
            route: '/stars/blog',
            locale: 'zh-CN',
          },
          {
            kind: 'MdxPage',
            name: 'book',
            route: '/stars/book',
            locale: 'zh-CN',
          },
          {
            kind: 'MdxPage',
            name: 'design',
            route: '/stars/design',
            locale: 'zh-CN',
          },
          {
            kind: 'MdxPage',
            name: 'extension',
            route: '/stars/extension',
            locale: 'zh-CN',
          },
          {
            kind: 'MdxPage',
            name: 'img',
            route: '/stars/img',
            locale: 'zh-CN',
          },
          {
            kind: 'MdxPage',
            name: 'interview',
            route: '/stars/interview',
            locale: 'zh-CN',
          },
          {
            kind: 'MdxPage',
            name: 'lib',
            route: '/stars/lib',
            locale: 'zh-CN',
          },
          {
            kind: 'MdxPage',
            name: 'tool',
            route: '/stars/tool',
            locale: 'zh-CN',
          },
          {
            kind: 'MdxPage',
            name: 'tutorial',
            route: '/stars/tutorial',
            locale: 'zh-CN',
          },
        ],
      },
      {
        kind: 'Folder',
        name: 'tool',
        route: '/tool',
        children: [
          {
            kind: 'Meta',
            locale: 'zh-CN',
            data: {
              tool: '工具',
            },
          },
          {
            kind: 'MdxPage',
            name: 'tool',
            route: '/tool/tool',
            locale: 'zh-CN',
          },
        ],
      },
    ],
    flexsearch: {
      codeblocks: true,
    },
  },
  themeConfig: {
    editLink: {},
    feedback: {},
    project: {
      link: 'https://github.com/yandif/yandif.com',
    },
    docsRepositoryBase: 'https://github.com/yandif/yandif.com/blob/main/',
    footer: {},
    toc: {},
    i18n: [],
  },
  pageProps: {},
};
