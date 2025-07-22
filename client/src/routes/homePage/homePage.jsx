import { useContext, useEffect, useState } from "react";
import './homePage.scss';
import { AuthContext } from "../../context/AuthContext";
import SearchBar from '../../components/searchBar/SearchBar';

function HomePage() {
  const { currentUser } = useContext(AuthContext);

  const texts = ["Find Real Estate", "Get Your Dream Place"];
  const [index, setIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Counter states
  const [years, setYears] = useState(0);
  const [awards, setAwards] = useState(0);
  const [properties, setProperties] = useState(0);

  useEffect(() => {
    const currentText = texts[textIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    const type = () => {
      setDisplayedText(currentText.substring(0, index));

      if (!isDeleting && index === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && index === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      } else {
        setIndex((prev) => prev + (isDeleting ? -1 : 1));
      }
    };

    const timer = setTimeout(type, typingSpeed);

    return () => clearTimeout(timer);
  }, [index, isDeleting, textIndex, texts]);

    // Counter effect
  useEffect(() => {
        let yearsTarget = 10;
        let awardsTarget = 96;
        let propertiesTarget = 1200;
        let speed = 50; // smaller = faster

        const increment = () => {
          setYears((prev) => {
              if (prev < yearsTarget) return prev + 1;
              return prev;
          });
          setAwards((prev) => {
              if (prev < awardsTarget) return prev + 4; // faster steps
              return prev > awardsTarget ? awardsTarget : prev;
          });
          setProperties((prev) => {
              if (prev < propertiesTarget) return prev + 50; // faster steps
              return prev > propertiesTarget ? propertiesTarget : prev;
          });
        };

        const interval = setInterval(() => {
        increment();
        }, speed);

        // Stop when all targets reached
        if (years >= yearsTarget && awards >= awardsTarget && properties >= propertiesTarget) {
        clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [years, awards, properties]);

    return (
        <div className="homePage">
        <div className="textcontainer">
            <div className="wrap">
            <h1>{displayedText}<span className="cursor">|</span></h1>
            <p>
                Welcome to our real estate hub! We simplify your 
                journey of buying or renting a house. With 
                comprehensive market insights and a user-friendly 
                interface, finding your dream home or ideal rental 
                becomes effortless. Start your search here and step 
                into your future home!
            </p>
            <div className="search-wrapper">
              <SearchBar />
            </div>
            <div className="boxes">
                <div className="box">
                <h1>{years}+</h1>
                <h2>Years of Experience</h2>
                </div>
                <div className="box">
                <h1>{awards}+</h1>
                <h2>Awards Gained</h2>
                </div>
                <div className="box">
                <h1>{properties}+</h1>
                <h2>Properties Ready</h2>
                </div>
            </div>
            {/* <div className="boxes">
                    <div className="box">
                    <h1>10+</h1>
                    <h2>Years of Experience</h2>
                    </div>
                    <div className="box">
                    <h1>107</h1>
                    <h2>Awards Gained</h2>
                    </div>
                    <div className="box">
                    <h1>1200+</h1>
                    <h2>Properties Ready</h2>
                    </div>
                </div> 
            */}
            </div>
        </div>
        <div className="imgcontainer">
            <img src="/home_pg_right.png" alt="" />
        </div>
      </div>
    );
}

export default HomePage;
