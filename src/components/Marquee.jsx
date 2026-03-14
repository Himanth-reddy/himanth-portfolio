import { marqueeItems } from '../data/skills.js'

function Marquee() {
  const loopItems = [...marqueeItems, ...marqueeItems]

  return (
    <section className="marquee-shell" aria-label="Skills ticker">
      <div className="marquee-track">
        <div className="marquee-inner">
          {loopItems.map((item, index) => (
            <span key={`${item}-${index}`} className="marquee-item">
              <span>+</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Marquee