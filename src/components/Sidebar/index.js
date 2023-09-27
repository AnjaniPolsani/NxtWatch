import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'

import {SideBarCont, LinkContainer, LinkEle, Para} from './styledComponents'

const Sidebar = () => (
  <SideBarCont>
    <LinkContainer>
      <LinkEle to="/">
        <AiFillHome size={30} />
        <Para>Home</Para>
      </LinkEle>
    </LinkContainer>
    <LinkContainer>
      <LinkEle to="/trending">
        <HiFire size={30} />
        <Para>Trending</Para>
      </LinkEle>
    </LinkContainer>
    <LinkContainer>
      <LinkEle to="/gaming">
        <SiYoutubegaming size={30} />
        <Para>Gaming</Para>
      </LinkEle>
    </LinkContainer>

    <LinkContainer>
      <LinkEle to="/saved-videos">
        <CgPlayListAdd size={30} />
        <Para>Saved videos</Para>
      </LinkEle>
    </LinkContainer>
  </SideBarCont>
)

export default Sidebar
