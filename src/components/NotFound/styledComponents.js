import styled from 'styled-components'

import {Link} from 'react-router-dom'

export const MainContainer = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9')};
`

export const NavContainer = styled.nav``

export const Image = styled.img``

export const LinksContainer = styled.ul``

export const ListItem = styled.li``

export const Button = styled.button``

export const FailContainer = styled.div``

export const Heading = styled.h1``

export const Para = styled.p``

export const Container = styled.div`
  background-color: ${props => props.bgColor};
`

export const LinkEle = styled(Link)``

export const Container1 = styled.div``
