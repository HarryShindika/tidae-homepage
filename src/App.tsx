import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import "./App.css";

function App() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isLoading, setIsLoading] = useState(true);
  const [, setCurrentSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const hideNavbar = useCallback(() => {
    setIsNavbarVisible(false);
  }, []);

  const showNavbar = useCallback(() => {
    setIsNavbarVisible(true);
  }, []);

  const resetIdleTimer = useCallback(() => {
    const now = Date.now();
    lastActivityRef.current = now;

    // Show navbar immediately when user is active
    showNavbar();

    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set new timer to hide navbar after 3 seconds
    timerRef.current = setTimeout(() => {
      // Double-check that enough time has passed since last activity
      if (Date.now() - lastActivityRef.current >= 3000) {
        hideNavbar();
      }
    }, 3000);
  }, [showNavbar, hideNavbar]);

  useEffect(() => {
    // Events that should reset the idle timer
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    // Throttle mousemove events to prevent excessive timer resets
    let mouseMoveThrottle: NodeJS.Timeout | null = null;

    const handleMouseMove = () => {
      if (!mouseMoveThrottle) {
        mouseMoveThrottle = setTimeout(() => {
          resetIdleTimer();
          mouseMoveThrottle = null;
        }, 100); // Throttle to every 100ms
      }
    };

    const handleOtherEvents = () => {
      resetIdleTimer();
    };

    // Add event listeners with different handlers
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    events
      .filter((e) => e !== "mousemove")
      .forEach((event) => {
        document.addEventListener(event, handleOtherEvents, { passive: true });
      });

    // Initial timer setup
    resetIdleTimer();

    // Cleanup function
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      events
        .filter((e) => e !== "mousemove")
        .forEach((event) => {
          document.removeEventListener(event, handleOtherEvents);
        });

      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (mouseMoveThrottle) {
        clearTimeout(mouseMoveThrottle);
        mouseMoveThrottle = null;
      }
    };
  }, [resetIdleTimer]);

  // Scroll tracking and section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
      setShowScrollTop(scrollTop > 300);
    };

    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="preloader">
        <div className="preloader-logo">HS</div>
      </div>
    );
  }

  return (
    <div className={`App theme-${theme}`}>
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress">
        <div
          className="scroll-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav
        className={`navbar ${
          isNavbarVisible ? "navbar-visible" : "navbar-hidden"
        }`}
      >
        <div className="nav-brand">HS</div>
        <div className="nav-links">
          <div className="nav-item" onClick={() => scrollToSection("home")}>
            <span>Home</span>
          </div>
          <div className="nav-item" onClick={() => scrollToSection("bio")}>
            <span>Bio</span>
          </div>
          <div className="nav-item" onClick={() => scrollToSection("projects")}>
            <span>Projects</span>
          </div>
          <div className="nav-item" onClick={() => scrollToSection("music")}>
            <span>Music</span>
          </div>
          <div className="nav-item" onClick={() => scrollToSection("gallery")}>
            <span>Gallery</span>
          </div>
          <div className="nav-item" onClick={() => scrollToSection("contact")}>
            <span>Contact</span>
          </div>
        </div>

        {/* Theme Controls */}
        <div className="theme-controls">
          <div className="theme-toggle">
            <button
              className={`theme-btn ${theme === "dark" ? "active" : ""}`}
              onClick={() => setTheme("dark")}
              title="Dark Mode"
            >
              🌙
            </button>
            <button
              className={`theme-btn ${theme === "light" ? "active" : ""}`}
              onClick={() => setTheme("light")}
              title="Light Mode"
            >
              ☀️
            </button>
          </div>
        </div>
      </nav>

      {/* Fixed Right Side Icons */}
      <div className="fixed-right-icons">
        <div className="fixed-icon play-icon">▶</div>
        <div className="fixed-icon camera-icon">📷</div>
        <div className="fixed-icon music-icon">🎵</div>
      </div>

      {/* Home Section */}
      <section id="home" className="section home-section">
        <div className="content-wrapper">
          <div className="left-section">
            <div className="blue-accent"></div>
            <div className="intro-text">
              <h1 className="this-is">THIS</h1>
              <h1 className="this-is">IS.</h1>
            </div>
            <div className="name-section">
              <h1 className="name">TIDAE</h1>
            </div>
          </div>

          <div className="right-section">
            <div className="profile-container">
              <div className="profile-placeholder">
                {/* Placeholder for profile photo - you can replace this with your actual image */}
              </div>
            </div>

            <div className="bio-section">
              <div className="vertical-line"></div>
              <p className="bio-text">
                A short blurb / intro of me will be here
                <br />
                and maybe a small photo? We'll see
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section id="bio" className="section bio-detail-section">
        <div className="bio-detail-wrapper">
          <div className="bio-left">
            <div className="bio-photo-container">
              <div className="bio-photo-frame">
                <div className="bio-photo-placeholder">My photo here</div>
              </div>
            </div>
          </div>
          <div className="bio-right">
            <div className="bio-content-top">
              <p className="bio-detail-text">
                Enter bio text here,
                <br />
                should be a summary
                <br />
                of you and what you do
              </p>
            </div>
            <div className="bio-content-bottom">
              <p className="bio-detail-text">
                Enter bio text here,
                <br />
                should be a summary
                <br />
                of you and what you do
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <div className="projects-content">
          {/* Empty black section for future project content */}
        </div>
      </section>

      {/* Music Section */}
      <section id="music" className="section music-section">
        <div className="music-wrapper">
          <div className="music-left">
            <h2 className="releases-title">Releases</h2>
            <div className="music-logo">
              <div className="logo-shape">
                <div className="logo-square blue"></div>
                <div className="logo-square white"></div>
                <div className="logo-square blue bottom"></div>
              </div>
            </div>
          </div>
          <div className="music-right">
            <div className="music-nav-top">
              <span className="music-nav-arrow">▲</span>
            </div>
            <div className="song-list">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <div key={num} className="song-item">
                  <span className="song-title">Song #{num}</span>
                </div>
              ))}
            </div>
            <div className="music-nav-bottom">
              <span className="music-nav-arrow">▼</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="section gallery-section">
        <div className="gallery-grid">
          <div className="gallery-item"></div>
          <div className="gallery-item"></div>
          <div className="gallery-item"></div>
          <div className="gallery-item"></div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="contact-content">
          <h2 className="section-title">Connect with Me</h2>
          <p className="section-subtitle">
            Let's create something amazing together.
          </p>
          <div className="social-links">
            <a
              href="https://twitter.com/your-handle"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-icon">🐦</span>
              <span>Twitter</span>
            </a>
            <a
              href="https://instagram.com/your-handle"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-icon">📷</span>
              <span>Instagram</span>
            </a>
            <a href="mailto:your.email@example.com" className="social-link">
              <span className="social-icon">✉️</span>
              <span>Email</span>
            </a>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showScrollTop && (
        <button
          className="back-to-top"
          onClick={scrollToTop}
          title="Back to Top"
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default App;
