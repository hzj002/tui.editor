import sanitize from 'sanitize-html';
import { includes } from '@/utils/common';
// import DOMPurify from 'dompurify'

const CAN_BE_WHITE_TAG_LIST = ['iframe', 'embed'];
const whiteTagList: string[] = [];

export function registerTagWhitelistIfPossible(tagName: string) {
  if (includes(CAN_BE_WHITE_TAG_LIST, tagName)) {
    whiteTagList.push(tagName.toLowerCase());
  }
}

export function sanitizeHTML<T extends string | HTMLElement | DocumentFragment = string>(
  html: string | Element,
  options: sanitize.IOptions & { RETURN_DOM_FRAGMENT?: boolean } = {}
) {
  if (typeof html !== 'string') html = html.outerHTML;

  const mergedOptions: sanitize.IOptions = {
    allowedTags: sanitize.defaults.allowedTags.concat(whiteTagList, ['a', 'img']),
    allowedAttributes: {
      ...sanitize.defaults.allowedAttributes,
      '*': ['data-*', 'contenteditable', 'class'],
    },
    ...options,
  };

  const result = sanitize(html, mergedOptions);

  function htmlToFragment(html: string) {
    const fargment = document.createDocumentFragment();
    const ele = document.createElement('div');

    ele.innerHTML = html;
    if (ele.firstChild) fargment.appendChild(ele.firstChild);
    return fargment;
  }

  if (options.RETURN_DOM_FRAGMENT) return htmlToFragment(result) as T;
  return result as T;
}

// 测试大小为1MB左右的文档，DOMPurify.sanitize的性能90ms，sanitizeHtml为30ms。在其他大小的文档上，也有类似的性能差距。所以使用sanitizeHtml替换DOMPurify
// 在线性能测试：https://www.measurethat.net/Benchmarks/Show/12596/0/dompurify-vs-sanitize-html
// 另：还测试了rust编写的ammonia的wasm，性能不如DOMPurify
// export function sanitizeHTML<T extends string | HTMLElement | DocumentFragment = string>(
//   html: string | Node,
//   options?: DOMPurify.Config
// ) {
//   // console.time('DOMPurify.sanitize')
//   const result = DOMPurify.sanitize(html, {
//     ADD_TAGS: whiteTagList,
//     ADD_ATTR: ['rel', 'target', 'hreflang', 'type'],
//     FORBID_TAGS: [
//       'input',
//       'script',
//       'textarea',
//       'form',
//       'button',
//       'select',
//       'meta',
//       'style',
//       'link',
//       'title',
//       'object',
//       'base',
//     ],
//     ...options,
//   }) as T;
//   // console.timeEnd('DOMPurify.sanitize')

//   return result
// }
