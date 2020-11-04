/**
 * Table of contents widget JSX component.
 * @module view/widget/toc
 */
const { tocObj: getTocObj, unescapeHTML } = require('hexo-util');
const { Component } = require('inferno');
const { cacheComponent } = require('hexo-component-inferno/lib/util/cache');

/**
 * Export a tree of headings of an article
 * @private
 * @example
 * getToc('HTML content...');
 * // {
 * //    "1": {
 * //        "id": "How-to-enable-table-of-content-for-a-post",
 * //        "text": "How to enable table of content for a post",
 * //        "index": "1"
 * //    },
 * //    "2": {
 * //        "1": {
 * //            "1": {
 * //                "id": "Third-level-title",
 * //                "text": "Third level title",
 * //                "index": "2.1.1"
 * //            },
 * //            "id": "Second-level-title",
 * //            "text": "Second level title",
 * //            "index": "2.1"
 * //        },
 * //        "2": {
 * //            "id": "Another-second-level-title",
 * //            "text": "Another second level title",
 * //            "index": "2.2"
 * //        },
 * //        "id": "First-level-title",
 * //        "text": "First level title",
 * //        "index": "2"
 * //    }
 * // }
 */
function getToc(content) {
    const toc = {};
    const levels = [0, 0, 0];
    const tocObj = getTocObj(content, { min_depth: 1, max_depth: 6 });
    const minLevel = Math.min(...tocObj.map(item => item.level));
    tocObj.forEach(item => {
        const { text, id } = item;
        const level = item.level - minLevel;

        for (let i = 0; i < levels.length; i++) {
            if (i > level) {
                levels[i] = 0;
            } else if (i < level) {
                if (levels[i] === 0) {
                    // if headings start with a lower level heading, set the former heading index to 1
                    // e.g. h3, h2, h1, h2, h3 => 1.1.1, 1.2, 2, 2.1, 2.1.1
                    levels[i] = 1;
                }
            } else {
                levels[i] += 1;
            }
        }
        let node = toc;
        for (const i of levels.slice(0, level + 1)) {
            if (!(i in node)) {
                node[i] = {};
            }
            node = node[i];
        }
        node.id = id;
        node.text = text;
        node.index = levels.slice(0, level + 1).join('.');
    });
    return toc;
}

/**
 * Table of contents widget JSX component.
 *
 * @example
 * <Toc
 *     title="Widget title"
 *     content="HTML content" />
 */
class Toc extends Component {
    renderToc(toc) {
        let result;

        const keys = Object.keys(toc)
            .filter(key => !['id', 'index', 'text'].includes(key))
            .map(key => parseInt(key, 10))
            .sort((a, b) => a - b);

        if (keys.length > 0) {
            result = <ul class="menu-list">
                {keys.map(i => this.renderToc(toc[i]))}
            </ul>;
        }
        if ('id' in toc && 'index' in toc && 'text' in toc) {
            result = <li>
                <a class="is-flex" href={'#' + toc.id}>
                    <span class="mr-2">{toc.index}</span>
                    <span>{unescapeHTML(toc.text)}</span>
                </a>
                {result}
            </li>;
        }
        return result;
    }

    render() {
        const toc = getToc(this.props.content);
        if (!Object.keys(toc).length) {
            return null;
        }

        return <div class="card widget is-sticky" id="toc">
            <div class="card-content">
                <div class="menu">
                    <h3 class="menu-label">{this.props.title}</h3>
                    {this.renderToc(toc)}
                </div>
            </div>
        </div>;
    }
}

/**
 * Cacheable table of contents widget JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <Toc.Cacheable
 *     config={{ toc: true }}
 *     page={{ layout: 'post', content: 'HTML content' }}
 *     helper={{ _p: function() {...} }} />
 */
Toc.Cacheable = cacheComponent(Toc, 'widget.toc', props => {
    const { config, page, helper } = props;
    const { layout, content } = page;

    if (config.toc !== true || (layout !== 'page' && layout !== 'post')) {
        return null;
    }

    return {
        title: helper._p('widget.catalogue', Infinity),
        content
    };
});

module.exports = Toc;