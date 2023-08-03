import { Plugin } from 'prosemirror-state';
import { DecorationSet, Decoration } from 'prosemirror-view';
import addClass from 'tui-code-snippet/domUtil/addClass';
import { Emitter } from '@t/event';

interface Options {
  text?: string;
  className?: string;
  innerHtml?: string[];
}

export function placeholder(options: Options, emitter: Emitter) {
  return new Plugin({
    props: {
      decorations(state) {
        const { doc } = state;

        if (options.innerHtml) {
          const placeHolder = document.createElement('span');

          addClass(placeHolder, 'placeholder');
          const innerHtmlCount = options.innerHtml!.length;

          options.innerHtml?.forEach((html, index) => {
            if (
              (index === 0 && doc.firstChild?.isTextblock && doc.firstChild?.content.size === 0) ||
              (index > 0 &&
                (doc.childCount < 2 ||
                  (doc.childCount === 2 &&
                    doc.lastChild?.isTextblock &&
                    doc.lastChild.content.size === 0)))
            ) {
              const element = new DOMParser().parseFromString(html, 'text/xml').lastElementChild!;
              const htmldom = document.createElement(element.tagName);
              const attrs = element.getAttributeNames();

              attrs.forEach((attr) => {
                htmldom.setAttribute(attr, element.getAttribute(attr) || '');
              });
              htmldom.innerHTML = element.innerHTML;
              if (index === innerHtmlCount - 1) {
                htmldom.onclick = () => {
                  emitter.emit('setBR', doc.childCount === 2);
                };
              }

              placeHolder.appendChild(htmldom);
            }
          });
          return DecorationSet.create(doc, [Decoration.widget(1, placeHolder)]);
        }

        if (
          options.text &&
          doc.childCount === 1 &&
          doc.firstChild!.isTextblock &&
          doc.firstChild!.content.size === 0
        ) {
          const placeHolder = document.createElement('span');

          addClass(placeHolder, 'placeholder');

          if (options.className) {
            addClass(placeHolder, options.className);
          }
          placeHolder.textContent = options.text;

          return DecorationSet.create(doc, [Decoration.widget(1, placeHolder)]);
        }
        return null;
      },
    },
  });
}
