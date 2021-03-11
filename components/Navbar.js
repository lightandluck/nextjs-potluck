import { Fragment } from 'react';
import Link from 'next/link';

const NavBar = () => {
  return (
    <Fragment>
      <nav className='navbar sticky-top navbar-dark bg-primary navbar-expand-lg'>
        <Link href='/'>
          <a className='navbar-brand'>Potluck</a>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='navbar-item'>
              <Link href='/player'>
                <a className='nav-link'>Create Player</a>
              </Link>
            </li>

            <li className='navbar-item'>
              <Link href='/create'>
                <a className='nav-link'>Create Offering</a>
              </Link>
            </li>

            <li className='navbar-item'>
              <Link href='/offerings'>
                <a className='nav-link'>Offerings</a>
              </Link>
            </li>

            <li className='navbar-item'>
              <Link href='/wishlist'>
                <a className='nav-link'>Wishlist</a>
              </Link>
            </li>

            <li className='navbar-item'>
              <Link href='/totalwantlist'>
                <a className='nav-link'>Total Wantlist</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default NavBar;

/* #region  NOTE: Attempts at styling with styled-jsx and css modules */
// Was trying to get a.nav-link:hover { color: white; } to work using
// the above approaches but they would not work
// Using styled-jsx it created a.nav-link.jsx-00000:hover rule, but that
// was somehow not specific enough to override the base classes color rule.
// Tried using css-modules, but it would have been gnarly to mix
// Bootstrap's pre-exisiting css class names with the imported styles object.
// Would've been an ugly mess. So just put the nav bar styles into global.css.
// Should move away from Bootstrap eventually.
/* #endregion */
