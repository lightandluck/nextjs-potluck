import { Fragment } from 'react';
import Link from 'next/link';

const NavBar = () => {
  return (
    <Fragment>
      <nav className='navbar bg-dark navbar-dark navbar-expand-lg'>
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
          <span class='navbar-toggler-icon'></span>
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
              <Link href='/'>
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
      <style jsx>{`
        nav {
          margin-bottom: 1rem;
        }

        .bg-dark {
          background-color: var(--primary) !important;
        }

        .navbar-dark .navbar-brand {
          color: #333;
        }

        .navbar-dark .navbar-nav .nav-link {
          color: rgba(33, 33, 33, 0.6);
        }
      `}</style>
    </Fragment>
  );
};

export default NavBar;
