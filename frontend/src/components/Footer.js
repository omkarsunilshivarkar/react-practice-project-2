import classes from './Footer.module.css';

function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.logo}>
          <span>Tech</span>Horizon
        </div>
        <p className={classes.copyright}>
          &copy; {new Date().getFullYear()} TechHorizon. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
