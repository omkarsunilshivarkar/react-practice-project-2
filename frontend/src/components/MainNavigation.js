import { NavLink, useLocation } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeCategory = searchParams.get('category');

  const isBlogsActive = location.pathname === '/blogs' && !activeCategory;

  return (
    <header className={classes.header}>
      {/* Main row with logo and actions */}
      <div className={classes.mainRow}>
        <div className={classes.logo}>
          <NavLink to="/blogs" end>
            <span>Tech</span>Horizon
          </NavLink>
        </div>

        {/* Desktop category links */}
        <nav className={classes.desktopNav}>
          <ul className={classes.list}>
            <li>
              <NavLink
                to="/blogs?category=Design"
                className={({ isActive }) => 
                  (activeCategory?.toLowerCase() === 'design') ? `${classes.navLink} ${classes.active}` : classes.navLink
                }
              >
                Design
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blogs?category=Product"
                className={({ isActive }) => 
                  (activeCategory?.toLowerCase() === 'product') ? `${classes.navLink} ${classes.active}` : classes.navLink
                }
              >
                Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blogs?category=Software%20Engineering"
                className={({ isActive }) => 
                  (activeCategory?.toLowerCase() === 'software engineering') ? `${classes.navLink} ${classes.active}` : classes.navLink
                }
              >
                Software Engineering
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blogs?category=AI%20%26%20Machine%20Learning"
                className={({ isActive }) => 
                  (activeCategory?.toLowerCase() === 'ai & machine learning') ? `${classes.navLink} ${classes.active}` : classes.navLink
                }
              >
                AI & ML
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blogs?category=Cloud%20Computing"
                className={({ isActive }) => 
                  (activeCategory?.toLowerCase() === 'cloud computing') ? `${classes.navLink} ${classes.active}` : classes.navLink
                }
              >
                Cloud
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blogs?category=Cybersecurity"
                className={({ isActive }) => 
                  (activeCategory?.toLowerCase() === 'cybersecurity') ? `${classes.navLink} ${classes.active}` : classes.navLink
                }
              >
                Cybersecurity
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blogs?category=Others"
                className={({ isActive }) => 
                  (activeCategory?.toLowerCase() === 'others') ? `${classes.navLink} ${classes.active}` : classes.navLink
                }
              >
                Others
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Action buttons */}
        <div className={classes.rightActions}>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              isBlogsActive ? `${classes.navLink} ${classes.active} ${classes.desktopOnly}` : `${classes.navLink} ${classes.desktopOnly}`
            }
            end
          >
            All Blogs
          </NavLink>
          <NavLink
            to="/blogs/new"
            className={({ isActive }) =>
              isActive ? `${classes.cta} ${classes.active}` : classes.cta
            }
          >
            New Blog
          </NavLink>
        </div>
      </div>

      {/* Mobile scrollable category bar */}
      <nav className={classes.mobileNav}>
        <ul className={classes.mobileList}>
          <li>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                isBlogsActive ? `${classes.mobileLink} ${classes.active}` : classes.mobileLink
              }
              end
            >
              All Blogs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blogs?category=Design"
              className={({ isActive }) => 
                (activeCategory?.toLowerCase() === 'design') ? `${classes.mobileLink} ${classes.active}` : classes.mobileLink
              }
            >
              Design
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blogs?category=Product"
              className={({ isActive }) => 
                (activeCategory?.toLowerCase() === 'product') ? `${classes.mobileLink} ${classes.active}` : classes.mobileLink
              }
            >
              Product
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blogs?category=Software%20Engineering"
              className={({ isActive }) => 
                (activeCategory?.toLowerCase() === 'software engineering') ? `${classes.mobileLink} ${classes.active}` : classes.mobileLink
              }
            >
              Software Engineering
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blogs?category=AI%20%26%20Machine%20Learning"
              className={({ isActive }) => 
                (activeCategory?.toLowerCase() === 'ai & machine learning') ? `${classes.mobileLink} ${classes.active}` : classes.mobileLink
              }
            >
              AI & ML
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blogs?category=Cloud%20Computing"
              className={({ isActive }) => 
                (activeCategory?.toLowerCase() === 'cloud computing') ? `${classes.mobileLink} ${classes.active}` : classes.mobileLink
              }
            >
              Cloud
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blogs?category=Cybersecurity"
              className={({ isActive }) => 
                (activeCategory?.toLowerCase() === 'cybersecurity') ? `${classes.mobileLink} ${classes.active}` : classes.mobileLink
              }
            >
              Cybersecurity
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blogs?category=Others"
              className={({ isActive }) => 
                (activeCategory?.toLowerCase() === 'others') ? `${classes.mobileLink} ${classes.active}` : classes.mobileLink
              }
            >
              Others
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;