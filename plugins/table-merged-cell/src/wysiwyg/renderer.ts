import type { Node as ProsemirrorNode } from 'prosemirror-model';
import type { ToMdConvertorMap } from '@toast-ui/editor';

type ColumnAlign = 'left' | 'right' | 'center';
const DELIM_LENGH = 3;

function repeat(text: string, count: number) {
  let result = '';

  for (let i = 0; i < count; i += 1) {
    result += text;
  }

  return result;
}

function createTableHeadDelim(textContent: string, columnAlign: ColumnAlign) {
  let textLen = textContent.length;
  let leftDelim = '';
  let rightDelim = '';

  if (columnAlign === 'left') {
    leftDelim = ':';
    textLen -= 1;
  } else if (columnAlign === 'right') {
    rightDelim = ':';
    textLen -= 1;
  } else if (columnAlign === 'center') {
    leftDelim = ':';
    rightDelim = ':';
    textLen -= 2;
  }

  return `${leftDelim}${repeat('-', Math.max(textLen, DELIM_LENGH))}${rightDelim}`;
}

function createDelim(node: ProsemirrorNode) {
  const { rowspan, colspan } = node.attrs;
  let spanInfo = '';

  if (rowspan) {
    spanInfo = `@rows=${rowspan}:`;
  }
  if (colspan) {
    spanInfo = `@cols=${colspan}:${spanInfo}`;
  }

  return { delim: `| ${spanInfo}` };
}

export const toMarkdownRenderers: ToMdConvertorMap = {
  // markdown文件中的html表格传入此插件时，如果这里不返回一个空的delim，而是不处理的话，toMdConvertors 会将html <table>标签转换保留下来，而thead、cell会被下面的tableHead、tableHeadCell和tableBodyCell处理转换为markdown字符，导致错乱而无法渲染
  table(nodeInfo, context) {
    return { delim: '' };
  },

  // 同上，tableRow会被保留为<tr>
  tableRow(nodeInfo, context) {
    return { delim: '' };
  },

  // 同上，tableBody会被保留为<tbody>
  tableBody(nodeInfo, context) {
    return { delim: '' };
  },

  tableHead(nodeInfo) {
    const row = (nodeInfo.node as ProsemirrorNode).firstChild;

    let delim = '';

    if (row) {
      row.forEach(({ textContent, attrs }) => {
        const headDelim = createTableHeadDelim(textContent, attrs.align);

        delim += `| ${headDelim} `;

        if (attrs.colspan) {
          for (let i = 0; i < attrs.colspan - 1; i += 1) {
            delim += `| ${headDelim} `;
          }
        }
      });
    }
    return { delim };
  },
  tableHeadCell(nodeInfo) {
    return createDelim(nodeInfo.node as ProsemirrorNode);
  },
  tableBodyCell(nodeInfo) {
    return createDelim(nodeInfo.node as ProsemirrorNode);
  },
};
