"use strict";

var _inferno = require("inferno");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * A simple article overview JSX component.
 * @module view/common/article_media
 */
var _require = require('inferno'),
    Component = _require.Component;
/**
 * A simple article overview JSX component.
 *
 * @name ArticleMedia
 * @example
 * <ArticleMedia
 *     thumbnail="/path/to/thumbnail/image.png"
 *     url="/path/to/article"
 *     title="Article title"
 *     date="Article publish date"
 *     dateXml="Article publish date in XML format (see https://hexo.io/docs/helpers#date-xml)"
 *     categories={[
 *         { url: '/path/to/category', name: 'Category name' }
 *     ]} />
 */


module.exports = /*#__PURE__*/function (_Component) {
  _inherits(_class, _Component);

  var _super = _createSuper(_class);

  function _class() {
    _classCallCheck(this, _class);

    return _super.apply(this, arguments);
  }

  _createClass(_class, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          thumbnail = _this$props.thumbnail,
          thumbnail_dark = _this$props.thumbnail_dark ? _this$props.thumbnail_dark : _this$props.thumbnail,
          url = _this$props.url,
          title = _this$props.title,
          date = _this$props.date,
          dateXml = _this$props.dateXml,
          categories = _this$props.categories;
      var categoryTags = [];
      categories.forEach(function (category, i) {
        categoryTags.push((0, _inferno.createVNode)(1, "a", null, category.name, 0, {
          "href": category.url
        }));

        if (i < categories.length - 1) {
          categoryTags.push(' / ');
        }
      });
      return (0, _inferno.createVNode)(1, "article", "media", [thumbnail ? (0, _inferno.createVNode)(1, "figure", "media-left", (0, _inferno.createVNode)(1, "a", "image", [(0, _inferno.createVNode)(1, "img", "fill", null, 1, {
        "src": thumbnail,
        "alt": title
      }),(0, _inferno.createVNode)(1, "img", "fill_dark", null, 1, {
        "src": thumbnail_dark,
        "alt": title
      })], 2, {
        "href": url
      }), 2) : null, (0, _inferno.createVNode)(1, "div", "media-content", [(0, _inferno.createVNode)(1, "p", "date", (0, _inferno.createVNode)(1, "time", null, date, 0, {
        "dateTime": dateXml
      }), 2), (0, _inferno.createVNode)(1, "p", "title", (0, _inferno.createVNode)(1, "a", null, title, 0, {
        "href": url
      }), 2), categoryTags.length ? (0, _inferno.createVNode)(1, "p", "categories", categoryTags, 0) : null], 0)], 0);
    }
  }]);

  return _class;
}(Component);