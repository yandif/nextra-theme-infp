// flexsearch types are incorrect, they were overwritten in tsconfig.json
import { rem } from '@mantine/core';
import { Spotlight, SpotlightActionData } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons-react';
import FlexSearch from 'flexsearch';
import { useRouter } from 'next/router';
import type { SearchData } from 'nextra';
import { useEffect, useState } from 'react';

import { useLocale } from '../../../contents';

type SectionIndex = FlexSearch.Document<
  {
    id: string;
    url: string;
    title: string;
    pageId: string;
    content: string;
    display?: string;
  },
  ['title', 'content', 'url', 'display']
>;

type PageIndex = FlexSearch.Document<
  {
    id: number;
    title: string;
    content: string;
  },
  ['title']
>;

type Result = {
  _page_rk: number;
  _section_rk: number;
  route: string;
  prefix?: string;
  title: string;
  content: string;
};

// This can be global for better caching.
const indexes: {
  [locale: string]: [PageIndex, SectionIndex];
} = {};

// Caches promises that load the index
const loadIndexesPromises = new Map<string, Promise<void>>();
const loadIndexes = (basePath: string, locale: string): Promise<void> => {
  const key = basePath + '@' + locale;
  if (loadIndexesPromises.has(key)) {
    return loadIndexesPromises.get(key)!;
  }
  const promise = loadIndexesImpl(basePath, locale);
  loadIndexesPromises.set(key, promise);
  return promise;
};

const loadIndexesImpl = async (
  basePath: string,
  locale: string,
): Promise<void> => {
  const response = await fetch(
    `${basePath}/_next/static/chunks/nextra-data-${locale}.json`,
  );
  const searchData = (await response.json()) as SearchData;

  const pageIndex: PageIndex = new FlexSearch.Document({
    cache: 100,
    tokenize: 'full',
    document: {
      id: 'id',
      index: 'content',
      store: ['title'],
    },
    context: {
      resolution: 9,
      depth: 2,
      bidirectional: true,
    },
  });

  const sectionIndex: SectionIndex = new FlexSearch.Document({
    cache: 100,
    tokenize: 'full',
    document: {
      id: 'id',
      index: 'content',
      tag: 'pageId',
      store: ['title', 'content', 'url', 'display'],
    },
    context: {
      resolution: 9,
      depth: 2,
      bidirectional: true,
    },
  });

  let pageId = 0;

  for (const [route, structurizedData] of Object.entries(searchData)) {
    let pageContent = '';
    ++pageId;

    for (const [key, content] of Object.entries(structurizedData.data)) {
      const [headingId, headingValue] = key.split('#');
      const url = route + (headingId ? '#' + headingId : '');
      const title = headingValue || structurizedData.title;
      const paragraphs = content.split('\n');

      sectionIndex.add({
        id: url,
        url,
        title,
        pageId: `page_${pageId}`,
        content: title,
        ...(paragraphs[0] && { display: paragraphs[0] }),
      });

      for (let i = 0; i < paragraphs.length; i++) {
        sectionIndex.add({
          id: `${url}_${i}`,
          url,
          title,
          pageId: `page_${pageId}`,
          content: paragraphs[i],
        });
      }

      // Add the page itself.
      pageContent += ` ${title} ${content}`;
    }

    pageIndex.add({
      id: pageId,
      title: structurizedData.title,
      content: pageContent,
    });
  }

  indexes[locale] = [pageIndex, sectionIndex];
};

export function Flexsearch() {
  const { locale = 'zh-CN', basePath, push } = useRouter();
  const [loading, setLoading] = useState(false);
  const locales = useLocale();
  const [results, setResults] = useState<SpotlightActionData[]>([]);

  const doSearch = (search: string) => {
    if (!search) return;
    const [pageIndex, sectionIndex] = indexes[locale];

    // Show the results for the top 5 pages
    const pageResults =
      pageIndex.search<true>(search, 5, {
        enrich: true,
        suggest: true,
      })[0]?.result || [];

    const results: Result[] = [];
    const pageTitleMatches: Record<number, number> = {};

    for (let i = 0; i < pageResults.length; i++) {
      const result = pageResults[i];
      pageTitleMatches[i] = 0;

      // Show the top 5 results for each page
      const sectionResults =
        sectionIndex.search<true>(search, 5, {
          enrich: true,
          suggest: true,
          tag: `page_${result.id}`,
        })[0]?.result || [];

      let isFirstItemOfPage = true;
      const occurred: Record<string, boolean> = {};

      for (let j = 0; j < sectionResults.length; j++) {
        const { doc } = sectionResults[j];
        const isMatchingTitle = doc.display !== undefined;
        if (isMatchingTitle) {
          pageTitleMatches[i]++;
        }
        const { url, title } = doc;
        const content = doc.display || doc.content;
        if (occurred[url + '@' + content]) continue;
        occurred[url + '@' + content] = true;
        results.push({
          _page_rk: i,
          _section_rk: j,
          route: url,
          prefix: isFirstItemOfPage ? result.doc.title : undefined,
          title,
          content,
        });
        isFirstItemOfPage = false;
      }
    }

    setResults(
      results
        .sort((a, b) => {
          // Sort by number of matches in the title.
          if (a._page_rk === b._page_rk) {
            return a._section_rk - b._section_rk;
          }
          if (pageTitleMatches[a._page_rk] !== pageTitleMatches[b._page_rk]) {
            return pageTitleMatches[b._page_rk] - pageTitleMatches[a._page_rk];
          }
          return a._page_rk - b._page_rk;
        })
        .map((res) => ({
          id: `${res._page_rk}_${res._section_rk}`,
          route: res.route,
          label: res.content,
          description: res.title,
          onClick: () => {
            push(res.route);
          },
        })),
    );
  };
  useEffect(() => {
    handleChange('');
  }, []);
  const handleChange = async (value: string) => {
    if (loading) {
      return;
    }
    if (!indexes[locale]) {
      setLoading(true);
      try {
        await loadIndexes(basePath, locale);
      } catch (e) {
        //
      }
      setLoading(false);
    }
    doSearch(value);
  };

  return (
    <Spotlight
      actions={results}
      highlightQuery
      onQueryChange={handleChange}
      nothingFound={locales.noData}
      scrollable
      maxHeight={600}
      clearQueryOnClose
      searchProps={{
        leftSection: (
          <IconSearch
            style={{ width: rem(20), height: rem(20) }}
            stroke={1.5}
          />
        ),
        placeholder: locales.search,
      }}
    />
  );
}
