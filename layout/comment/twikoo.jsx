const { Component, Fragment } = require('inferno');
const { cacheComponent } = require('hexo-component-inferno/lib/util/cache');

class Twikoo extends Component {
  render() {
    const {
      envId,
      jsUrl,
    } = this.props;
    const js = `twikoo.init({
      envId: '${envId}',
      onCommentLoaded: function(){
        console.log('评论加载完成');
        var tkImgs = document.querySelectorAll(".tk-content img")
        tkImgs.forEach(tkImg => {
        tkImg.style.setProperty("cursor","zoom-in");
        tkImg.addEventListener('click', function(){
          if(tkImg.style.getPropertyValue("cursor") == "zoom-in"){
            tkImg.style.setProperty("max-width", "100%", "important")
            tkImg.style.setProperty("max-height", "100%", "important")
            tkImg.style.setProperty("cursor","zoom-out")
          }
          else{
            tkImg.style.removeProperty("max-width")
            tkImg.style.removeProperty("max-height")
            tkImg.style.setProperty("cursor","zoom-in")
          }
          })
        });
      }});`;
    return (
      <Fragment>
        <div id="twikoo" class="content twikoo"></div>
        <script src={jsUrl}></script>
        <script dangerouslySetInnerHTML={{ __html: js }}></script>
      </Fragment>
    );
  }
}

Twikoo.Cacheable = cacheComponent(Twikoo, 'comment.twikoo', (props) => {
  const { comment } = props;
  return {
    envId: comment.envId,
    jsUrl: 'https://cdn.jsdelivr.net/npm/twikoo@0.5.2/dist/twikoo.all.min.js',
  };
});

module.exports = Twikoo;