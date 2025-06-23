import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import styles from "./Landing.module.css";
import { Link } from "react-router-dom";

import appDemoImg from "../../assets/app_demo.png";
import FeaturesSection from "./Sections/Fetures";

export default function LandingPage() {
  const { isLoading, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && accessToken) {
      navigate("/app");
    }
  }, [accessToken, isLoading, navigate]);

  return (
    <main className="container">
      <section className={styles.hero}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Simplificando sua <span className={styles.highlight}>gestão</span>{" "}
            de estoque <span className={styles.highlight}>e comunicação</span>.
          </h2>
          <div className={styles.cta}>
            <Link to="/signin" className={`btn btn-dark ${styles.ctaBtn}`}>
              <i className="bi bi-box-arrow-in-right" />
              &nbsp;Acessar
            </Link>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src={appDemoImg} className={styles.heroImage} />
        </div>
      </section>
      <FeaturesSection />
    </main>
  );
}
