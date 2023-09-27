import styled from 'styled-components'

import {Link} from 'react-router-dom'

export const MainContainer = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#f9f9f9')};
`

export const LinkEle = styled(Link)``

export const NavContainer = styled.nav``

export const Image = styled.img``

export const LinksContainer = styled.ul``

export const ListItem = styled.li``

export const Button = styled.button``

export const SearchIconContainer = styled.div``

export const SearchContainer = styled.div``

export const InputEle = styled.input``

export const ItemsContainer = styled.div``

export const FailContainer = styled.div``

export const Heading = styled.h1``

export const Para = styled.p``

export const BannerContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  display: ${props => props.isDisplay};
  background-size: cover;
  height: 200px;
`

export const BannerContainer1 = styled.div``

export const Container = styled.div``

export const UnorderedList = styled.ul``
