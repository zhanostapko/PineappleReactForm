import './App.css';
import logo from './assets/Union.png';
import cup from './assets/ic_success.png';
import { faArrowRightLong, faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';

function App() {
  const [isChecked, setIsChecked] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailInputIsValid =
    enteredEmail.trim() !== '' &&
    enteredEmail.includes('@') &&
    enteredEmail.substr(-3) !== '.co' &&
    isChecked;
  const emailInputIsInvalid = !emailInputIsValid && enteredEmailTouched;

  useEffect(() => {
    if (!isChecked) {
      setErrorMessage('You must accept the terms and conditions');
    }
    if (!enteredEmail.includes('@')) {
      setErrorMessage('Please provide a valid e-mail address');
    }
    if (enteredEmail.substr(-3) === '.co') {
      setErrorMessage(
        'We are not accepting subscriptions from Colombia emails'
      );
    }
    if (enteredEmail.trim() === '') {
      setErrorMessage('Email address is required');
    }
    if (emailInputIsValid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [enteredEmail, emailInputIsValid, isChecked]);

  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const emailInputBlurHandler = (e) => {
    setEnteredEmailTouched(true);
  };

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    setEnteredEmailTouched(true);

    setSubmitted(true);
  };

  return (
    <div className="base">
      <nav>
        <div className="logo">
          <img src={logo} alt="Pineapple logo" />
          <span>pineapple.</span>
        </div>
        <div className="menu">
          <ul className="navLinks">
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">How it works</a>
            </li>
            <li>
              <a href="#">Contact </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="main-action">
        <main>
          {!submitted && (
            <>
              <section className="headings">
                <h1>Subscribe to newsletter</h1>
                <p>
                  Subscribe to our newsletter and get 10% discount on pineapple
                  glasses.
                </p>
              </section>
              <section className="form">
                <form onSubmit={formSubmissionHandler}>
                  <input
                    value={enteredEmail}
                    onChange={emailChangeHandler}
                    onBlur={emailInputBlurHandler}
                    placeholder="Type your email address here…"
                    className={emailInputIsInvalid ? 'text error' : 'text '}
                    type="text"
                  />
                  {emailInputIsInvalid && (
                    <div className="invalid">{ErrorMessage}</div>
                  )}

                  <input
                    onChange={() => setIsChecked(!isChecked)}
                    id="checkbox"
                    className="checkbox"
                    type="checkbox"
                  />

                  <label htmlFor="checkbox">
                    <div
                      className={
                        isChecked
                          ? 'checkboxDiv checkboxDiv-active'
                          : 'checkboxDiv'
                      }
                    >
                      {isChecked && (
                        <FontAwesomeIcon icon={faCheck} className="checkMark" />
                      )}
                    </div>
                    I agree to <a href="#"> terms of service</a>
                  </label>
                  <button
                    disabled={isDisabled}
                    className={emailInputIsInvalid ? 'error' : ''}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightLong}
                      className="arrowRight"
                    />
                  </button>
                  <div className="divider"></div>
                </form>
              </section>{' '}
            </>
          )}
          {submitted && (
            <>
              <img className="cup" src={cup} alt="" />
              <section className="thanks">
                <h1>Thanks for subscribing!</h1>
                <p>
                  You have successfully subscribed to our email listing. Check
                  your email for the discount code.
                </p>
              </section>
              <div className="divider"></div>
            </>
          )}
          <section className="social">
            <ul className="iconList">
              <li className="icon facebook">
                <a href="#">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
              </li>
              <li className="icon instagram">
                <a href="##">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
              <li className="icon twitter">
                <a href="###">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li className="icon youtube">
                <a href="####">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </li>
            </ul>
          </section>
        </main>
      </div>
      <div className="img-container"></div>
    </div>
  );
}

export default App;
