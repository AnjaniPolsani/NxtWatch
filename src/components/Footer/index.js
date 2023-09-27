import {Container, Heading, Para, Image} from './styledComponents'

const Footer = () => (
  <Container>
    <Heading>CONTACT US</Heading>
    <Container>
      <Image
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
        alt="facebook logo"
      />
      <Image
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
        alt="twitter logo"
      />
      <Image
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
        alt="linked in logo"
      />
    </Container>
    <Para>Enjoy! Now to see your channels and recommendations!</Para>
  </Container>
)
export default Footer
