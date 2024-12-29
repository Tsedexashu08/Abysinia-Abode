import React from 'react'
import FooterStyle from '../styles/Footer.module.css'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
    <div className={FooterStyle.footer}>
        <div>
        <h3>About us</h3>
        <Link to='/privacyPage'><p><a href="#">Privacy Policy</a></p></Link>
        <Link to='termsPage'><p><a href="#">Terms and Agreements</a></p></Link>
        </div>
        <div>
          <h3>Contact us</h3>
          <p><a href="+251979687879">+251979687879</a></p>
          <p><a href="abyssinyaabode@gmail.com">abyssinyaabode@gmail.com</a></p>
          <p>P.O Box 2345</p>
        </div>
    </div>
    </footer>
  )
}

export default Footer
