import CodeWindow from './CodeWindow/CodeWindow'
import './Landing.css'

function Landing() {
  return (
    <section className="landing">
      <div className="hero">
        <div className="hero-text">
          <h1>
            <span className="hero-title-line">Welcome to Let's Deploy!</span>
            <span className="hero-title-line">For Developers Who Ship Solo</span>
          </h1>
          <p>
            Self-hosted mini-PaaS. Deploy your app, watch it run, and own the whole
            pipeline — from build to live metrics and logs, no ops required.
          </p>
          <div className="hero-actions">
            <button type="button" className="btn btn--secondary">
              Learn more
            </button>
            <button type="button" className="btn btn--primary">
              Get started
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <CodeWindow />
        </div>
      </div>
    </section>
  )
}

export default Landing
