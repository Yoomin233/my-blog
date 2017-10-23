import Avatar from './ninja-cat1.jpg'

export default (props) => (
  <div className='author'>
    <h1>关于本博客背后其<span title='你知道的太多了'>人</span></h1>
    <img src={Avatar} alt="" className='avatar' title='你知道的太多了'/>
    <p>
      胡悦<ruby><rb>旻</rb><rp>（</rp><rt>mín</rt><rp>）</rp></ruby>, 或称Yoomin, 半路出家的野生前端工程师, 性别男, 爱好女(以及coding), 其实本体是吸猫狂魔, 一见到猫猫就会浑身瘫软彻底丧失行动能力, 用处是紧急时刻可以变成食物(大雾). 
    </p>
    <p>
      平时喜欢玩乐高, 养宠物和绿植. 有时候玩<a href="http://sc2.blizzard.cn/home" target='_blank'>星际争霸II</a>(无聊时). 一天不和<a href='https://www.facebook.com/profile.php?id=100008549017663&hc_ref=ARQ-dH2YcIdT5AsWbS32EQU1XYMhDm9NuMgrJgA5X65lBCFwLZiI3x5d9T-Fg5QkONM' target='_blank'>女友</a>说话, 或者不上<a href="https://zh.moegirl.org/%E8%B0%B7%E6%AD%8C%E5%A8%98" target='_blank'>谷歌</a>和<a href="https://zh.moegirl.org/YouTube%E5%A8%98" target='_blank'>Youtube</a>, 就浑身难受. <span title='你知道的太多了' className='censored'>
        偶尔还会光顾某些<a href="http://cn.uncyclopedia.wikia.com/wiki/%E9%A6%96%E9%A1%B5" >邪恶的网站</a>(也因此落下了<a href='https://zh.moegirl.org/zh-hans/%E7%BB%85%E5%A3%AB' target='_blank'>绅士</a>的名号).
      </span>
    </p>
    <div>
      技能树: 
      <ul>
        <li>HTML, CS与JS</li>
        <li>React.js(譬如本人手写的本博客)</li>
        <li>Git及其相关</li>
        <li>离开Mac和巨硬的<a href="https://www.visualstudio.com/" target='_blank'>Visual Studio Code</a>(glorious!)就会手足无措, 写不出一行有用的代码</li>
      </ul>
    </div>
    <p className='contacts'>
      <a className='icon-github-round' href='https://github.com/YueminHu/' target='_blank'></a>
      <a className='icon-gmail' href='mailto:hym920408@gmail.com'></a>
      <a className='icon-facebook' href='https://www.facebook.com/profile.php?id=100006231496977' target='_blank'></a>
    </p>
    <style jsx>{`
      .author {
        border-bottom: 1px solid #ddd;
        img.avatar {
          width: 50%;
          float: left;
          margin-right: 1em;
          border-radius: 5px;
        }
        > h1 {
          >span {
            display: inline-block;
            position: relative;
            &::before {
              content: '喵';
              position: absolute;
              display: block;
              background-color: #fff;
              opacity: 0;
              transition: all .3s ease;
            }
            &:hover::before {
              opacity: 1;
            }
          }
        }
      }
      .contacts {
        a {
          color: #444;
          font-size: 1.6em;
          margin-right: .5em;
        }
      }
      .censored {
        color: #fff;
        > * {
          color: #fff;
        }
        &:hover {
          color: unset;
          > a {
            color: rgb(20, 144, 215);
          }
        }
      }
    `}</style>
  </div>
)